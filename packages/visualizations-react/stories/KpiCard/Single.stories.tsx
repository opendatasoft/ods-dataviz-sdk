import { Meta } from '@storybook/react';
import { KpiCard } from '../../src';
import { CONTROLS, IMAGES } from '../utils';

const meta: Meta = {
    title: 'KPI Card/Single',
    argTypes: {
        title: CONTROLS.text,
        description: CONTROLS.text,
        prefix: CONTROLS.text,
        suffix: CONTROLS.text,
        imgSrc: CONTROLS.image,
        height: CONTROLS.text,
        width: CONTROLS.text,
        '--kpi-card-flex-direction': CONTROLS.flexDirection,
        '--kpi-card-justify-content': CONTROLS.justifyContent,
        '--kpi-card-border-radius': CONTROLS.text,
        '--kpi-card-background-color': CONTROLS.color,
        '--kpi-card-border-color': CONTROLS.color,
        '--kpi-card-img-height': CONTROLS.text,
        '--kpi-card-img-padding': CONTROLS.text,
        '--kpi-card-img-align-self': CONTROLS.alignItems,
        '--kpi-card-content-flex-direction': CONTROLS.flexDirection,
        '--kpi-card-content-align-items': CONTROLS.alignItems,
        '--kpi-card-content-justify-content': CONTROLS.justifyContent,
        '--kpi-card-content-align-self': CONTROLS.alignItems,
        '--kpi-card-value-font-size': CONTROLS.text,
        '--kpi-card-value-font-weight': CONTROLS.fontWeight,
        '--kpi-card-value-color': CONTROLS.color,
        '--kpi-card-description-color': CONTROLS.color,
    },
};

export default meta;

const Template = ({ data, title, description, suffix, prefix, imgSrc, ...style }: any) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
        }}
    >
        <KpiCard
            data={data}
            options={{
                title,
                description,
                prefix,
                suffix,
                imgSrc,
            }}
            style={style}
        />
    </div>
);
export const FixedSize = Template.bind({});
FixedSize.args = {
    title: 'KPI Card',
    description: 'This is a description',
    prefix: '$',
    suffix: 'M',
    imgSrc: Object.keys(IMAGES)[0],
    height: '50%',
    width: '50%',
    data: {
        value: '42',
    },
};
