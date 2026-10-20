/**
 * Fitting of the Chart.js legend texts in the space it gets. Chart.js never wraps a legend text: a
 * text wider than the chart is cut at both edges, and the rows past half the chart height (the
 * height it gives a legend above or below the chart) are not drawn. On a narrow chart (mobile), the
 * texts are shortened so that every item fits: within the legend width, and in as many rows as its
 * height holds.
 */

const ELLIPSIS = '…';
/** A text is never shortened below this width (px): a few characters stay readable. */
const MIN_TEXT_WIDTH = 40;

export type LegendFitLayout = {
    /** Width (px) of a text, as Chart.js measures it (legend font). */
    measure: (text: string) => number;
    /** Width (px) the legend gets. */
    maxWidth: number;
    /** Height (px) the legend gets (half the chart for a legend above or below it). */
    maxHeight: number;
    /** Legend above or below the chart (items in rows), rather than beside it (one per line). */
    horizontal: boolean;
    /** Box width + gap before the text (px): an item is this plus its text. */
    itemExtraWidth: number;
    /** Height of a row of items, padding included (px). */
    lineHeight: number;
    /** Padding between items and around the legend (px), `labels.padding`. */
    padding: number;
};

/** `text` shortened with an ellipsis to fit `maxWidth`, or `text` when it fits. */
export function fitText(text: string, maxWidth: number, measure: (text: string) => number) {
    if (measure(text) <= maxWidth) return text;
    // Longest prefix that fits with the ellipsis
    let low = 0;
    let high = text.length - 1;
    while (low < high) {
        const middle = Math.ceil((low + high) / 2);
        if (measure(`${text.slice(0, middle).trimEnd()}${ELLIPSIS}`) <= maxWidth) low = middle;
        else high = middle - 1;
    }
    return `${text.slice(0, low).trimEnd()}${ELLIPSIS}`;
}

/** Number of rows Chart.js lays the items out in (same packing as its legend `_fitRows`). */
function countRows(itemWidths: number[], maxWidth: number, padding: number) {
    let rows = 0;
    let lineWidth = 0;
    itemWidths.forEach((width, i) => {
        if (i === 0 || lineWidth + width + 2 * padding > maxWidth) {
            rows += 1;
            lineWidth = 0;
        }
        lineWidth += width + padding;
    });
    return rows;
}

/**
 * Legend texts shortened only as much as needed for every item to fit: no item wider than the
 * legend, and, above or below the chart, every row within its height. The texts longer than the
 * largest width that fits are shortened to it; the others are kept.
 */
export function fitLegendTexts(texts: string[], layout: LegendFitLayout): string[] {
    const { measure, maxWidth, maxHeight, horizontal, itemExtraWidth, lineHeight, padding } =
        layout;
    const textWidths = texts.map(measure);
    // An item alone on its row, padding on both sides, must fit the legend width
    const widest = Math.max(MIN_TEXT_WIDTH, Math.floor(maxWidth - itemExtraWidth - 2 * padding));

    let limit = widest;
    if (horizontal) {
        // Chart.js adds 10px below the rows
        const maxRows = Math.max(1, Math.floor((maxHeight - 10) / lineHeight));
        const fits = (textLimit: number) =>
            countRows(
                textWidths.map((width) => itemExtraWidth + Math.min(width, textLimit)),
                maxWidth,
                padding
            ) <= maxRows;
        if (!fits(widest)) {
            // Largest text width that fits (fewer rows as the texts get shorter); when even the
            // shortest texts don't fit, the last rows stay hidden, as before
            let low = MIN_TEXT_WIDTH;
            let high = widest;
            while (low < high) {
                const middle = Math.ceil((low + high) / 2);
                if (fits(middle)) low = middle;
                else high = middle - 1;
            }
            limit = low;
        }
    }

    return texts.map((text, i) => (textWidths[i] > limit ? fitText(text, limit, measure) : text));
}
