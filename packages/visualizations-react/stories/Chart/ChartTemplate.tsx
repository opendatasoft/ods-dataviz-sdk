import React, { CSSProperties } from 'react';
import type { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { ComponentStory } from '@storybook/react';
import { Chart } from 'src';
import type { Props } from 'reactify';

function WrappedChart({
    style,
    ...chartProps
}: { style: CSSProperties } & Props<DataFrame, ChartOptions>) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60vw',
                ...style,
            }}
        >
            <Chart {...chartProps} />
        </div>
    );
}
// eslint-disable-next-line arrow-parens
const ChartTemplate: ComponentStory<typeof WrappedChart> = (args) => <WrappedChart {...args} />;

export default ChartTemplate;
