/**
 * @jest-environment jsdom
 */

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
} from '../src/';
import { expect, it, describe, test } from '@jest/globals';

describe('ODSQL query builder', () => {
    it('should build an empty query', () => {
        expect(new Query().toString()).toEqual('');
    });

    it('should allow be immutable when change occurs', () => {
        const query1 = fromCatalog()
            .dataset('my_dataset')
            .itself()
            .select('my_field');

        expect(query1).not.toBe(query1.where('my_field > 10'));
        expect(query1).toBe(query1.select('my_field'));
    });

    describe('build the right queries', () => {
        test('with no parameters', () => {
            expect(
                fromCatalog()
                    .datasets()
                    .toString()
            ).toEqual('catalog/datasets/');

            expect(
                fromMonitoring()
                    .itself()
                    .toString()
            ).toEqual('monitoring/');

            expect(
                fromDataNetwork()
                    .dataset('sirene@data')
                    .facets()
                    .lang('fr')
                    .toString()
            ).toEqual('opendatasoft/datasets/sirene@data/facets/?lang=fr');

            expect(
                fromDataNetwork()
                    .dataset('sirene@data')
                    .records()
                    .lang('fr')
                    .toString()
            ).toEqual('opendatasoft/datasets/sirene@data/records/?lang=fr');
        });

        test('with select', () => {
            expect(
                fromCatalog()
                    .itself()
                    .select('dataset_id, records_count')
                    .toString()
            ).toEqual('catalog/?select=dataset_id%2C+records_count');
        });

        test('with where filter', () => {
            const query = fromCatalog()
                .dataset('my_dataset')
                .itself();

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
                    .where(currentFilter => one(currentFilter, 'third filter'))
                    .toString()
            ).toEqual(
                'catalog/datasets/my_dataset/?where=%28%28first+filter%29+AND+%28second+filter%29%29+OR+%28third+filter%29'
            );
        });

        test('complex queries', () => {
            expect(
                fromCatalog()
                    .dataset('my_dataset')
                    .aggregates()
                    .groupBy('x, y')
                    .where(`${field('my_field')}:${string("this will be' escaped")}`)
                    .where(filter => one(filter, `${field('my_field')} < ${date(new Date(0))}`))
                    .where(filter =>
                        all(filter, 'not_escaped in [0..10] and other is true', 'len(f) = 2')
                    )
                    .select('a')
                    .select(selected => selected + ', b')
                    .toString()
            ).toEqual(
                'catalog/datasets/my_dataset/aggregates/?group_by=x%2C+y&select=a%2C+b&where=%28%28%60my_field%60%3A%22this+will+be%27+escaped%22%29+OR+%28%60my_field%60+%3C+date%271970-01-01%27%29%29+AND+%28not_escaped+in+%5B0..10%5D+and+other+is+true%29+AND+%28len%28f%29+%3D+2%29'
            );

            expect(
                fromCatalog()
                    .aggregates()
                    .orderBy(`${field('x')}`)
                    .limit(40)
                    .limit(l => l + 5)
                    .offset(o => o + 10)
                    .refine('field:1')
                    .exclude('field:2')
                    .toString()
            ).toEqual(
                'catalog/aggregates/?exclude=field%3A2&limit=45&offset=10&order_by=%60x%60&refine=field%3A1'
            );
        });

        test('export geojson query', () => {
            expect(
                fromCatalog()
                    .dataset('my_dataset')
                    .exports('geojson')
                    .limit(10000)
                    .toString()
            ).toEqual('catalog/datasets/my_dataset/exports/geojson?limit=10000');
        });

        test('escaping', () => {
            expect(string('-"-\'-\\-p-')).toEqual('"-\\"-\'-\\\\-p-"');
            expect(field('`f')).toEqual('`\\`f`');
        });
    });
});
