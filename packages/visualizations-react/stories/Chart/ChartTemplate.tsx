import React from 'react';
import type { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import type { Props } from 'reactify';
import { Chart } from 'src';

const ChartTemplate = (args: Props<DataFrame, ChartOptions>) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <div style={{ width: '60vw' }}>
            <Chart {...args} />
        </div>
    </div>
);

export default ChartTemplate;
