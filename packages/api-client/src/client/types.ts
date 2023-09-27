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
    results: OdsRecord<T>[];
}

export interface ApiDatasets {
    total_count: number;
    links: Link[];
    results: OdsDataset[];
}

export interface ApiFacets {
    links: Link[];
    facets: Facet[];
}

export interface ApiQuery<T> {
    total_count?: number;
    results: T[];
}

export interface ApiExport<T> {
    [key: string]: T;
}
export const EnumExportCatalogFormat = {
    CSV: 'csv',
    JSON: 'json',
    XLSX: 'xlsx',
    RDF: 'rdf',
    TTL: 'ttl',
    DATA_JSON: 'data.json',
    RSS: 'rss',
    DCAT: 'dcat',
    DCAT_AP_CH: 'dcat-ap-ch',
    DCAT_AP_IT: 'dcat-ap-it',
    DCAT_AP_DE: 'dcat-ap-de',
    DCAT_AP_SE: 'dcat-ap-se',
    DCAT_AP_SP: 'dcat-ap-sp',
    DCAT_AP_V1: 'dcat-ap-v1',
    DCAT_AP_BENAP: 'dcat_ap_benap',
} as const;

export type ExportCatalogFormat =
    typeof EnumExportCatalogFormat[keyof typeof EnumExportCatalogFormat];

export const EnumExportDatasetFormat = {
    JSON: 'json',
    GEOJSON: 'geojson',
    SHP: 'shp',
    CSV: 'csv',
    XLSX: 'xlsx',
    KML: 'kml',
    JSONLD: 'jsonld',
    JSONL: 'jsonl',
    RDFXML: 'rdfxml',
    TURTLE: 'turtle',
    N3: 'n3',
    MVT: 'mvt',
} as const;

export type ExportDatasetFormat =
    typeof EnumExportDatasetFormat[keyof typeof EnumExportDatasetFormat];
