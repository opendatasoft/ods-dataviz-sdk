import { Async, KpiCardOptions } from '@opendatasoft/visualizations';
import { Meta } from '@storybook/react';
import { KpiCard, Props } from '../../src';
import { IMAGES } from '../utils';

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
            ['--kpi-card-background-color' as any]: '#f6f8fb',
            ['--kpi-card-value-color' as any]: 'orange',
            ['--kpi-card-border-width' as any]: '0',
        }}
    >
        {Object.keys(args).map((key) => (
            <KpiCard {...args[key]} key={key} />
        ))}
    </div>
);

function withData(data: Async<number>): KpiCardStoryProps {
    return {
        'Context only': {
            data,
            options: {
                description: 'médailles aux JO de Tokyo 2021',
            },
        },
        'Context, picture': {
            data,
            options: {
                imgSrc: IMAGES.trophy,
                description: 'médailles aux JO de Tokyo 2021',
            },
        },
        'Header only': {
            style: {
                ['--kpi-card-header-background-color' as any]: 'none',
            },
            data,
            options: {
                header: 'Budget des JO Tokyo 2021',
                suffix: '€',
            },
        },
        'Title, picture': {
            style: {
                ['--kpi-card-body-flex-direction' as any]: 'row',
            },
            data,
            options: {
                title: 'Tokyo Olympic Budget 2021',
                imgSrc: IMAGES.gov,
                prefix: '$',
            },
        },
    };
}

export const Loading = Template.bind({});
Loading.args = withData({ loading: true });

export const ShortValue = Template.bind({});
ShortValue.args = withData({ value: 42 });

export const LongValue = Template.bind({});
LongValue.args = withData({ value: 123456789 });
