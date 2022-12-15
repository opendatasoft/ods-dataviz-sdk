import type { HandleFilterCallback } from "@opendatasoft/visualizations";
import { HTMLAttributes } from "react";

export interface FilterProps<Options> extends HTMLAttributes<HTMLElement> {
    handleFilter: HandleFilterCallback;
    options: Options;
    tag?: string;
}
