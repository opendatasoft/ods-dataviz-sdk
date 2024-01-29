import React, { useCallback, useMemo } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story, Meta } from '@storybook/react';
import type { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { ChartSeriesType } from '@opendatasoft/visualizations';

import { Chart } from 'src';
import type { Props } from 'reactify';
import { defaultSource } from '../../utils';

enum Locales {
    English_UnitedStates = 'en-US',
    English_UnitedKingdom = 'en-GB',
    French_France = 'fr-FR',
    French_Switzerland = 'fr-CH',
    Dutch_Neterlands = 'nl-NL',
    Portuguese_Portugal = 'pt-PT',
    Italian_Italy = 'it-IT',
    Italian_Switzerland = 'it-CH',
    Arabic_ArabEmirates = 'ar-AE',
    Arabic_SaudiArabia = 'ar-SA',
    Arabic_Qatar = 'ar-QA',
    German_Germany = 'de-DE',
    German_Switzerland = 'de-CH',
    Spanish_Spain = 'es-ES',
    Catalan_Spain = 'ca-ES',
    Basque = 'eu',
    Swedish_Sweden = 'sv-SE',
}

const LOCALES_MAPPING: { [locale: string]: string } = {
    [Locales.English_UnitedStates]: 'English (United States)',
    [Locales.English_UnitedKingdom]: 'English (United Kingdom)',
    [Locales.French_France]: 'French (France)',
    [Locales.French_Switzerland]: 'French (Switzerland)',
    [Locales.Dutch_Neterlands]: 'Dutch (Netherlands)',
    [Locales.Portuguese_Portugal]: 'Portuguese (Portugal)',
    [Locales.Italian_Italy]: 'Italian (Italy)',
    [Locales.Italian_Switzerland]: 'Italian (Switzerland)',
    [Locales.Arabic_ArabEmirates]: 'Arabic (Arab Emirates)',
    [Locales.Arabic_SaudiArabia]: 'Arabic (Saudi Arabia)',
    [Locales.Arabic_Qatar]: 'Arabic (Qatar)',
    [Locales.German_Germany]: 'German (Germany)',
    [Locales.German_Switzerland]: 'German (Switzerland)',
    [Locales.Spanish_Spain]: 'Spanish (Spain)',
    [Locales.Catalan_Spain]: 'Catalan (Spain)',
    [Locales.Basque]: 'Basque',
    [Locales.Swedish_Sweden]: 'Swedish (Sweden)',
};

/**
 * Number format notations and options
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
 */

enum NumberFormatNotations {
    Standard = 'standard',
    CompactShort = 'Compact short',
    CompactLong = 'Compact long',
}

/**
 * Chart assembly options for line and bar charts
 */
enum Assemblage {
    Separate = 'separate',
    Stacked = 'stacked',
    Percentage = 'percentage',
}

/**
 * This function is used to convert the number format options from the chart configuration
 * to the Intl.NumberFormatOptions used by the Intl.NumberFormat API to format numbers.
 */
function decimalFormatOptions(
    notation: NumberFormatNotations,
    maximumFractionDigits: number
): Intl.NumberFormatOptions {
    switch (notation) {
        case NumberFormatNotations.Standard:
            return { notation: 'standard', maximumFractionDigits };
        case NumberFormatNotations.CompactShort:
            return { notation: 'compact', maximumFractionDigits };
        case NumberFormatNotations.CompactLong:
            return { notation: 'compact', compactDisplay: 'long', maximumFractionDigits };
        default:
            return { notation: 'compact', maximumFractionDigits: 1 };
    }
}

const meta: Meta = {
    title: 'Chart/Formatting/Tooltips',
};

export default meta;

type TemplateProps = {
    locale: Locales;
    notation: NumberFormatNotations;
    decimals: number;
    assemblage: Assemblage;
    chartOptions: Props<DataFrame, ChartOptions>;
};

function Template(args: TemplateProps): React.ReactElement {
    const {
        locale,
        notation,
        decimals,
        assemblage,
        chartOptions: { data, options },
    } = args;

    const numberFormatter = useCallback(
        (value: number) =>
            new Intl.NumberFormat(locale, decimalFormatOptions(notation, decimals)).format(value),
        [locale, notation, decimals]
    );

    const chartOptions = useMemo(
        () => ({
            ...options,
            title: {
                text: `Current locale: ${LOCALES_MAPPING[locale]}`,
            },
            subtitle: {
                text: `Tooltip exemple: ${numberFormatter(10000000.12345)}`,
            },
            tooltip: {
                numberFormatter,
            },
            axis: {
                ...options.axis,
                assemblage: {
                    stacked:
                        assemblage === Assemblage.Stacked || assemblage === Assemblage.Percentage,
                    percentaged: assemblage === Assemblage.Percentage,
                },
            },
        }),
        [locale, assemblage, options, numberFormatter]
    );

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Chart style={{ width: '60vw' }} data={data} options={chartOptions} />
        </div>
    );
}

export const Default: Story<TemplateProps> = Template.bind({});

Default.args = {
    locale: Locales.English_UnitedStates,
    notation: NumberFormatNotations.Standard,
    decimals: 2,
    assemblage: Assemblage.Separate,
    chartOptions: {
        data: {
            value: [{ x: 'Big number', y0: 10000000.12345, y1: 5000000.12345, y2: 2500000.12345 }],
            loading: false,
        },
        options: {
            source: defaultSource,
            labelColumn: 'x',
            axis: {
                x: {
                    display: true,
                    gridLines: {
                        display: false,
                    },
                    type: 'category',
                    offset: true,
                },
                y: {
                    display: true,
                    type: 'linear',
                    gridLines: {
                        display: 'single',
                    },
                },
            },
            series: [
                {
                    type: ChartSeriesType.Bar,
                    valueColumn: 'y0',
                    backgroundColor: '#c3cde3',
                    borderColor: '#8da0cb',
                },
                {
                    type: ChartSeriesType.Bar,
                    valueColumn: 'y1',
                    backgroundColor: '#fac4b2',
                    borderColor: '#fc8d62',
                },
                {
                    type: ChartSeriesType.Bar,
                    valueColumn: 'y2',
                    backgroundColor: '#b0dcd1',
                    borderColor: '#63bb9e',
                },
            ],
        },
    },
};

Default.argTypes = {
    locale: {
        options: Object.values(Locales),
        control: {
            type: 'select',
            labels: LOCALES_MAPPING,
        },
    },
    notation: {
        options: Object.values(NumberFormatNotations),
        control: {
            type: 'select',
        },
    },
    decimals: {
        options: [0, 1, 2, 3, 4, 5],
        control: {
            type: 'select',
        },
    },
    assemblage: {
        options: Object.values(Assemblage),
        control: {
            type: 'select',
        },
    },
};
