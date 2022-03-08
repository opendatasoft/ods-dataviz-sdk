import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { KpiCardOptions } from '@opendatasoft/visualizations';
import { KpiCard } from '../src';

const source = {
    href:
        'https://data.opendatasoft.com/explore/dataset/arbresremarquablesparis2011%40public/table/',
};

const options: KpiCardOptions = {
    title: 'Tokyo Olympic Budget 2021',
    imgSrc: 'My-fake-image-source',
    prefix: '$',
    source: source,
};

describe('KPI Default Story', () => {
    render(<KpiCard data={{ value: 42 }} options={options} />);

    it('renders without crashing', () => {
        const kpiHeading = screen.getByRole('heading', { name: /tokyo olympic budget 2021/i });
        expect(kpiHeading).toBeInTheDocument();
        const kpiImage = document.querySelector('img') as HTMLImageElement;
        expect(kpiImage.src).toContain('My-fake-image-source');
        const kpiPrefix = screen.getByText(/\$/i);
        expect(kpiPrefix).toBeInTheDocument();
        const kpiValue = screen.getByText(/42/i);
        expect(kpiValue).toBeInTheDocument();
    });

    it('has a link to its source and default label', () => {
        render(<KpiCard data={{ value: 42 }} options={options} />);
        const sourceLink = screen.getByRole('link');
        expect(sourceLink).toBeInTheDocument();
        expect(sourceLink).toHaveTextContent('View source');
    });
});

test('KPI accepts custom link label', () => {
    const customOptions = {
        ...options,
        source: {
            ...source,
            label: 'Explore data',
        },
    };

    render(<KpiCard data={{ value: 42 }} options={customOptions} />);
    const sourceLink = screen.getByText('Explore data');
    expect(sourceLink).toBeInTheDocument();
});

test('Tooltip is displayed with 3 digits', async () => {
    render(<KpiCard data={{ value: 42.897654 }} options={options} />);
    const kpiValue = screen.getByText(/43/i);
    const mouseenter = new MouseEvent("mouseenter", {
        bubbles: false,
        cancelable: false
      });
    fireEvent(kpiValue, mouseenter);
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveTextContent(/42.898/i); 
});

test('Tooltip is not displayed if it is not different from data value', async () => {
    render(<KpiCard data={{ value: 43 }} options={options} />);
    const kpiValue = screen.getByText(/43/i);
    const mouseenter = new MouseEvent("mouseenter", {
        bubbles: false,
        cancelable: false
      });
    fireEvent(kpiValue, mouseenter);
    const tooltip = screen.queryByRole('tooltip');
    expect(tooltip).toBe(null); 
});

