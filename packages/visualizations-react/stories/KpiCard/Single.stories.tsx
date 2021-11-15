import React from 'react';
import { Meta } from '@storybook/react';
import { KpiCard } from '../../src';
import { COLORS, CONTROLS, IMAGES, defaultSource } from '../utils';

const meta: Meta = {
    title: 'KPI Card/Single',
    argTypes: {
        header: CONTROLS.text,
        imgSrc: CONTROLS.image,
        title: CONTROLS.text,
        prefix: CONTROLS.text,
        value: CONTROLS.number,
        suffix: CONTROLS.text,
        description: CONTROLS.text,
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
        '--kpi-card-img-height': CONTROLS.text,
        '--kpi-card-img-align-self': CONTROLS.alignItems,
        // Kpi Card Content
        '--kpi-card-content-align-self': CONTROLS.alignItems,
        // Kpi Card Value
        '--kpi-card-value-font-size': CONTROLS.text,
        '--kpi-card-value-font-weight': CONTROLS.fontWeight,
        '--kpi-card-value-color': CONTROLS.color,
        // Kpi Card Footer
        '--kpi-card-footer-background-color': CONTROLS.color,
        '--kpi-card-footer-color': CONTROLS.color,
        '--kpi-card-footer-font-size': CONTROLS.text,
        '--kpi-card-footer-font-weight': CONTROLS.fontWeight,
        '--kpi-card-footer-text-align': CONTROLS.textAlign,
        '--kpi-card-source-link-align-self': CONTROLS.alignSelf,
    },
};

export default meta;

const Template = ({
    header,
    imgSrc,
    title,
    prefix,
    value,
    suffix,
    description,
    footer,
    ...style
}: any) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
        }}
    >
        <KpiCard
            data={{
                value,
            }}
            options={{
                header,
                title,
                description,
                prefix,
                suffix,
                imgSrc,
                footer,
                source: defaultSource,
            }}
            style={style}
        />
    </div>
);
export const Default = Template.bind({});
Default.args = {
    header: 'Header',
    title: 'KPI Card',
    description: 'This is a description',
    value: 1000,
    prefix: '$',
    footer: 'Footer',
    imgSrc: Object.keys(IMAGES)[0],
    height: 'auto',
    width: '500px',
};

export const FullCustom = Template.bind({});
FullCustom.args = {
    header: 'Header',
    imgSrc: 'gov',
    title: 'Title',
    prefix: '$',
    value: 12345,
    suffix: ' M',
    description: 'Description',
    footer: 'Footer',
    height: '400px',
    width: '400px',
    // Kpi Card
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
    '--kpi-card-img-height': '2rem',
    '--kpi-card-img-align-self': 'start',
    // Kpi Card Content
    '--kpi-card-content-align-self': 'end',
    // Kpi Card Value
    '--kpi-card-value-font-size': '3rem',
    '--kpi-card-value-font-weight': '400',
    '--kpi-card-value-color': 'white',
    // Kpi Card Footer
    '--kpi-card-footer-background-color': 'white',
    '--kpi-card-footer-color': COLORS.red,
    '--kpi-card-footer-font-size': '1rem',
    '--kpi-card-footer-font-weight': '400',
    '--kpi-card-footer-text-align': 'left',
    '--kpi-card-source-link-align-self': 'end',
};
