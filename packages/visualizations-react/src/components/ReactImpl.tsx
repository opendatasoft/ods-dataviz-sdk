import { Async, BaseComponent } from '@opendatasoft/visualizations';
import React, { FC, ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react';
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
        const [error, setError] = useState<Boolean>(false);

        // Update data
        useEffect(() => {
            if (!error) {
                try {
                    componentRef.current?.updateData(data);
                } catch (exception) {
                    console.error(exception);
                    setError(true);
                }
            }
        }, [data, error]);

        // Update options
        useEffect(() => {
            if (!error) {
                try {
                    componentRef.current?.updateOptions(options);
                } catch (exception) {
                    console.error(exception);
                    setError(true);
                }
            }
        }, [options, error]);

        // Create and destroy
        useEffect(() => {
            const container = containerRef.current;
            if (container) {
                let component: (ComponentClass | null) = null;
                if (!error) {
                    try {
                        component = new ComponentConstructor(container, data, options);
                        componentRef.current = component;
                    } catch (exception) {
                        console.error(exception);
                        setError(true);
                    }
                }
                return () => {
                    if (component) {
                        component.destroy();
                    }
                    componentRef.current = null;
                };
            } else {
                throw new Error(
                    'Container was expected to be available in useEffect. This is a bug.'
                );
            }
        }, [tag, error]);

        const mergedRef = useMergeRefs([containerRef, ref]);

        // With React 17 we should be able to just use jsx runtime.
        const children = error ?
            React.createElement('div', {
                style: {
                    backgroundColor: '#f2dede',
                    color: '#a94442',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                },
            }, "An error occurred while rendering the component") :
            null;

        return React.createElement(tag || 'div', {
            ...elementProps, // such as style...
            ref: mergedRef, // Merging ref so caller can use it
        }, children);
    });
}
