// @jest-environment jsdom
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ChartOptions } from '@opendatasoft/visualizations';
import { ChartSeriesType } from '@opendatasoft/visualizations';
import { Chart } from 'src';

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

const links = [
    {
        href: 'https://data.opendatasoft.com/explore/dataset/arbresremarquablesparis2011%40public/table/',
        label: 'View dataset source',
    },
];

const options: ChartOptions = {
    labelColumn: 'x',
    links,
    series: [
        {
            type: ChartSeriesType.Line,
            valueColumn: 'y',
            tension: 0,
            borderColor: 'rgb(22, 161, 145)',
            borderDash: [5, 5],
        },
        {
            type: ChartSeriesType.Line,
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
    description: 'Line chart with title, axis, grid and dots',
};

describe('Chart Default Story', () => {
    render(<Chart data={data} options={options} />);

    it('renders without crashing', () => {
        const chartCanvas = screen.getByRole('img', {
            description: 'Line chart with title, axis, grid and dots',
        });
        expect(chartCanvas).toBeInTheDocument();
    });

    it('has a link to its source and default label', async () => {
        render(<Chart data={data} options={options} />);
        const linksButton = screen.getByRole('button', { name: 'Links' });
        await userEvent.click(linksButton);
        const sourceLink = screen.getByRole('menuitem');
        expect(sourceLink).toBeInTheDocument();
        expect(sourceLink).toHaveTextContent('View dataset source');
    });
});

test('Chart accepts custom link label', async () => {
    const customOptions = {
        ...options,
        links: [
            {
                ...links[0],
                label: 'Explore data',
            },
        ],
    };

    render(<Chart data={data} options={customOptions} />);
    const linksButton = screen.getByRole('button', { name: 'Links' });
    await userEvent.click(linksButton);
    const sourceLink = screen.getByText('Explore data');
    expect(sourceLink).toBeInTheDocument();
});

describe('Chart ticks precision', () => {
    // Values under 1: ChartJS picks a 0.5 step (jsdom gives the chart no size, so it draws two ticks)
    // unless the ticks are held to whole numbers
    const averages = {
        loading: false,
        value: [
            { x: 'A', y: 0.4 },
            { x: 'B', y: 0.45 },
            { x: 'C', y: 0.32 },
        ],
    };

    /** The tick values ChartJS asks the value axis formatter to write. */
    function formattedTicks(precision?: number) {
        const format = jest.fn((value: number) => String(value));
        const precisionOptions: ChartOptions = {
            labelColumn: 'x',
            series: [{ type: ChartSeriesType.Bar, valueColumn: 'y' }],
            axis: {
                x: { type: 'category' },
                y: { type: 'linear', ticks: { format, precision } },
            },
        };
        render(<Chart data={averages} options={precisionOptions} />);
        return Array.from(new Set(format.mock.calls.map(([value]) => value)));
    }

    it('keeps the ticks on the given number of decimals', () => {
        const ticks = formattedTicks(0);
        expect(ticks.length).toBeGreaterThan(1);
        expect(ticks.every(Number.isInteger)).toBe(true);
    });

    it('lets ChartJS choose finer ticks when no precision is given', () => {
        const ticks = formattedTicks();
        expect(ticks).toContain(0.5);
    });
});
