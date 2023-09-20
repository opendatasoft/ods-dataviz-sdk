import { Async } from '@opendatasoft/visualizations';
import { HTMLAttributes } from 'react';

export interface Props<Data, Options> extends HTMLAttributes<HTMLElement> {
    data: Async<Data>;
    options: Options;
    tag?: string;
}

export interface SimpleProps<Options> extends HTMLAttributes<HTMLElement> {
    options: Options;
    tag?: string;
}