import type { DataFrame } from '@opendatasoft/visualizations';

// eslint-disable-next-line import/prefer-default-export
export const fetchData = async ({
    size,
    page,
    data,
}: {
    size: number;
    page: number;
    data: DataFrame;
}) => {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    await setTimeout(() => {}, 300);
    const dataFrame: DataFrame = data?.slice(startIndex, endIndex);
    return dataFrame;
};