import { KpiCard as _KpiCard, KpiCardImpl, KpiCardOptions } from '@opendatasoft/visualizations';
import React, { useLayoutEffect, useRef } from 'react';

// Explicit name and type are needed for storybook
const KpiCard = (props: any) => {
    const svelteRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (svelteRef?.current) {
            new KpiCardImpl({
                target: svelteRef.current,
                props,
            });
        }
    }, [props, svelteRef]);

    return <div ref={svelteRef} />;
};

export default KpiCard;
