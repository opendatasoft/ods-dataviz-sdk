import update from 'immutability-helper';

export type StringOrUpdater = string | ((current: string) => string);

export type NumberOrUpdater = number | ((current: number) => number);

export class Query {
    private readonly params: Record<string, string | string[]>;
    private readonly path: string;
    private searchParams: URLSearchParams | undefined = undefined;

    constructor(path: string = '', init?: Record<string, string | string[]>) {
        this.params = init ? { ...init } : {};
        this.path = path;
    }

    getPath(): string {
        return this.path;
    }

    getSearchParams(): URLSearchParams {
        if (this.searchParams === undefined) {
            this.searchParams = new URLSearchParams();
            for (const name in this.params) {
                const value = this.params[name];
                if (typeof value === 'string') {
                    this.searchParams.set(name, value);
                } else {
                    for (const itValue of [...value].sort()) {
                        this.searchParams.append(name, itValue);
                    }
                }
            }
            this.searchParams.sort();
        }
        return this.searchParams;
    }

    toString(): string {
        let searchParams = this.getSearchParams().toString();
        if (searchParams) searchParams = '?' + searchParams;
        return `${this.getPath()}${searchParams}`;
    }

    set(name: string, value: string | string[]): Query {
        const newParams = update(this.params, { $merge: { [name]: value } });
        if (newParams === this.params) return this;
        return new Query(this.path, newParams);
    }

    update(name: string, value: StringOrUpdater): Query {
        const current: string | string[] | undefined = this.params[name];
        let newValue = '';
        if (typeof value === 'string') newValue = value;
        else if (typeof current === 'string') newValue = value(current || '');
        else newValue = value(current?.[0] || '');
        return this.set(name, newValue);
    }

    append(name: string, value: string): Query {
        const currentValue: string | string[] | undefined = this.params[name];
        const newValue =
            currentValue === undefined
                ? [value]
                : typeof currentValue === 'string'
                ? [currentValue, value]
                : [...currentValue, value];
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
        return this.update('limit', (current: string) => limit(Number(current)).toString());
    }

    offset(offset: NumberOrUpdater): Query {
        if (typeof offset === 'number') return this.set('offset', offset.toString());
        return this.update('offset', (current: string) => offset(Number(current)).toString());
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
        aggregates: () => new Query(`${source}/aggregates/`),
        facets: () => new Query(`${source}/facets/`),
        datasets: () => new Query(`${source}/datasets/`),
        dataset: (datasetId: string) => ({
            itself: () => new Query(`${source}/datasets/${datasetId}/`),
            aggregates: () => new Query(`${source}/datasets/${datasetId}/aggregates/`),
            facets: () => new Query(`${source}/datasets/${datasetId}/facets/`),
            records: () => new Query(`${source}/datasets/${datasetId}/records/`),
        }),
    });
}

export const fromCatalog = root('catalog');

export const fromMonitoring = root('monitoring');

export const fromDataNetwork = root('opendatasoft');

export const field = (fieldName: string) => `\`${fieldName.replace(/`/g, '\\`')}\``;

export const string = (value: string) => JSON.stringify(value);

export const dateTime = (date: Date) => `date'${date.toISOString()}'`;

export const date = (date: Date) => `date'${date.toISOString().split('T')[0]}'`;

export const all = (...conditions: string[]) =>
    conditions.map(condition => `(${condition})`).join(' AND ');

export const one = (...conditions: string[]) =>
    conditions.map(condition => `(${condition})`).join(' OR ');
