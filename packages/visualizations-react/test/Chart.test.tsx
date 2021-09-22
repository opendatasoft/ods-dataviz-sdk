import React from 'react';
import { render } from '@testing-library/react';
import { Chart } from '../src';
import './ResizeObserver.mock';
import '@testing-library/jest-dom';

describe('Chart Default Story', () => {
    it('renders without crashing', () => {
        const { getByRole } = render(
            <Chart
                data={{
                    loading: false,
                    value: [
                        { x: 0, y: 2400, z: 1021 },
                        { x: 1, y: -140, z: 2424 },
                        { x: 2, y: 2000, z: 3222 },
                        { x: 3, y: 3, z: 1255 },
                        { x: 4, y: 180.47, z: 1424 },
                        { x: 5, y: 778, z: 12 },
                    ],
                }}
                options={{
                    labelColumn: 'x',
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
                    xAxis: {
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
                    yAxis: {
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
                    title: {
                        text: 'Line chart with title, axis, grid and dots',
                        align: 'start',
                    },
                }}
            />
        );
        const chartCanvas = getByRole('img', {
            name: /Line chart with title, axis, grid and dots/i,
        });
        expect(chartCanvas).toBeInTheDocument();
    });
});
