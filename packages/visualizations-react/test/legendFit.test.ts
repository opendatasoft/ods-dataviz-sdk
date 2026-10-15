import {
    fitLegendTexts,
    fitText,
} from '@opendatasoft/visualizations/src/components/Chart/legendFit';

// One character = 6px, enough to reason on widths without a canvas
const measure = (text: string) => text.length * 6;

// Chart.js defaults of the SDK legend: box 20px, font 12px, padding 10px
const layout = {
    measure,
    horizontal: true,
    itemExtraWidth: 20 + 6,
    lineHeight: 16 + 10,
    padding: 10,
};

describe('fitText', () => {
    test('keeps a text that fits', () => {
        expect(fitText('Fagus', 60, measure)).toBe('Fagus');
    });

    test('shortens a text with an ellipsis to the width', () => {
        // 60px: 9 characters + the ellipsis
        expect(fitText('Sequoiadendron', 60, measure)).toBe('Sequoiade…');
    });
});

describe('fitLegendTexts', () => {
    const long = 'Moyenne de Taux de passages aux urgences pour IRA';

    test('keeps every text on a wide chart', () => {
        const texts = [long, 'Compte du nombre d’enregistrements'];
        expect(fitLegendTexts(texts, { ...layout, maxWidth: 1000, maxHeight: 300 })).toEqual(texts);
    });

    test('shortens a text wider than a narrow chart, within its width', () => {
        const [fitted] = fitLegendTexts([long], { ...layout, maxWidth: 300, maxHeight: 300 });
        expect(fitted.endsWith('…')).toBe(true);
        // Item alone on its row: box + text + padding on both sides within the legend width
        expect(layout.itemExtraWidth + measure(fitted) + 2 * layout.padding).toBeLessThanOrEqual(
            300
        );
    });

    test('shortens the texts so that every item fits the legend height', () => {
        // 6 items, 2 rows of height: one per row doesn't fit, so two or three per row
        const texts = Array.from({ length: 6 }, (_, i) => `${long} ${i}`);
        const fitted = fitLegendTexts(texts, { ...layout, maxWidth: 400, maxHeight: 2 * 26 + 10 });
        expect(fitted.every(text => text.endsWith('…'))).toBe(true);
        const itemWidths = fitted.map(
            text => layout.itemExtraWidth + measure(text) + layout.padding
        );
        // Three per row (2 rows): the sum of a row stays within the width
        expect(
            itemWidths.slice(0, 3).reduce((a, b) => a + b, 0) + layout.padding
        ).toBeLessThanOrEqual(400);
    });

    test('keeps the short texts when the long ones are enough to shorten', () => {
        const fitted = fitLegendTexts(['Acer', long], { ...layout, maxWidth: 300, maxHeight: 300 });
        expect(fitted[0]).toBe('Acer');
        expect(fitted[1].endsWith('…')).toBe(true);
    });

    test('only caps the width beside the chart (one item per line)', () => {
        const texts = Array.from({ length: 20 }, () => long);
        const fitted = fitLegendTexts(texts, {
            ...layout,
            horizontal: false,
            maxWidth: 200,
            maxHeight: 50,
        });
        expect(new Set(fitted).size).toBe(1);
        expect(layout.itemExtraWidth + measure(fitted[0]) + 2 * layout.padding).toBeLessThanOrEqual(
            200
        );
    });
});
