/** Maps GeoJSON properties to SVG presentational attributes.
For exemple if the "fill" attributes should get its value from the "shapeColor"
property: `{ fill: shapeColor }`
 */
export type SvgPropertyMapping = { [key: string]: string };
