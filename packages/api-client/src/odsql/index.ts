import update from 'immutability-helper';

if (!URLSearchParams) {
    throw new Error('URLSearchParams was not found, try installing a polyfill.');
}
export class Query {
    private readonly params: Record<string, string | string[]>;
    private readonly path: string;
    private searchParams: URLSearchParams | undefined = undefined;

    constructor(path: string = '', init?: Record<string, string | string[]>) {
        this.params = init ? { ...init } : {};
        this.path = path;
    }

    getParams(): Record<string, string | string[]> {
        return { ...this.params };
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

    select(expressions: string): Query {
        return this.set('select', expressions);
    }

    where(filters: string): Query {
        return this.set('where', filters);
    }

    andWhere(filters: string): Query {
        const currentFilters = this.params['where'];
        if (currentFilters)
            return this.where(`(${currentFilters}) AND (${filters})`);
        return this.set('where', filters);
    }

    orWhere(filters: string): Query {
        const currentFilters = this.params['where'];
        if (currentFilters)
            return this.where(`(${currentFilters}) OR (${filters})`);
        return this.set('where', filters);
    }

    groupBy(expressions: string): Query {
        return this.set('group_by', expressions);
    }

    orderBy(expressions: string): Query {
        return this.set('order_by', expressions);
    }

    limit(limit: number): Query {
        return this.set('limit', limit.toString());
    }

    offset(offset: number): Query {
        return this.set('offset', offset.toString());
    }

    facet(facet: string): Query {
        return this.append("facet", facet);
    }

    refine(refine: string): Query {
        return this.append("refine", refine);
    }

    exclude(exclude: string): Query {
        return this.append("exclude", exclude);
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
            aggregates: () =>
                new Query(`${source}/datasets/${datasetId}/aggregates/`),
            facets: () => new Query(`${source}/datasets/${datasetId}/facets/`),
            records: () => new Query(`${source}/datasets/${datasetId}/records/`),
        }),
    });
}

export const fromCatalog = root('catalog');

export const fromMonitoring = root('monitoring');

export const fromDataNetwork = root('opendatasoft');

export const field = (fieldName: string) => `\`${fieldName}\``;

export const string = (value: string) =>
    `"${value.replaceAll('"', '\\"').replaceAll('\\', '\\\\')}"`;

export const dateTime = (date: Date) => `date'${date.toISOString()}'`;

export const date = (date: Date) => `date'${date.toISOString().split('T')[0]}'`;
