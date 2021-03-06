import { Async, BaseComponent } from '@opendatasoft/visualizations';
import React, { FC, ForwardedRef, forwardRef, useEffect, useRef } from 'react';
import { useMergeRefs } from 'use-callback-ref';
import { Props } from './Props';

// Represent one of our component class's constructor like Chart
type ComponentConstructor<
    Data,
    Options,
    ComponentClass extends BaseComponent<Data, Options>
> = new (container: HTMLElement, data: Async<Data>, options: Options) => ComponentClass;

// The wrapper build a function component for the given component class
export function wrap<Data, Options, ComponentClass extends BaseComponent<Data, Options>>(
    ComponentConstructor: ComponentConstructor<Data, Options, ComponentClass>
): FC<Props<Data, Options>> {
    // We use forwardRef to forward the actual ref of the container
    return forwardRef((props: Props<Data, Options>, ref: ForwardedRef<HTMLElement>) => {
        const { tag, data, options, ...elementProps } = props;
        const componentRef = useRef<ComponentClass | null>(null);
        const containerRef = useRef<HTMLElement | null>(null);

        // Update data
        useEffect(() => {
            componentRef.current?.updateData(data);
        }, [data]);

        // Update options
        useEffect(() => {
            componentRef.current?.updateOptions(options);
        }, [options]);

        // Create and destroy
        useEffect(() => {
            const container = containerRef.current;
            if (container) {
                const component = new ComponentConstructor(container, data, options);
                componentRef.current = component;
                return () => {
                    component.destroy();
                    componentRef.current = null;
                };
            } else {
                throw new Error(
                    'Container was expected to be available in useEffect. This is a bug.'
                );
            }
        }, [tag]);

        // With React 17 we should be able to just use jsx runtime.
        return React.createElement(tag || 'div', {
            ...elementProps, // such as style...
            ref: useMergeRefs([containerRef, ref]), // Merging ref so caller can use it
        });
    });
}
