import type { ColumnSortValues, DataFrame } from '@opendatasoft/visualizations';
import { ColumnSort } from '@opendatasoft/visualizations';
// eslint-disable-next-line import/prefer-default-export
export const fetchData = async ({
    size,
    page,
    data,
    sort,
}: {
    size: number;
    page: number;
    data: DataFrame;
    sort?: [string, ColumnSortValues];
}) => {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    await setTimeout(() => {}, 300);
    const dataFrame: DataFrame = data?.slice(startIndex, endIndex);
    if (sort) {
        return dataFrame.sort((r1, r2) =>
            sort[1] === ColumnSort.asc ? r1[sort[0]] - r2[sort[0]] : r2[sort[0]] - r1[sort[0]]
        );
    }
    return dataFrame;
};
