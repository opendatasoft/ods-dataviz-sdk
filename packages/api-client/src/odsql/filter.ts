import { type Query, search, fieldSelect, all } from ".";

type Operator = typeof search | typeof fieldSelect;
type Clause = { operator: Operator, value?: any };

const applyClause =
    (query: Query, clause: Clause) => query.where(filter => all(filter, clause.operator(clause.value)));

/* Class would work as well */
export default (baseQuery: Query /* { apiClient, datasetId } ? */) => {
    /* Maybe we can fetch the type of field to match the right kind of filter? 
    * Check field names etc.
    */

    const clauses: Clause[] = [];

    const addFilter = (operator: Operator) => {
        const clause: Clause = { operator };

        clauses.push(clause); // Object to preserve reference

        const set = (value: string) => { clause.value = value; };
        const clear = () => { delete clause.value; };

        return { set, clear };
    };

    const getQuery = () => clauses.reduce<Query>(applyClause, baseQuery);

    return { addFilter, getQuery };
};