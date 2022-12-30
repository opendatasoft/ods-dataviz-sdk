import { HTMLAttributes } from "react";

export interface FilterProps<Options> extends HTMLAttributes<HTMLElement> {
    // filterStore: FilterStore;
    options: Options;
    tag?: string;
}
