import React from 'react';
import { ComponentStory } from '@storybook/react';
import type { Async, PoiMapData, PoiMapOptions } from '@opendatasoft/visualizations';

import { defaultSource } from '../utils';

import { PoiMap } from '../../src';
import { sources, legend } from './utils';

const meta = {
    title: 'Poi/PoiMap',
};

export default meta;

const PlaygroundTemplate = ({
    data,
    style,
    interactive,
    title,
    subtitle,
    bbox: playgroundBbox,
    center,
    zoom,
    minZoom,
    maxZoom,
    legend: legendTitle,
    legendPosition,
    source: href,
}: {
    data: Async<PoiMapData>;
    style: PoiMapOptions['style'];
    interactive: PoiMapOptions['interactive'];
    title: PoiMapOptions['title'];
    subtitle: PoiMapOptions['subtitle'];
    bbox: PoiMapOptions['bbox'];
    center: PoiMapOptions['center'];
    zoom: PoiMapOptions['zoom'];
    minZoom: PoiMapOptions['minZoom'];
    maxZoom: PoiMapOptions['maxZoom'];
    legend: string;
    legendPosition: 'start' | 'center' | 'end';
    source: string;
}) => {
    const playgroundLegend = {
        type: 'category' as const,
        items: legend.items,
        title: legendTitle,
        align: legendPosition,
    };
    const images = {
        'battle-icon':
            'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Big_battle_symbol.svg/14px-Big_battle_symbol.svg.png',
        'battle-icon-red':
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Battle_icon_gladii_red.svg/14px-Battle_icon_gladii_red.svg.png',
    };

    return (
        <div
            style={{
                width: '50%',
                minHeight: '100px',
                minWidth: '100px',
                margin: 'auto',
                border: '1px solid black',
            }}
        >
            <PoiMap
                data={data}
                options={{
                    interactive,
                    title,
                    subtitle,
                    bbox: playgroundBbox,
                    center,
                    legend: playgroundLegend,
                    zoom,
                    minZoom,
                    maxZoom,
                    sourceLink: { href },
                    images,
                    style,
                }}
            />
        </div>
    );
};
export const Playground: ComponentStory<typeof PlaygroundTemplate> = PlaygroundTemplate;

Playground.args = {
    data: {
        value: {
            layers,
            sources,
        },
    },
    interactive: true,
    title: 'Title',
    subtitle: 'Subtitle',
    bbox,
    center: [1.71, 46.71],
    zoom: 4,
    minZoom: 0,
    maxZoom: 24,
    legend: 'Legend',
    legendPosition: 'start',
    source: defaultSource.href,
    style: BASE_STYLE,
};

Playground.argTypes = {
    data: {
        control: 'object',
    },
    interactive: {
        control: 'boolean',
        name: 'options.interactive',
    },
    title: {
        control: 'text',
        name: `options.title`,
    },
    subtitle: {
        control: 'text',
        name: `options.subtitle`,
    },
    bbox: {
        control: 'object',
        name: `options.bbox`,
    },
    center: {
        control: 'object',
        name: `options.center`,
    },
    zoom: {
        control: { type: 'range', min: 0, max: 24, step: 1 },
        name: `options.zoom`,
    },
    minZoom: {
        control: { type: 'range', min: 0, max: 24, step: 1 },
        name: `options.minZoom`,
    },
    maxZoom: {
        control: { type: 'range', min: 0, max: 24, step: 1 },
        name: `options.maxZoom`,
    },
    legend: {
        control: 'text',
        name: 'options.legend.title',
    },
    legendPosition: {
        control: { type: 'select', options: ['start', 'center', 'end'] },
        name: 'options.legend.align',
    },
    source: {
        control: 'text',
        name: 'options.sourceLink',
    },
    style: {
        control: 'text',
        name: 'options.style',
    },
};
