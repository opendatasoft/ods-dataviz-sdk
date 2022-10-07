/** Maps geojson properties to SVG presentational atrtibutes
For exemple if the "fill" attributes should get its value from "shapeColor" { fill: shapeColor }
 */
export type SvgPropertyMapping = { [key: string]: string };
