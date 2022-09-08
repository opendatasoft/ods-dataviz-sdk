// Type hints for Api response

export interface Facet {
    name: string;
    count: number;
    path?: string;
    facets?: Facet[];
}

export interface Link {
    href: string;
    rel: string;
}

export interface OdsDataset {
    dataset_id?: string;
    dataset_uid?: string;
    has_records?: boolean;
    data_visible?: boolean;
    features?: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metas?: Record<string, any>;
    fields?: {
        name?: string;
        label?: string;
        type?: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        annotations?: any;
        description?: string;
    }[];
}

export interface OdsRecord<T> {
    id?: string;
    timestamp?: string;
    size?: number;
    fields: T;
}

export interface ApiRecords<T> {
    total_count?: number;
    links: Link[];
    records: { links: Link[]; record: OdsRecord<T> }[];
}

export interface ApiRecord<T> {
    links: Link[];
    record: OdsRecord<T>;
}

export interface ApiDatasets {
    total_count: number;
    links: Link[];
    datasets: { links: Link[]; dataset: OdsDataset }[];
}

export interface ApiDataset {
    links: Link[];
    dataset: OdsDataset;
}

export interface ApiFacets {
    links: Link[];
    facets: Facet[];
}

export interface ApiQuery<T> {
    total_count?: number;
    results: T[];
}
