import React, { CSSProperties } from 'react';
import { Async, KpiCardOptions } from '@opendatasoft/visualizations';
import { Meta, StoryObj } from '@storybook/react';
import type { KpiProps } from '@opendatasoft/visualizations';
import { KpiCard } from 'src';
import {
    IMAGES,
    defaultSource,
    simpleFormatter,
    ratioFormatter,
    comparisonFormatter,
} from '../utils';

const meta: Meta<typeof KpiCard> = {
    title: 'KPI Card/Studio Layouts',
};

export default meta;

type KpiCardStoryProps = KpiProps & { style?: CSSProperties };

/* Makes the mapping easier to type as component stories */
const DemoCards = (stories: { [key: string]: KpiCardStoryProps }) => (
    <div
        style={
            {
                display: 'grid',
                maxWidth: '800px',
                margin: '0 auto',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
                gap: '1rem',
                '--kpi-card-value-color': '#198276',
            } as CSSProperties
        }
    >
        {Object.values(stories).map(({ style, ...props }) => (
            <div style={style}>
                <KpiCard {...props} />
            </div>
        ))}
    </div>
);

function withDataOptions({ data, options }: { data: Async<number>; options: KpiCardOptions }) {
    return {
        'Context only': {
            data,
            options: {
                description:
                    "Chiffre d'affaires pour la catégorie Fruits et légumes sur l'année en cours",
                suffix: ' EUR',
                source: defaultSource,
                ...options,
            },
        },
        'Context, picture': {
            data,
            options: {
                imgSrc: IMAGES.rocket,
                description:
                    "Chiffre d'affaires pour la catégorie Fruits et légumes sur l'année en cours",
                suffix: ' EUR',
                source: defaultSource,
                ...options,
            },
        },
        'Title only': {
            data,
            options: {
                title: "Chiffre d'affaires",
                suffix: ' EUR',
                source: defaultSource,
                ...options,
            },
        },
        'Title, picture': {
            data,
            style: {
                '--kpi-card-body-flex-direction': 'row',
                '--kpi-card-img-margin': '0 1rem 0 0',
                '--kpi-card-content-align-items': 'start',
                '--kpi-card-title-margin': '0 0 0.37rem 0',
                '--kpi-card-value-margin': '0',
            } as CSSProperties,
            options: {
                title: "Chiffre d'affaires",
                imgSrc: IMAGES.rocket,
                suffix: ' EUR',
                source: defaultSource,
                ...options,
            },
        },
    };
}

export const Loading: StoryObj<typeof DemoCards> = {
    args: withDataOptions({
        data: { loading: true },
        options: { formatCompact: simpleFormatter.format },
    }),
    render: (args: { [key: string]: KpiCardStoryProps }) => <DemoCards {...args} />,
};

export const ShortValue: StoryObj<typeof DemoCards> = {
    args: withDataOptions({
        data: { value: -42 },
        options: { formatCompact: simpleFormatter.format },
    }),
    render: (args: { [key: string]: KpiCardStoryProps }) => <DemoCards {...args} />,
};

export const LongValue: StoryObj<typeof DemoCards> = {
    args: withDataOptions({
        data: { value: 42123456 },
        options: { formatCompact: simpleFormatter.format },
    }),
    render: (args: { [key: string]: KpiCardStoryProps }) => <DemoCards {...args} />,
};

export const RatioKPI: StoryObj<typeof DemoCards> = {
    args: withDataOptions({
        data: { value: 0.42343953859 },
        options: { formatCompact: ratioFormatter.format },
    }),
    render: (args: { [key: string]: KpiCardStoryProps }) => <DemoCards {...args} />,
};

export const ComparisonKPI: StoryObj<typeof DemoCards> = {
    args: withDataOptions({
        data: { value: 42.9 },
        options: { formatCompact: comparisonFormatter.format },
    }),
    render: (args: { [key: string]: KpiCardStoryProps }) => <DemoCards {...args} />,
};
