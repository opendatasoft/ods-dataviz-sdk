import React, { useRef, useLayoutEffect } from 'react';
import { mount, unmount } from '@opendatasoft/visualizations-kit'; // we export from the main package to avoid having different versions of svelte

import './reactify.css';

function reactifySvelte<P extends Record<string, unknown>>(Component: any, className: string) {
    return (props: P) => {
        const svelteComponentRef = useRef(null);
        const mountRef = useRef<HTMLDivElement | null>(null);

        useLayoutEffect(() => {
            if (mountRef?.current) {
                const component = mount(Component, {
                    target: mountRef.current,
                    props,
                });
                svelteComponentRef.current = component;
            }

            return () => {
                unmount(svelteComponentRef.current);
            };
            // We especially don't want to react to props to avoid creating a new component each render
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [mountRef]);

        if (svelteComponentRef?.current) {
            svelteComponentRef.current.$set({ ...props });
        }

        return <div className={`ods-visualization ${className}`} ref={mountRef} />;
    };
}

export default reactifySvelte;
