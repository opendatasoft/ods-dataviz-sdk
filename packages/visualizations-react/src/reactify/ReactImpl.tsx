import React, { useRef, useLayoutEffect} from 'react';
import {
    ComponentConstructorOptions,
} from '@opendatasoft/visualizations'; // we export from the main package to avoid having different versions of svelte
import type { SvelteComponentTyped } from 'svelte';

function reactifySvelte<P extends Record<string, unknown>>(
    Component: new (options: ComponentConstructorOptions) => SvelteComponentTyped<P>,
    className: string,
) {
    return (props: P) => {
        const svelteComponentRef = useRef<SvelteComponentTyped<P>| null>(null);
        const mountRef = useRef<HTMLDivElement | null>(null);

        useLayoutEffect(() => {
            if (mountRef?.current) {
                const component = new Component({
                    target: mountRef.current,
                    props,
                });
                svelteComponentRef.current = component;
            }

            return () => {
                svelteComponentRef.current?.$destroy();
            };
            // We especially don't want to react to props to avoid creating a new component each render
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [mountRef]);

        if (svelteComponentRef?.current) {
            svelteComponentRef.current.$set({...props});
        }

        return <div className={`ods-visualization ${className}`} ref={mountRef} />;
    };
}

export default reactifySvelte;
