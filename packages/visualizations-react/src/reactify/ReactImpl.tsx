import React, { useEffect, useRef, useLayoutEffect } from 'react';
import {
    SvelteComponent,
    ComponentProps,
    ComponentConstructorOptions,
} from '@opendatasoft/visualizations'; // we export from the main package to avoid having different versions of svelte

/* Your ComponentProps type definition here */
function reactifySvelte<C extends SvelteComponent>(
    Component: new (options: ComponentConstructorOptions) => C // Correct constructor signature
) {
    return (props: ComponentProps<C>) => {
        const svelteComponentRef = useRef<C | null>(null);
        const mountRef = useRef<HTMLDivElement | null>(null);
        // FIXME: temporary props dispatch to match the old implem
        const { style, ...componentProps } = props;

        useLayoutEffect(() => {
            if (mountRef?.current) {
                const component = new Component({
                    target: mountRef.current,
                    props: componentProps,
                });
                svelteComponentRef.current = component;
            }

            return () => {
                svelteComponentRef.current?.$destroy();
            };
            // We especially don't want to react to props to avoid creating a new component each render
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [mountRef]);

        useEffect(() => {
            if (svelteComponentRef?.current) {
                svelteComponentRef.current.$set({ ...componentProps });
            }
        }, [componentProps]);

        // FIXME: ideally, we want to
        return <div ref={mountRef} style={style} />;
    };
}

export default reactifySvelte;
