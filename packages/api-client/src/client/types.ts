// Type hints for Api response

import { ValueOf } from '../utils';
import {
    EXPORT_CATALOG_FORMAT,
    EXPORT_DATASET_FORMAT,
    ODS_DATASET_FIELD_TYPE,
    ODS_DATASET_FIELD_SEMANTIC_TYPE,
    ODS_METADATA_TEMPLATE_FIELD_TYPE,
} from './constants';

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

interface DataWithLinks {
    _links?: Link[];
}

export type DatasetFieldType = ValueOf<typeof ODS_DATASET_FIELD_TYPE>;

export type DatasetFieldSemanticType = ValueOf<typeof ODS_DATASET_FIELD_SEMANTIC_TYPE>;

export type MetadataTemplateFieldType = ValueOf<typeof ODS_METADATA_TEMPLATE_FIELD_TYPE>;

export interface DatasetAttachment {
    id: string;
    mimetype: string;
    title: string;
    url: string;
}

export interface DatasetAlternativeExport extends DatasetAttachment {
    description: string;
}

export interface DatasetField {
    description: string | null;
    name: string;
    label: string;
    type: DatasetFieldType;
    semantic_type?: DatasetFieldSemanticType;
    annotations: unknown;
}

export type Dataset = DataWithLinks & {
    dataset_id: string;
    dataset_uid: string;
    has_records: boolean;
    data_visible: boolean;
    features: string[];
    metas: object;
    fields: DatasetField[];
    visibility: 'restricted' | 'domain';
    attachments: DatasetAttachment[];
    alternative_exports: DatasetAlternativeExport[];
};

export type DatasetRecord<T extends object> = T & DataWithLinks;

export interface ApiFacets {
    links: Link[];
    facets: FacetRoot[];
}

export type ApiQuery<T extends object> = DataWithLinks & {
    total_count?: number;
    results: T[];
};

export type ApiCatalog<Shape extends object = Dataset> = ApiQuery<Shape> & { total_count: number };
export type ApiDatasetRecords<R extends object> = ApiQuery<DatasetRecord<R>> & {
    total_count: number;
};

export interface ApiExport<T> {
    [key: string]: T;
}

export type ExportCatalogFormat = ValueOf<typeof EXPORT_CATALOG_FORMAT>;

export type ExportDatasetFormat = ValueOf<typeof EXPORT_DATASET_FORMAT>;

export type FileEntry = {
    thumbnail: boolean;
    filename: string;
    format: string;
    id: string;
    url: string;
    height: number;
    width: number;
    exif_orientation: 1 | 8 | 6 | 3;
    color_summary: string[];
};
