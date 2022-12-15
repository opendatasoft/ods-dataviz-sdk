import { flatten } from 'lodash';
import type { Filter } from "./types";
import { all } from '@opendatasoft/api-client';

export default class FilterStore {
    private filterComponents: {[key: string]: Filter[]}
    private listeners: Function[];

    constructor() {
        this.filterComponents = {};
        this.listeners = [];
    }

    register() {
        const filterComponentId = `f_${Math.floor(Math.random() * 1000)}`;
        const that = this;
        this.filterComponents[filterComponentId] = [];
        console.log('Register filter', filterComponentId);
        return {
            /** Replaces all current filters for this component */
            setCurrentFilter(filter: Filter) {
                that.filterComponents[filterComponentId] = [filter];
                that.warnListeners();
            }
        }
    }

    onFilterChange(callback: Function) {
        this.listeners.push(callback);
    }

    private compileFilters() {
        const allFilters = flatten(Object.values(this.filterComponents));
        const clauses = allFilters.map((filter: Filter) => {
            switch (filter.type) {
                case 'text':
                    return filter.value && `search("${filter.value}")`;
                /*case 'exact':
                    return filter.value && `${filter.field}="${filter.value}"`*/
                default:
                    return null;
            }
        }).filter(Boolean);
        return clauses.length && all(...clauses) || null;
    }

    private warnListeners() {
        const whereClause = this.compileFilters();
        this.listeners.forEach(listenerCallback => listenerCallback(whereClause));
    }
}