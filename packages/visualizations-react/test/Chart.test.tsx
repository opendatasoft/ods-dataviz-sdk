import React from 'react';
import { render } from '@testing-library/react';
import { Default as ChartStory } from '../stories/Chart.stories';
import './ResizeObserver.mock';
import '@testing-library/jest-dom';

describe('Chart Default Story', () => {
    it('renders without crashing', () => {
        const { getByRole } = render(<ChartStory {...(ChartStory.args as any)} />);
        const chartCanvas = getByRole('img', {
            name: /a line and bar chart, showing random data/i,
        });
        expect(chartCanvas).toBeInTheDocument();
    });
});
