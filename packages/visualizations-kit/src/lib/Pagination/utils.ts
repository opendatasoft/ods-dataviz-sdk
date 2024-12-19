// eslint-disable-next-line import/prefer-default-export
export const getPages = ({ current, totalPages }: { current: number; totalPages: number }) => {
    if (totalPages <= 3) {
        return [...Array(totalPages).keys()].map((i) => i + 1);
    }
    if (current === 1) {
        return [current, current + 1, current + 2];
    }
    if (current === totalPages) {
        return [current - 2, current - 1, current];
    }
    return [current - 1, current, current + 1];
};
