import { KpiCard as _KpiCard, KpiCardImpl, KpiCardOptions } from '@opendatasoft/visualizations';
import React, { useLayoutEffect, useEffect, useRef } from 'react';

// Explicit name and type are needed for storybook
const KpiCard = (props: any) => {
    const svelteComponentRef = useRef<any>(null);
    const mountRef = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        if (mountRef?.current) {
            const component = new KpiCardImpl({
                target: mountRef.current,
                props,
            });
            svelteComponentRef.current = component;
        }
    }, [mountRef]);

    useEffect(() => {
        console.log(props);
        if (svelteComponentRef?.current) {
            svelteComponentRef.current.$set({ ...props });
        }
    }, [props]);

    return <div ref={mountRef} />;
};

export default KpiCard;
