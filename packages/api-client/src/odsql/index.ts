import update from 'immutability-helper';

export type StringOrUpdater = string | ((current: string) => string) | null | undefined | false;

export type NumberOrUpdater = number | ((current: number) => number) | null | undefined | false;

export class Query {
    private readonly params: Record<string, string | string[]>;

    private readonly path: string;

    private searchParams: URLSearchParams | undefined = undefined;

    constructor(path = '', init?: Record<string, string | string[]>) {
        this.params = init ? { ...init } : {};
        this.path = path;
    }

    getPath(): string {
        return this.path;
    }

    getSearchParams(): URLSearchParams {
        if (this.searchParams === undefined) {
            this.searchParams = new URLSearchParams();
            Object.entries(this.params).forEach(([name, value]) => {
                if (this.searchParams) {
                    if (typeof value === 'string') {
                        this.searchParams?.set(name, value);
                    } else {
                        [...value].sort().forEach((itValue) => {
                            this.searchParams?.append(name, itValue);
                        });
                    }
                }
            });
            this.searchParams.sort();
        }
        return this.searchParams;
    }

    toString(): string {
        let searchParams = this.getSearchParams().toString();
        if (searchParams) searchParams = `?${searchParams}`;
        return `${this.getPath()}${searchParams}`;
    }

    set(name: string, value: string | string[]): Query {
        const newParams = update(this.params, { $merge: { [name]: value } });
        if (newParams === this.params) return this;
        return new Query(this.path, newParams);
    }

    unset(name: string): Query {
        const newParams = update(this.params, { $unset: [name] });
        if (newParams === this.params) return this;
        return new Query(this.path, newParams);
    }

    update(name: string, value: StringOrUpdater): Query {
        if (!value) {
            return this;
        }
        const current: string | string[] | undefined = this.params[name];
        let newValue = '';
        if (typeof value === 'string') newValue = value;
        else if (typeof current === 'string') newValue = value(current || '');
        else newValue = value(current?.[0] || '');
        return this.set(name, newValue);
    }

    append(name: string, value: string): Query {
        const currentValue: string | string[] | undefined = this.params[name];
        let newValue = null;
        if (currentValue === undefined) {
            newValue = [value];
        } else if (typeof currentValue === 'string') {
            newValue = [currentValue, value];
        } else {
            newValue = [...currentValue, value];
        }
        return this.set(name, newValue);
    }

    select(expressions: StringOrUpdater): Query {
        return this.update('select', expressions);
    }

    where(filters: StringOrUpdater): Query {
        return this.update('where', filters);
    }

    groupBy(expressions: StringOrUpdater): Query {
        return this.update('group_by', expressions);
    }

    orderBy(expressions: StringOrUpdater): Query {
        return this.update('order_by', expressions);
    }

    limit(limit: NumberOrUpdater): Query {
        if (typeof limit === 'number') return this.set('limit', limit.toString());
        return this.update(
            'limit',
            limit && ((current: string) => limit(Number(current)).toString())
        );
    }

    offset(offset: NumberOrUpdater): Query {
        if (typeof offset === 'number') return this.set('offset', offset.toString());
        return this.update(
            'offset',
            offset && ((current: string) => offset(Number(current)).toString())
        );
    }

    facet(facet: string): Query {
        return this.append('facet', facet);
    }

    refine(refine: string): Query {
        return this.append('refine', refine);
    }

    exclude(exclude: string): Query {
        return this.append('exclude', exclude);
    }

    lang(lang: string): Query {
        return this.set('lang', lang);
    }
}

function root(source: string) {
    return () => ({
        itself: () => new Query(`${source}/`),
        /**
         * @deprecated Use query() instead
         */
        aggregates: () => new Query(`${source}/aggregates/`),
        facets: () => new Query(`${source}/facets/`),
        datasets: () => new Query(`${source}/datasets/`),
        query: () => new Query(`${source}/query/`),
        exports: (format: string) => new Query(`${source}/exports/${format}/`),
        dataset: (datasetId: string) => ({
            itself: () => new Query(`${source}/datasets/${datasetId}/`),
            /**
             * @deprecated Use query() instead
             */
            aggregates: () => new Query(`${source}/datasets/${datasetId}/aggregates/`),
            facets: () => new Query(`${source}/datasets/${datasetId}/facets/`),
            records: () => new Query(`${source}/datasets/${datasetId}/records/`),
            query: () => new Query(`${source}/datasets/${datasetId}/query/`),
            exports: (format: string) =>
                new Query(`${source}/datasets/${datasetId}/exports/${format}/`),
        }),
    });
}

export const fromCatalog = root('catalog');

export const fromMonitoring = root('monitoring');

export const fromDataNetwork = root('opendatasoft');

export const field = (fieldName: string) => `\`${fieldName.replace(/`/g, '\\`')}\``;

export const string = (value: string) => JSON.stringify(value);

export const dateTime = (d: Date) => `date'${d.toISOString()}'`;

export const date = (d: Date) => `date'${d.toISOString().split('T')[0]}'`;

export const all = (...conditions: (string | undefined | null)[]) =>
    conditions
        .filter(Boolean)
        .map((condition) => `(${condition})`)
        .join(' AND ');

export const one = (...conditions: (string | undefined | null)[]) =>
    conditions
        .filter(Boolean)
        .map((condition) => `(${condition})`)
        .join(' OR ');

export const list = (...values: (string | undefined | null)[]) => values.filter(Boolean).join(',');

export const not = (condition: string | undefined | null) =>
    condition ? `not (${condition})` : '';
