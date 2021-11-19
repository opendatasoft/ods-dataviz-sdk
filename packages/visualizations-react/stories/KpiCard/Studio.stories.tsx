import React from 'react';
import { Async, KpiCardOptions } from '@opendatasoft/visualizations';
import { Meta } from '@storybook/react';
import { KpiCard, Props } from '../../src';
import {
    IMAGES,
    defaultSource,
    kpiNumberFormat,
    kpiRatioNumberFormat,
    kpiComparisonNumberFormat,
} from '../utils';

const meta: Meta = {
    title: 'KPI Card/Studio Layouts',
};

export default meta;

type KpiCardStoryProps = { [key: string]: Props<number, KpiCardOptions> };

const Template = (args: KpiCardStoryProps) => (
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
        {Object.keys(args).map((key) => (
            <KpiCard {...args[key]} key={key} />
        ))}
    </div>
);

function withData(data: Async<number>, formatOptions: any): KpiCardStoryProps {
    return {
        'Context only': {
            data,
            options: {
                description:
                    'Chiffre d’affaires pour la catégorie Fruits et légumes sur l’année en cour',
                suffix: ' EUR',
                source: defaultSource,
                formatCompact: (value) => formatOptions.format(value),
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
                formatCompact: (value) => formatOptions.format(value),
            },
        },
        'Title only': {
            data,
            options: {
                title: "Chiffre d'affaires",
                suffix: ' EUR',
                source: defaultSource,
                formatCompact: (value) => formatOptions.format(value),
            },
        },
        'Title, picture': {
            style: {
                ['--kpi-card-body-flex-direction' as any]: 'row',
                ['--kpi-card-img-margin' as any]: '0 1rem 0 0',
                ['--kpi-card-content-align-items' as any]: 'start',
                ['--kpi-card-title-margin' as any]: '0',
                ['--kpi-card-value-margin' as any]: '0',
            },
            data,
            options: {
                title: "Chiffre d'affaires",
                imgSrc: IMAGES.rocket,
                suffix: ' EUR',
                source: defaultSource,
                formatCompact: (value) => formatOptions.format(value),
            },
        },
    };
}

export const Loading = Template.bind({});
Loading.args = withData({ loading: true }, kpiNumberFormat);

export const ShortValue = Template.bind({});
ShortValue.args = withData({ value: 42 }, kpiNumberFormat);

export const LongValue = Template.bind({});
LongValue.args = withData({ value: 42100 }, kpiNumberFormat);

export const RatioKPI = Template.bind({});
RatioKPI.args = withData({ value: 0.42 }, kpiRatioNumberFormat);

export const ComparisonKPI = Template.bind({});
ComparisonKPI.args = withData({ value: 42 }, kpiComparisonNumberFormat);
