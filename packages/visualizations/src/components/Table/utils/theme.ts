import { merge } from 'lodash';

import type { TableOptions, Theme } from '../types';

const DEFAULT_THEME: Required<Theme> = {
    textColor: '#565656',
    borderColor: '#cbd2db',
    header: {
        textColor: '#142e7b',
        backgroundColor: '#f2f3f8',
        borderColor: '#dee5ef',
    },
    dataRow: {
        activeBackgroundColor: '#f6f8fb',
    },
};

export default function parseTheme(_theme: TableOptions['theme']) {
    const theme: Required<Theme> = merge(DEFAULT_THEME, _theme);
    let style = '';
    const styleObject = {
        '--text-color': theme.textColor,
        '--border-color': theme.borderColor,
        '--active-row-background-color': theme.dataRow.activeBackgroundColor,
        '--header-text-color': theme.header.textColor,
        '--header-background-color': theme.header.backgroundColor,
        '--header-border-color': theme.header.borderColor,
    };
    Object.entries(styleObject).forEach(([key, value]) => {
        style += `${key}: ${value};\n`;
    });
    return style;
}
