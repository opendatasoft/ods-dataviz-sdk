// Type hints for Api response

export interface Facet {
    name?: string;
    count?: number;
    path?: string;
    facets?: Facet[];
}

export interface Link {
    href?: string;
    rel?: string;
}

export interface Dataset {
    dataset_id?: string;
    dataset_uid?: string;
    has_records?: boolean;
    data_visible?: boolean;
    features?: string[];
    metas?: Record<string, any>;
    fields?: {
        name?: string;
        label?: string;
        type?: string;
        annotations?: any;
        description?: string;
    }[];
}

export interface OdsRecord {
    id?: string;
    timestamp?: string;
    size?: number;
    fields?: Record<string, any>;
}

export interface ApiResponse {
    total_count?: number;
    links?: Link[];
    aggregations?: any[];
    facets?: Facet[];
    datasets?: { links?: Link[]; dataset?: Dataset }[];
    records?: { links?: Link[]; record?: OdsRecord }[];
    record?: OdsRecord;
    dataset?: Dataset;
}
