import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import rewind from '@mapbox/geojson-rewind';
import { Feature } from 'geojson';
import {
    GeoJsonChoroplethOptions,
    ChoroplethShapeGeoJsonValue,
    ColorsScale,
} from '@opendatasoft/visualizations';
import { ApiClient, fromCatalog } from '@opendatasoft/api-client';
import { SvgChoropleth, Choropleth } from '../../src';

const scales: { [key: string]: ColorsScale | undefined } = {
    none: undefined,
    blue: {
        type: 'gradient',
        colors: {
            start: '#bcf5f9',
            end: '#0229bf',
        },
    },
    grey: {
        type: 'gradient',
        colors: {
            start: '#333333',
            end: '#CCCCCC',
        },
    },
};

const droms = ['01', '02', '03', '04', '06'];

const MappingComponent = ({
    options,
    height,
    width,
    ChoroplethComponent,
}: {
    options: GeoJsonChoroplethOptions;
    height: string;
    width: string;
    ChoroplethComponent: typeof Choropleth | typeof SvgChoropleth;
    }) => {
    const shapes: ChoroplethShapeGeoJsonValue = {
        type: 'geojson',
        geoJson: rewind(options.shapes, true),
    };
    const optionsWithShapes: ChoroplethOptions = {
        ...options,
        shapes,
    };

   

    const value = shapes.geoJson?.features.map((feat: Feature) => ({
        x: feat?.properties?.key[0],
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
                options={optionsWithShapes}
                data={data}
                style={{ height: '100%', width: '100%' }} // necessary to remove the wrapper div
            />
        </div>
    );
};

const ChoroplethGrid = ({
    gridShapes,
    options,
    height,
    width,
    scale,
}: {
    gridShapes: ChoroplethShapeGeoJsonValue[];
    options: ChoroplethOptions;
    height: string;
    width: string;
    scale: string;
    }) => {
    const optionsWithScale = { colorsScale: scales[scale], ...options };
    return (
        <>
            <h1>SVG</h1>
            {gridShapes.map((shape: ChoroplethShapeGeoJsonValue) => (
                <MappingComponent
                    options={{ ...optionsWithScale, shapes: shape }}
                    height={height}
                    width={width}
                    ChoroplethComponent={SvgChoropleth}
                />
            ))}

            <h1>MapLibre</h1>
            {gridShapes.map((shape: ChoroplethShapeGeoJsonValue) => (
                <MappingComponent
                    options={{ ...optionsWithScale, shapes: shape, interactive: false }}
                    height={height}
                    width={width}
                    ChoroplethComponent={Choropleth}
                />
            ))}
        </>
    );
};

const meta: ComponentMeta<typeof ChoroplethGrid> = {
    title: 'Map/ChoroplethGrid',
    component: ChoroplethGrid,
    argTypes: {
        scale: {
            options: ['grey', 'blue'],
            control: { type: 'select' },
        },
    },
};
export default meta;

const PerfTemplate: ComponentStory<typeof ChoroplethGrid> = (args, { loaded: { gridShapes } }) => (
    <ChoroplethGrid {...args} gridShapes={ gridShapes} />
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const client: any = new ApiClient({ domain: 'public' });
const shapeQuery = (drom: string) =>
    fromCatalog()
        .dataset('georef-france-commune-arrondissement-municipal')
        .exports('geojson')
        .select('com_code as key')
        .where(`reg_code='${drom}'`);

const shapeLoader = async () => {
    const gridShapes = await Promise.all(
        droms.map(async (drom) => {
            const query = shapeQuery(drom);
            const data = await client.get(query);
            return data;
        })
    );
    return { gridShapes };
};

export const PerfSvgChoroplethStory = PerfTemplate.bind({});
PerfSvgChoroplethStory.loaders = [shapeLoader];
PerfSvgChoroplethStory.args = {
    height: '100px',
    width: '100px',
    scale: 'blue',
};
