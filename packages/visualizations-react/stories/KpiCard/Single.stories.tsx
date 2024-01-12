import React, { CSSProperties } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { KpiCardOptions } from '@opendatasoft/visualizations';
import { KpiCard } from 'src';
import { Props } from 'reactify';
import { COLORS, CONTROLS, IMAGES, defaultSource } from '../utils';

const meta: ComponentMeta<typeof KpiCard> = {
    title: 'KPI Card/Single',
    argTypes: {
        data: {
            value: CONTROLS.number,
        },
        options: {
            header: CONTROLS.text,
            imgSrc: CONTROLS.image,
            title: CONTROLS.text,
            prefix: CONTROLS.text,
            suffix: CONTROLS.text,
            // description: CONTROLS.text,
        },
        style: {
            footer: CONTROLS.text,
            height: CONTROLS.text,
            width: CONTROLS.text,
            // Kpi Card
            '--kpi-card-background-color': CONTROLS.color,
            '--kpi-card-color': CONTROLS.color,
            '--kpi-card-border-radius': CONTROLS.text,
            '--kpi-card-border-width': CONTROLS.text,
            '--kpi-card-border-style': CONTROLS.borderStyle,
            '--kpi-card-border-color': CONTROLS.color,
            // Kpi Card Body
            '--kpi-card-body-flex-direction': CONTROLS.flexDirection,
            '--kpi-card-body-justify-content': CONTROLS.justifyContent,
            // Kpi Card Header
            '--kpi-card-header-background-color': CONTROLS.color,
            '--kpi-card-header-color': CONTROLS.color,
            '--kpi-card-header-font-size': CONTROLS.text,
            '--kpi-card-header-font-weight': CONTROLS.fontWeight,
            '--kpi-card-header-text-align': CONTROLS.textAlign,
            // Kpi Card Img
            '--kpi-card-img-align-self': CONTROLS.alignItems,
            '--kpi-card-img-margin': CONTROLS.text,
            // Kpi Card Content
            '--kpi-card-content-align-self': CONTROLS.alignItems,
            '--kpi-card-content-align-items': CONTROLS.alignItems,
            // Kpi Card Title
            '--kpi-card-title-margin': CONTROLS.text,
            // Kpi Card Value
            '--kpi-card-value-font-size': CONTROLS.text,
            '--kpi-card-value-font-weight': CONTROLS.fontWeight,
            '--kpi-card-value-color': CONTROLS.color,
            '--kpi-card-value-margin': CONTROLS.text,
            // Kpi Card Source Link
            '--kpi-card-source-link-align-self': CONTROLS.alignSelf,
            // Kpi Card Footer
            '--kpi-card-footer-background-color': CONTROLS.color,
            '--kpi-card-footer-color': CONTROLS.color,
            '--kpi-card-footer-font-size': CONTROLS.text,
            '--kpi-card-footer-font-weight': CONTROLS.fontWeight,
            '--kpi-card-footer-text-align': CONTROLS.textAlign,
        },
    },
};

export default meta;

const WrappedKpi = ({
    style,
    ...kpiProps
}: {
    style: CSSProperties;
} & Props<number, KpiCardOptions>) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
            ...style,
        }}
    >
        <KpiCard {...kpiProps} />
    </div>
);
// eslint-disable-next-line arrow-parens
const Template: ComponentStory<typeof WrappedKpi> = (args) => <WrappedKpi {...args} />;

export const Default = Template.bind({});
Default.args = {
    data: {
        loading: false,
        value: 1000,
    },
    options: {
        header: 'Header',
        title: 'KPI Card',
        description: 'This is a description',
        prefix: '$',
        footer: 'Footer',
        imgSrc: IMAGES.gov,
        source: defaultSource,
    },
    style: {
        height: 'auto',
        width: '500px',
    },
};

export const FullCustom = Template.bind({});
FullCustom.args = {
    data: {
        loading: false,
        value: 12345,
    },
    options: {
        header: 'Header',
        imgSrc: IMAGES.gov,
        title: 'Title',
        prefix: '$',
        suffix: ' M',
        description: 'Description',
        footer: 'Footer',
        source: defaultSource,
        // Kpi Card
    },
    style: {
        height: '400px',
        width: '400px',
        '--kpi-card-background-color': COLORS.red,
        '--kpi-card-color': 'white',
        '--kpi-card-border-radius': '0px',
        '--kpi-card-border-width': '2px',
        '--kpi-card-border-style': 'solid',
        '--kpi-card-border-color': COLORS.purple,
        // Kpi Card Body
        '--kpi-card-body-flex-direction': 'row',
        '--kpi-card-body-justify-content': 'space-between',
        // Kpi Card Header
        '--kpi-card-header-background-color': 'white',
        '--kpi-card-header-color': COLORS.red,
        '--kpi-card-header-font-size': '1rem',
        '--kpi-card-header-font-weight': '400',
        '--kpi-card-header-text-align': 'left',
        // Kpi Card Img
        '--kpi-card-img-align-self': 'start',
        // Kpi Card Content
        '--kpi-card-content-align-self': 'end',
        '--kpi-card-content-align-items': 'center',
        // Kpi Card Value
        '--kpi-card-value-font-size': '3rem',
        '--kpi-card-value-font-weight': '400',
        '--kpi-card-value-color': 'white',
        // Kpi Card Source Link
        '--kpi-card-source-link-align-self': 'end',
        // Kpi Card Footer
        '--kpi-card-footer-background-color': 'white',
        '--kpi-card-footer-color': COLORS.red,
        '--kpi-card-footer-font-size': '1rem',
        '--kpi-card-footer-font-weight': '400',
        '--kpi-card-footer-text-align': 'left',
    } as CSSProperties,
};
