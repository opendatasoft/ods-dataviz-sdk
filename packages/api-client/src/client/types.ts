// Type hints for Api response

import { ValueOf } from '../utils';
import { EXPORT_CATALOG_FORMAT, EXPORT_DATASET_FORMAT, ODS_DATASET_FIELD_TYPE } from './constants';

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

export interface OdsLink {
    href: string;
    rel: string;
}

interface OdsDataWithLinks {
    _links?: OdsLink[];
}

export type OdsDatasetFieldType = ValueOf<typeof ODS_DATASET_FIELD_TYPE>;

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

export type OdsDataset = OdsDataWithLinks & {
    dataset_id: string;
    dataset_uid: string;
    has_records: boolean;
    data_visible: boolean;
    features: string[];
    metas: object;
    fields: OdsDatasetField[];
    visibility: 'restricted' | 'domain';
    attachements: OdsDatasetAttachement[];
    alternative_exports: OdsDatasetAlternativeExport[];
};

export type OdsDatasetRecord<T extends object> = T & OdsDataWithLinks;

export interface ApiFacets {
    links: OdsLink[];
    facets: FacetRoot[];
}

export type ApiQuery<T extends object> = OdsDataWithLinks & {
    total_count?: number;
    results: T[];
};

export type ApiCatalog = ApiQuery<OdsDataset> & { total_count: number };
export type ApiDatasetRecords<R extends object> = ApiQuery<OdsDatasetRecord<R>> & {
    total_count: number;
};

export interface ApiExport<T> {
    [key: string]: T;
}

export type ExportCatalogFormat = ValueOf<typeof EXPORT_CATALOG_FORMAT>;

export type ExportDatasetFormat = ValueOf<typeof EXPORT_DATASET_FORMAT>;
