export const COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
    pink: 'rgb(220,76,115)',
};

export const style = {
    width: '50%',
    maxWidth: '1000px',
};

export const styleForLayouts = {
    width: '100%',
    maxWidth: '1000px',
};

export const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    justifyItems: 'center',
    alignItems: 'center',
};

export function generateArrayOf<T>(generator: (index: number) => T, size: number) {
    let result: T[] = [];

    for (let i = 0; i < size; ++i) {
        result.push(generator(i));
    }

    return result;
}
