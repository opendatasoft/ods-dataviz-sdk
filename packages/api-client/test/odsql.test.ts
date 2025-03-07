/**
 * @jest-environment jsdom
 */

import { expect, it, describe, test } from '@jest/globals';
import {
    fromCatalog,
    fromDataNetwork,
    fromMonitoring,
    Query,
    field,
    string,
    dateTime,
    date,
    all,
    one,
    list,
    not,
    dateFromIsoString,
    textSearch,
    textSuggest,
    textStartWith,
    lower,
} from '../src';

describe('ODSQL query builder', () => {
    it('should build an empty query', () => {
        expect(new Query().toString()).toEqual('');
    });

    it('should allow be immutable when change occurs', () => {
        const query1 = fromCatalog().dataset('my_dataset').itself().select('my_field');

        expect(query1).not.toBe(query1.where('my_field > 10'));
        expect(query1).toBe(query1.select('my_field'));
    });

    describe('build the right queries', () => {
        test('with no parameters', () => {
            expect(fromCatalog().datasets().toString()).toEqual('catalog/datasets/');

            expect(fromCatalog().assets().toString()).toEqual('catalog/assets/');

            expect(fromMonitoring().itself().toString()).toEqual('monitoring/');

            expect(fromDataNetwork().dataset('sirene@data').facets().lang('fr').toString()).toEqual(
                'opendatasoft/datasets/sirene@data/facets/?lang=fr'
            );

            expect(
                fromDataNetwork().dataset('sirene@data').records().lang('fr').toString()
            ).toEqual('opendatasoft/datasets/sirene@data/records/?lang=fr');
        });

        test('get a record', () => {
            expect(fromCatalog().dataset('my_dataset').record('a_record_id').toString()).toEqual(
                'catalog/datasets/my_dataset/records/a_record_id/'
            );
        });

        test('with select', () => {
            expect(fromCatalog().itself().select('dataset_id, records_count').toString()).toEqual(
                'catalog/?select=dataset_id%2C+records_count'
            );
        });

        test('conditional clause', () => {
            const searchTerm = undefined;
            expect(
                fromCatalog()
                    .datasets()
                    .where(searchTerm && `search(${string(searchTerm)})`)
                    .toString()
            ).toEqual('catalog/datasets/');

            expect(
                fromCatalog()
                    .assets()
                    .where(searchTerm && `search(${string(searchTerm)})`)
                    .toString()
            ).toEqual('catalog/assets/');
        });

        test('conditional condition', () => {
            const searchTerm = 'my search term';
            expect(
                fromCatalog()
                    .datasets()
                    .where((prev) => all(prev, searchTerm && `search(${string(searchTerm)})`))
                    .toString()
            ).toEqual('catalog/datasets/?where=%28search%28%22my+search+term%22%29%29');

            expect(
                fromCatalog()
                    .assets()
                    .where((prev) => all(prev, searchTerm && `search(${string(searchTerm)})`))
                    .toString()
            ).toEqual('catalog/assets/?where=%28search%28%22my+search+term%22%29%29');
        });

        test('text helpers', () => {
            expect(lower('artist')).toEqual('lower(artist)');
        });

        test('list helper', () => {
            expect(
                fromCatalog()
                    .datasets()
                    .select((prev) => list(prev, 'a', 'b', 'c'))
                    .select((prev) => list(prev, 'd'))
                    .toString()
            ).toEqual(`catalog/datasets/?select=${encodeURIComponent('a,b,c,d')}`);

            expect(
                fromCatalog()
                    .assets()
                    .select((prev) => list(prev, 'a', 'b', 'c'))
                    .select((prev) => list(prev, 'd'))
                    .toString()
            ).toEqual(`catalog/assets/?select=${encodeURIComponent('a,b,c,d')}`);
        });

        test('date helper', () => {
            expect(date({ year: 2017 })).toEqual("date'2017'");
            expect(date({ year: 2017, month: 1 })).toEqual("date'2017-01'");
            expect(date({ year: 2017, month: 12 })).toEqual("date'2017-12'");
            expect(date({ year: 2017, month: 1, day: 1 })).toEqual("date'2017-01-01'");
            expect(date({ year: 2017, month: 12, day: 31 })).toEqual("date'2017-12-31'");
        });

        test('with where filter', () => {
            const query = fromCatalog().dataset('my_dataset').itself();

            expect(query.where('my_field in [0..10]').toString()).toEqual(
                'catalog/datasets/my_dataset/?where=my_field+in+%5B0..10%5D'
            );

            expect(
                query
                    .where('first filter')
                    .where(
                        `${field('my_field')} > 10 and ${field('another_field')}:${dateTime(
                            new Date(0)
                        )}`
                    )
                    .toString()
            ).toEqual(
                'catalog/datasets/my_dataset/?where=%60my_field%60+%3E+10+and+%60another_field%60%3Adate%271970-01-01T00%3A00%3A00.000Z%27'
            );

            expect(
                query
                    .where(all('first filter', 'second filter'))
                    .where((currentFilter) => one(currentFilter, 'third filter'))
                    .toString()
            ).toEqual(
                'catalog/datasets/my_dataset/?where=%28%28first+filter%29+AND+%28second+filter%29%29+OR+%28third+filter%29'
            );
        });

        test('complex queries', () => {
            expect(
                fromCatalog()
                    .dataset('my_dataset')
                    .records()
                    .groupBy('x, y')
                    .where(`${field('my_field')}:${string("this will be' escaped")}`)
                    .where((filter) =>
                        one(filter, `${field('my_field')} < ${dateFromIsoString('1970-01-01')}`)
                    )
                    .where((filter) =>
                        all(filter, 'not_escaped in [0..10] and other is true', 'len(f) = 2')
                    )
                    .select('a')
                    .select((selected) => `${selected}, b`)
                    .toString()
            ).toEqual(
                'catalog/datasets/my_dataset/records/?group_by=x%2C+y&select=a%2C+b&where=%28%28%60my_field%60%3A%22this+will+be%27+escaped%22%29+OR+%28%60my_field%60+%3C+date%271970-01-01%27%29%29+AND+%28not_escaped+in+%5B0..10%5D+and+other+is+true%29+AND+%28len%28f%29+%3D+2%29'
            );

            expect(
                fromCatalog()
                    .datasets()
                    .orderBy(`${field('x')}`)
                    .limit(40)
                    .limit((l) => l + 5)
                    .offset((o) => o + 10)
                    .refine('field:1')
                    .exclude('field:2')
                    .toString()
            ).toEqual(
                'catalog/datasets/?exclude=field%3A2&limit=45&offset=10&order_by=%60x%60&refine=field%3A1'
            );

            expect(
                fromCatalog()
                    .assets()
                    .orderBy(`${field('x')}`)
                    .limit(40)
                    .limit((l) => l + 5)
                    .offset((o) => o + 10)
                    .refine('field:1')
                    .exclude('field:2')
                    .toString()
            ).toEqual(
                'catalog/assets/?exclude=field%3A2&limit=45&offset=10&order_by=%60x%60&refine=field%3A1'
            );
        });

        test('export geojson query', () => {
            expect(
                fromCatalog().dataset('my_dataset').export('geojson').limit(10000).toString()
            ).toEqual('catalog/datasets/my_dataset/exports/geojson/?limit=10000');
        });

        test('escaping', () => {
            expect(string('-"-\'-\\-p-')).toEqual('"-\\"-\'-\\\\-p-"');
            expect(field('`f')).toEqual('`\\`f`');
        });

        test('not helper', () => {
            expect(fromCatalog().datasets().where(not('x = 1')).toString()).toEqual(
                'catalog/datasets/?where=not+%28x+%3D+1%29'
            );
            expect(fromCatalog().datasets().where(not(undefined)).toString()).toEqual(
                'catalog/datasets/'
            );

            expect(fromCatalog().assets().where(not('x = 1')).toString()).toEqual(
                'catalog/assets/?where=not+%28x+%3D+1%29'
            );
            expect(fromCatalog().assets().where(not(undefined)).toString()).toEqual(
                'catalog/assets/'
            );
        });
        test('Search clause', () => {
            expect(textSearch('my search term', ['field1', 'field2'])).toEqual(
                'search(`field1`, `field2`, "my search term")'
            );
        });
        test('Suggest clause', () => {
            expect(textSuggest('my search term', ['field1', 'field2'])).toEqual(
                `suggest(\`field1\`, \`field2\`, "my search term")`
            );
        });
        test('StartWith clause', () => {
            expect(textStartWith('my search term', ['field1', 'field2'])).toEqual(
                `startswith(\`field1\`, \`field2\`, "my search term")`
            );
        });
        test('StartWith clause with only one field', () => {
            expect(textStartWith('my search term', ['field1'])).toEqual(
                `startswith(\`field1\`, "my search term")`
            );
        });
        test('StartWith clause with no field', () => {
            expect(textStartWith('my search term')).toEqual(`startswith("my search term")`);
        });
    });
});
