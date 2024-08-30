// Type hints for Api response

import { EXPORT_CATALOG_FORMAT, EXPORT_DATASET_FORMAT, ODS_DATASET_FIELD_TYPE } from "./constants";

export interface Facet {
    name: string;
    count: number;
    value: string;
    state: 'displayed' | 'refined' | 'excluded';
    facets?: Facet[];
}

export interface FacetRoot {
    name: string;
    facets: Facet[];
}

export interface Link {
    href: string;
    rel: string;
}

export type OdsDatasetFieldType =  typeof ODS_DATASET_FIELD_TYPE[keyof typeof ODS_DATASET_FIELD_TYPE];

export interface OdsDatasetAttachement {
    id: string;
    mimetype: string;
    title: string;
    url: string;
}

export interface OdsDatasetAlternativeExport extends OdsDatasetAttachement {
    description: string;
}

export interface OdsDatasetField {
    description: string | null;
    name: string;
    label: string;
    type: OdsDatasetFieldType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    annotations: any;
}

export interface OdsDataset { 
    dataset_id: string;
    dataset_uid: string;
    has_records: boolean;
    data_visible: boolean;
    features: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metas: Record<string, any>;
    fields: OdsDatasetField[];
    visibility: 'restricted' | 'domain';
    attachements: OdsDatasetAttachement[]
    alternative_exports: OdsDatasetAlternativeExport[]
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
    facets: FacetRoot[];
}

export interface ApiQuery<T> {
    total_count?: number;
    results: T[];
}

export interface ApiExport<T> {
    [key: string]: T;
}


export type ExportCatalogFormat =
    typeof EXPORT_CATALOG_FORMAT[keyof typeof EXPORT_CATALOG_FORMAT];



export type ExportDatasetFormat =
    typeof EXPORT_DATASET_FORMAT[keyof typeof EXPORT_DATASET_FORMAT];
