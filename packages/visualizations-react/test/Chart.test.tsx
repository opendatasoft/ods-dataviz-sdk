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

describe('Custom legend of line and bar charts', () => {
    const segmentedOptions: ChartOptions = {
        labelColumn: 'x',
        series: [
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'y',
                label: 'Paris',
                backgroundColor: 'rgb(180, 150, 140)',
            },
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'z',
                label: 'Serris',
                backgroundColor: 'rgb(250, 220, 150)',
            },
        ],
        legend: {
            display: true,
            custom: true,
            variant: 'inline',
            title: 'City',
            maxHeight: '80px',
        },
    };

    test('renders one item per series after the title, in an inline frame', () => {
        const { container } = render(<Chart data={data} options={segmentedOptions} />);

        const legend = container.querySelector('.legend-container--inline') as HTMLElement;
        expect(legend).toBeInTheDocument();
        expect(legend).toHaveTextContent('City');
        expect(screen.getByText('Paris')).toBeInTheDocument();
        expect(screen.getByText('Serris')).toBeInTheDocument();
        // Bounded height, scrolling past it
        expect(legend).toHaveClass('legend-container--scroll');
        expect(legend.style.getPropertyValue('--max-height')).toBe('80px');
    });

    test('styles the title like the x axis title, beside the items', () => {
        const { container } = render(
            <Chart
                data={data}
                options={{
                    ...segmentedOptions,
                    axis: {
                        x: { title: { display: true, text: 'Year', color: 'rgb(10, 20, 30)' } },
                    },
                }}
            />
        );

        const title = screen.getByText('City');
        expect(title).toHaveStyle({
            color: 'rgb(10, 20, 30)',
            fontSize: '12px',
            fontWeight: '400',
        });
        // Items wrap in their own block, so the title stays centered on all their lines
        expect(container.querySelector('.legend-items')).toContainElement(
            screen.getByText('Paris')
        );
        expect(container.querySelector('.legend-items')).not.toContainElement(title);
    });

    test('marks a series as hidden when its item is clicked', async () => {
        render(<Chart data={data} options={segmentedOptions} />);

        const parisItem = screen.getByText('Paris').closest('[role="button"]') as HTMLElement;
        await userEvent.click(parisItem);
        expect(parisItem).toHaveClass('refined');
    });

    test('keeps the Chart.js legend (no HTML legend) without `custom`', () => {
        const { container } = render(
            <Chart data={data} options={{ ...segmentedOptions, legend: { display: true } }} />
        );
        expect(container.querySelector('.legend-container')).not.toBeInTheDocument();
    });
});
