export const ODS_DATASET_FIELD_TYPE = {
    TEXT: "text",
    INT : "int",
    DOUBLE : "double",
    BOOLEAN : "boolean",
    GEO_SHAPE : "geo_shape",
    DATETIME : "datetime",
    DATE : "date",
    IMAGE : "image",
    FILE : "file",
    JSON : "json",
} as const;

export const EXPORT_DATASET_FORMAT = {
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

export const EXPORT_CATALOG_FORMAT = {
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
