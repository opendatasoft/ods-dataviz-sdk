// @jest-environment jsdom
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChartOptions } from '@opendatasoft/visualizations';
import { Chart } from '../src';


const data = {
    loading: false,
    value: [
        { x: 0, y: 2400, z: 1021 },
        { x: 1, y: -140, z: 2424 },
        { x: 2, y: 2000, z: 3222 },
        { x: 3, y: 3, z: 1255 },
        { x: 4, y: 180.47, z: 1424 },
        { x: 5, y: 778, z: 12 },
    ],
};

const source = {
    href: 'https://data.opendatasoft.com/explore/dataset/arbresremarquablesparis2011%40public/table/',
};

const options: ChartOptions = {
    labelColumn: 'x',
    source,
    ariaLabel: 'Line chart with title, axis, grid and dots',
    series: [
        {
            type: 'line',
            valueColumn: 'y',
            tension: 0,
            borderColor: 'rgb(22, 161, 145)',
            borderDash: [5, 5],
        },
        {
            type: 'line',
            valueColumn: 'z',
            tension: 0,
            borderColor: 'rgb(119, 73, 54)',
        },
    ],
    axis: {
        x: {
            display: true,
            type: 'linear',
            title: {
                display: true,
                text: 'Date de plantation',
                align: 'center',
            },
            gridLines: {
                display: false,
            },
        },
        y: {
            display: true,
            title: {
                display: true,
                text: 'Moyenne de la hauteur en CM',
                align: 'center',
            },
            gridLines: {
                display: true,
            },
        },
    },
    title: {
        text: 'Line chart with title, axis, grid and dots',
    },
};

describe('Chart Default Story', () => {
    render(<Chart data={data} options={options} />);

    it('renders without crashing', () => {
        const chartCanvas = screen.getByRole('img', {
            name: /Line chart with title, axis, grid and dots/i,
        });
        expect(chartCanvas).toBeInTheDocument();
    });

    it('has a link to its source and default label', () => {
        render(<Chart data={data} options={options} />);
        const sourceLink = screen.getByRole('link');
        expect(sourceLink).toBeInTheDocument();
        expect(sourceLink).toHaveTextContent('View source');
    });
});

test('Chart accepts custom link label', () => {
    const customOptions = {
        ...options,
        source: {
            ...source,
            label: 'Explore data',
        },
    };

    render(<Chart data={data} options={customOptions} />);
    const sourceLink = screen.getByText('Explore data');
    expect(sourceLink).toBeInTheDocument();
});
