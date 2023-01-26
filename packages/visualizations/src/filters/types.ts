/** Event triggered when a filter needs to apply its filter value */
export type DispatchedFilterEvent = {
    filter: {
        value: string | null;
    };
};

export type SelectOptions = {
    fieldName: string;
    availableValues: string[];
    multiple?: boolean;
    placeholder?: string | null;
};
