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

export const dateTime = (date: Date) => `date'${date.toISOString()}'`;

function inlineMonthOrDay(value?: number) {
    if (value === undefined) return '';
    if (value < 10) return `-0${value}`;
    return `-${value}`;
}
/** Format year month year and day numbers into an API call format.
If you have an YYYY-MM-DD string already, use FromIsoString  instead.
*/
export const date = ({ year, month, day }: { year: number; month?: number; day?: number }) =>
    `date'${year}${inlineMonthOrDay(month)}${inlineMonthOrDay(day)}'`;

/** Formats an YYYY-MM-DD date string into an API call string.
 * Avoids converting to number if you already have a string.
 */
export const dateFromIsoString = (dateStr: string) => `date'${dateStr}'`;

/* Very random, could be any other ODSQL helper… */
export const search = (text: string) => `search("${text}")`;
export const fieldSelect = (
    { column, value }
    : { column: string, value: string }
) => `${field(column)}:${string(value)}`;

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

/* Very random, could be date, all fields, IN… */
export const search = (text: string) => `search("${text}")`;
export const fieldSelect = ({ column, value }: { column: string; value: string }) =>
    `${field(column)}:${string(value)}`;
/* POC Utiles for compoosing Where clauses */
type Operator = typeof search | typeof fieldSelect;
/* Ideally we type like Value[Operator] or something */
export type Clause = { operator: Operator; value?: any };

/* Maybe one function per odperator? Lik addSearchClause, addSelectClause etc. */
export const addClause = (operator: Operator, clauses: Clause[]) => {
    const clause: Clause = { operator };
    
    const set = (value: string) => {
        clause.value = value;
    };

    const clear = () => {
        delete clause.value;
    };

    return { set, clear, clauses: [...clauses, clause] };
};

const applyClause = (query: Query, clause: Clause) => query.where(
    (filter) => all(filter, clause.operator(clause.value))
);
export const makeQueryAdapter = (query: Query, clauses: Clause[]) => clauses.reduce<Query>(applyClause, query);

/* OLD Version that kept an internal state.
It can seem useful, but it hides the state, making it difficult to react.
Plus we mutate things more… which always lead to trouble 

Used like const { addClause, getClause } * composeClause();
const { set, clear } = accClauseooperator);

Class could work as well
*/

export const composeClauses = () => {
    const clauses: Clause[] = [];

    const addClause = (operator: Operator) => {
        const clause: Clause = { operator }; // value undefined at this point
        clauses.push = clause;

        const set = (value: any) => {
            clause.value = value;
        }; 
        
        const clear = () => {
            delete clause.value;
        };

        return { set, clear };
    };

    const getClauses = () => clauses;

    const queryAdapter = (query: Query) => clauses.reduce<Query>(applyClause, query);

    return { addClause, getClauses, queryAdapter };
};
