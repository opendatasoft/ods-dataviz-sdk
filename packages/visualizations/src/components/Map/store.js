import { writable, derived } from 'svelte/store';

export const optionsStore = writable(null);
export const dataStore = writable(null);

export const shapesStore = derived(optionsStore, $options => $options?.shapes);
export const colorScaleStore = derived(optionsStore, $options => $options?.colorScale);

export const basemapStyleStore = derived(optionsStore, $val => $val?.basemapStyle);
// I'd like to use this store as the sole source for a function that displays the shape, but a bug seems to prevent
// the change detection when one of the store's value is an object: https://svelte.dev/repl/8b7e05feb80c43a6b262e3f2b5d3adb7?version=3.46.3
export const shapeRenderingStore = derived([shapesStore, colorScaleStore, dataStore], ([$shapes, $colorScale, $data]) => ({
    values: $data, 
    shapes: $shapes, 
    colorScale: $colorScale,
}));