import { SimpleComponent } from '@opendatasoft/visualizations';
import React, { FC, ForwardedRef, forwardRef, useEffect, useRef } from 'react';
import { useMergeRefs } from 'use-callback-ref';
import { SimpleProps } from './Props';

// FIXME: Test the wrap method

// Represent one of our simple component class's constructor like CategoryLegend
type ComponentConstructor<Options, ComponentClass extends SimpleComponent<Options>> =
    new (container: HTMLElement, legendOptions: Options) => ComponentClass;

// The wrapper build a function component for the given component class
export default function wrap<Options, ComponentClass extends SimpleComponent<Options>>(
    ComponentConstructor: ComponentConstructor<Options, ComponentClass>
): FC<SimpleProps<Options>> {
    // We use forwardRef to forward the actual ref of the container
    return forwardRef((props: SimpleProps< Options>, forwardedRef: ForwardedRef<HTMLElement>) => {
        const { tag, legendOptions, ...elementProps } = props;

        // This ref will hold our SDK component instance
        const componentRef = useRef<ComponentClass | null>(null);
        // This ref will hold the container element
        const containerRef = useRef<HTMLElement | null>(null);
        // By merging container ref and forwarded ref parent component could also access the container ref !
        const ref = useMergeRefs([forwardedRef, containerRef]);

        // Update options (put before creating the component to skip the initial render)
        useEffect(() => {
            componentRef.current?.updateOptions(legendOptions);
        }, [legendOptions]);

        // Create and destroy
        useEffect(() => {
            const container = containerRef.current;
            if (container) {
                const component = new ComponentConstructor(container, legendOptions);
                componentRef.current = component;
                return () => {
                    component.destroy();
                    componentRef.current = null;
                };
            }

            throw new Error('Container was expected to be available in useEffect. This is a bug.');
            // We only want to create or destroy on mount, hot reload or tag change.
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [tag]);

        // With React 17 we should be able to just use jsx runtime.
        return React.createElement(tag || 'div', {
            ...elementProps, // such as style...
            ref,
        });
    });
}