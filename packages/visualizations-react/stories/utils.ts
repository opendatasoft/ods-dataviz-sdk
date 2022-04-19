/// <reference path="./utils.d.ts" />
import trophy from './img/trophy.svg';
import gov from './img/gov.svg';
import rocket from './img/rocket.png';
import { Source } from '../../visualizations/src/components/types';

export const COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
};

export const IMAGES = {
    gov,
    trophy,
    rocket,
};

export function storyWithArgs<Args>(template: Function, args: Args) {
    const story = template.bind({});
    story.args = args;
    return story;
}

export function generateArrayOf<T>(generator: (index: number) => T, size: number) {
    let result: T[] = [];

    for (let i = 0; i < size; ++i) {
        result.push(generator(i));
    }

    return result;
}

export const CONTROLS = {
    text: {
        control: {
            type: 'text',
        },
    },
    number: {
        control: {
            type: 'number',
        },
    },
    image: {
        options: [...Object.keys(IMAGES), 'none'],
        mapping: { ...IMAGES, none: null },
        control: { type: 'select' },
    },
    fontWeight: {
        options: [
            'normal',
            'bold',
            'bolder',
            'lighter',
            '100',
            '200',
            '300',
            '400',
            '500',
            '600',
            '700',
            '800',
            '900',
        ],
        control: { type: 'select' },
    },
    borderStyle: {
        options: ['solid', 'dashed', 'dotted', 'none'],
        control: { type: 'select' },
    },
    flexDirection: {
        options: ['row', 'column', 'row-reverse', 'column-reverse'],
        control: {
            type: 'select',
        },
    },
    justifyContent: {
        options: [
            'flex-start',
            'flex-end',
            'center',
            'space-between',
            'space-around',
            'space-evenly',
        ],
        control: {
            type: 'select',
        },
    },
    alignItems: {
        options: ['start', 'end', 'center', 'baseline', 'stretch'],
        control: {
            type: 'select',
        },
    },
    color: {
        control: {
            type: 'color',
            presetColors: Object.values(COLORS),
        },
    },
    textAlign: {
        options: ['start', 'center', 'end'],
        control: {
            type: 'select',
        },
    },
    alignSelf: {
        options: ['start', 'end', 'center'],
        control: {
            type: 'select',
        },
    },
};

export const defaultSource: Source = {
    href: 'https://data.opendatasoft.com/explore/dataset/arbresremarquablesparis2011%40public/table/',
};

export const simpleFormatter = new Intl.NumberFormat(undefined, {
    notation: 'compact',
    maximumFractionDigits: 1,
});

export const compactNumberFormatter = new Intl.NumberFormat(undefined, {
    notation: 'compact',
});

export const ratioFormatter = new Intl.NumberFormat(undefined, {
    notation: 'compact',
    maximumFractionDigits: 1,
    style: 'percent',
});

export const comparisonFormatter = new Intl.NumberFormat(undefined, {
    notation: 'compact',
    maximumFractionDigits: 1,
    signDisplay: 'exceptZero',
});
