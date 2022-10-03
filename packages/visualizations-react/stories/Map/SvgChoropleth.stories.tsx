import React from 'react';
import { Meta } from '@storybook/react';
import rewind from '@mapbox/geojson-rewind';
import { ApiClient, fromCatalog } from '@opendatasoft/api-client';
import { SvgChoropleth, Choropleth } from '../../src';
import { shapes } from './shapes';

const scales = {
    none: undefined,
    blue: {
        type: 'gradient',
        colors: {
            start: '#bcf5f9',
            end: '#0229bf',
        },
    },
};

// I know data is plural already!
const dataSets = {
    1: {
        value: [
            { x: 'France', y: 60 },
            { x: 'Île de France', y: 35 },
            { x: 'Corsica', y: 95 },
        ],
    },
    2: {
        value: [
            { x: 'France', y: 20 },
            { x: 'Île de France', y: 75 },
            { x: 'Corsica', y: 30 },
        ],
    },
};

const droms = ['Martinique', 'Guadeloupe', 'Guyanne', 'La Réunion', 'Mayotte'];

const meta: Meta = {
    title: 'Map/SvgChoropleth',
    component: SvgChoropleth,
};

export default meta;
const Template = ({ height, width, colorsScale, dataSet, options }) => {
    const optionsWithScale = { colorsScale: scales[colorsScale], ...options };
    return (
        <div
            style={{
                margin: 'auto',
                border: '1px solid black',
                padding: '13px',
                display: 'inline-block',
                height,
                width,
            }}
        >
            <SvgChoropleth
                options={optionsWithScale}
                data={dataSets[dataSet]}
                style={{ height: '100%', width: '100%' }} // necessary to remove the wrapper div
            />
        </div>
    );
};

const MappingComponent = ({ shape, optionsWithScale, height, width, ChoroplethComponent }) => {
    const geoJson = {
        type: 'geojson',
        geoJson: rewind(shape, true),
    };
    const options = {
        ...optionsWithScale,
        geoJson,
    };

    const value = shape.features.map((feat) => ({
        x: feat.properties.key[0],
        y: 1000 * Math.random(),
    }));
    const data = { isLoading: false, value };

    return (
        <div
            style={{
                margin: 'auto',
                border: '1px solid black',
                padding: '13px',
                display: 'inline-block',
                height,
                width,
            }}
        >
            <ChoroplethComponent
                options={options}
                data={data}
                style={{ height: '100%', width: '100%' }} // necessary to remove the wrapper div
            />
        </div>
    );
};

const PerfTemplate = ({ height, width, colorsScale, options }, { loaded: { shapes } }) => {
    const optionsWithScale = { colorsScale: scales[colorsScale], ...options };
    return (
        <>
            <h1>SVG</h1>
            {shapes.map((shape) => (
                <MappingComponent
                    shape={shape}
                    optionsWithScale={optionsWithScale}
                    height={height}
                    width={width}
                    ChoroplethComponent={SvgChoropleth}
                />
            ))}

            <h1>MapLibre</h1>
            {shapes.map((shape) => (
                <MappingComponent
                    shape={shape}
                    optionsWithScale={optionsWithScale}
                    height={height}
                    width={width}
                    ChoroplethComponent={Choropleth}
                />
            ))}
        </>
    );
};

export const SvgChoroplethStory = Template.bind({});
SvgChoroplethStory.argTypes = {
    colorsScale: {
        options: ['grey', 'blue'],
        control: { type: 'select' },
    },
    dataSet: {
        options: [1, 2],
        control: { type: 'select' },
    },
};
SvgChoroplethStory.args = {
    height: '100px',
    width: '100px',
    colorsScale: null,
    dataSet: 1,
    options: { geoJson: shapes },
};

const client: any = new ApiClient({ domain: 'public' });
const shapeQuery = (drom) =>
    fromCatalog()
        .dataset('georef-france-commune-arrondissement-municipal')
        .exports('geojson')
        .select('com_code as key')
        .where(`reg_name='${drom}'`);

const shapeLoader = async () => {
    const shapes = await Promise.all(
        droms.map(async (drom) => {
            const query = shapeQuery(drom);
            const data = await client.get(query);
            return data;
        })
    );
    return { shapes };
};

export const PerfSvgChoroplethStory = PerfTemplate.bind({});
PerfSvgChoroplethStory.loaders = [shapeLoader];
PerfSvgChoroplethStory.argTypes = {
    colorsScale: {
        options: ['grey', 'blue'],
        control: { type: 'select' },
    },
    numberOfMaps: {
        control: { type: 'range', min: 5, max: 30, step: 1 },
    },
};
PerfSvgChoroplethStory.args = {
    height: '100px',
    width: '100px',
    colorsScale: null,
    dataSet: 1,
    numberOfMaps: 10,
    options: {
        shapes,
        emptyValueColor: '#f29d9d',
    },
};
