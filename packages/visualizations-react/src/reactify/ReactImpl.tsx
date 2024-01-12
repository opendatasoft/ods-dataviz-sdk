import React, { useEffect, useRef, useLayoutEffect, FC } from 'react';
import { SvelteComponent, ComponentProps, ComponentConstructorOptions } from 'svelte';

/* Your ComponentProps type definition here */
function reactifySvelte<C extends SvelteComponent>(
    Component: new (options: ComponentConstructorOptions) => C // Correct constructor signature
): FC<ComponentProps<C>> {
    return function ReactComponent(props: ComponentProps<C>) {
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
        }, [mountRef, props]);

        useEffect(() => {
            if (svelteComponentRef?.current) {
                svelteComponentRef.current.$set(props);
            }
        }, [props]);

        return <div ref={mountRef} />;
    };
}

export default reactifySvelte;
