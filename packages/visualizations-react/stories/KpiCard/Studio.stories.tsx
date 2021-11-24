import React from 'react';
import '@opendatasoft/visualizations/node_modules/tippy.js/dist/tippy.css';
import { Async, KpiCardOptions } from '@opendatasoft/visualizations';
import { Meta } from '@storybook/react';
import { KpiCard, Props } from '../../src';
import {
    IMAGES,
    defaultSource,
    simpleFormatter,
    ratioFormatter,
    comparisonFormatter,
} from '../utils';

const meta: Meta = {
    title: 'KPI Card/Studio Layouts',
};

export default meta;

type KpiCardStoryProps = { [key: string]: Props<number, KpiCardOptions> };

const Template = function (this: Props<number, KpiCardOptions>, args: KpiCardStoryProps) {
    return (
        <div
            style={{
                display: 'grid',
                maxWidth: '800px',
                margin: '0 auto',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
                gap: '1rem',
                ['--kpi-card-value-color' as any]: '#198276',
            }}
        >
            {Object.keys(args).map((key) => {
                const { data, options } = args[key];

                return <KpiCard data={data} options={{ ...this.options, ...options }} key={key} />;
            })}
        </div>
    );
};

function withData(data: Async<number>): KpiCardStoryProps {
    return {
        'Context only': {
            data,
            options: {
                description:
                    'Chiffre d’affaires pour la catégorie Fruits et légumes sur l’année en cours',
                suffix: ' EUR',
                source: defaultSource,
            },
        },
        'Context, picture': {
            data,
            options: {
                imgSrc: IMAGES.rocket,
                description:
                    'Chiffre d’affaires pour la catégorie Fruits et légumes sur l’année en cours',
                suffix: ' EUR',
                source: defaultSource,
            },
        },
        'Title only': {
            data,
            options: {
                title: "Chiffre d'affaires",
                suffix: ' EUR',
                source: defaultSource,
            },
        },
        'Title, picture': {
            data,
            style: {
                ['--kpi-card-body-flex-direction' as any]: 'row',
                ['--kpi-card-img-margin' as any]: '0 1rem 0 0',
                ['--kpi-card-content-align-items' as any]: 'start',
                ['--kpi-card-title-margin' as any]: '0 0 0.37rem 0',
                ['--kpi-card-value-margin' as any]: '0',
            },
            options: {
                title: "Chiffre d'affaires",
                imgSrc: IMAGES.rocket,
                suffix: ' EUR',
                source: defaultSource,
            },
        },
    };
}

export const Loading = Template.bind({ options: { formatCompact: simpleFormatter.format } });
Loading.args = withData({ loading: true });

export const ShortValue = Template.bind({ options: { formatCompact: simpleFormatter.format } });
ShortValue.args = withData({ value: 42 });

export const LongValue = Template.bind({ options: { formatCompact: simpleFormatter.format } });
LongValue.args = withData({ value: 42100 });

export const RatioKPI = Template.bind({ options: { formatCompact: ratioFormatter.format } });
RatioKPI.args = withData({ value: 0.42 });

export const ComparisonKPI = Template.bind({
    options: { formatCompact: comparisonFormatter.format },
});
ComparisonKPI.args = withData({ value: 42 });
