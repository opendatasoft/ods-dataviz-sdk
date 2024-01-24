import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { SvelteComponent, ComponentProps, ComponentConstructorOptions } from 'svelte';

/* Your ComponentProps type definition here */
function reactifySvelte<C extends SvelteComponent>(
    Component: new (options: ComponentConstructorOptions) => C // Correct constructor signature
) {
    return (props: ComponentProps<C>) => {
        const svelteComponentRef = useRef<C | null>(null);
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

        useEffect(() => {
            if (svelteComponentRef?.current) {
                svelteComponentRef.current.$set({ ...props });
            }
        }, [props]);

        return <div ref={mountRef} />;
    };
}

export default reactifySvelte;
