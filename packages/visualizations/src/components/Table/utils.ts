import { sumBy } from 'lodash';
import { DATA_FORMATS, type Column, type SupportedDataFormat } from './types';
import { assertUnreachable } from '../utils';

export const columnOffset = (cols: Column[], index: number) => sumBy(cols.slice(0, index), col => col.width || 0);

export const format = (dataFormat: SupportedDataFormat) => {
    switch(dataFormat) {
        case DATA_FORMATS.longText:
            return {
                formatCell: {
                    textAlign: 'left',
                    maxWidth: '300px',
                    overflow: 'ellipsis',
                    lineClamp: '3',
                },
            };
        case DATA_FORMATS.shortText: 
            return {
                formatCell: {
                    textAlign: 'left',
                    maxWidth: '300px',
                    overflow: 'ellipsis',
                }
            };
        case DATA_FORMATS.integer:
            return {
                formatCell: {
                    textAlign: 'right',    
                }
            };
        case DATA_FORMATS.float:
            return {
                formatCell: {
                    textAlign: 'right',
                }
            };
        case DATA_FORMATS.date:
            return {
                formatCell: {
                    textAlign: 'left',
                }
            };
        default: return assertUnreachable(dataFormat);
    }
};