/** Event triggered when a filter needs to apply its filter value */
export type DispatchedFilterEvent = {
    filter: {
        value: string | null;
    };
};

export type SelectOptions = {
    fieldName: string;
    availableValues: string[];
    isMulti?: boolean;
    isSearchable?: boolean;
    placeholder?: string | null;
    defaultValue?: ValueType;
    isMenuOpen?: boolean;
};

export type ValueItemType = {
    value: string;
    label: string;
    index: number;
};

export type ValueType = ValueItemType | ValueItemType[] | undefined;
