/**
 * @jest-environment jsdom
 */

import { fromCatalog, Query, fromDataNetwork, fromMonitoring, field, dateTime } from '../src/';
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
                    .toString()
            ).toEqual('opendatasoft/datasets/sirene@data/facets/');
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
                    .where('first filter')
                    .andWhere('second filter')
                    .orWhere('third filter')
                    .toString()
            ).toEqual(
                'catalog/datasets/my_dataset/?where=%28%28first+filter%29+AND+%28second+filter%29%29+OR+%28third+filter%29'
            );
        });
    });
});
