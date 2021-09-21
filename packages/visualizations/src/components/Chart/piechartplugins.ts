import type { Chart, ChartData, ChartDataset, ArcElement, PieController, PieMetaExtensions } from 'chart.js';
import type { Pie, Color } from '../types';

interface ChartPluginDataLabelArc extends ArcElement {
    // This key comes from `chartjs-plugin-datalabels` (defined in the `EXPANDO_KEY` variable). Since this plugin
    // ... doesn't provide proper typing, we simply extend the type `ArcElement`:
    $datalabels: any;
    outerRadius: number;
}

export const pieDataLabelsPlugin = {
    id: 'chartjs-plugin-datalabels',
    afterDraw: (chart: Chart) => {
        const ctx = chart.ctx;
        ctx.save();
        const chartCenterPoint = {
            x:
                (chart.chartArea.right - chart.chartArea.left) / 2 +
                chart.chartArea.left,
            y: (chart.chartArea.bottom - chart.chartArea.top) / 2 + chart.chartArea.top,
        };

        const { labels, datasets } = chart.config.data;
        const backgroundColor = datasets[0].backgroundColor as string[];

        if (labels) {
            labels.forEach((_: any, i: number) => {
                const arc = chart.getDatasetMeta(0).data[i] as unknown as ChartPluginDataLabelArc;

                const centerPoint = arc.getCenterPoint();

                // Get the center of the chart and the center point of the slice to determine the angle
                const angle = Math.atan2(
                    centerPoint.y - chartCenterPoint.y,
                    centerPoint.x - chartCenterPoint.x
                );

                // Check for offset on datalabels
                let datalabelsOffset = 0;
                if (arc.$datalabels[0]._model?.offset) {
                    datalabelsOffset = arc.$datalabels[0]._model.offset
                };

                // Get a first drawing point
                const point1X = chartCenterPoint.x + Math.cos(angle) * (arc.outerRadius - 8);
                let point1Y = chartCenterPoint.y + Math.sin(angle) * (arc.outerRadius - 8);
                // Get the second point depending of its position
                const point2X = chartCenterPoint.x + Math.cos(angle) * (arc.outerRadius + 4 + datalabelsOffset);
                let point2Y = chartCenterPoint.y + Math.sin(angle) * (arc.outerRadius + 4 + datalabelsOffset);

                // Draw line between center of the slice and label
                ctx.strokeStyle = backgroundColor[i];
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.moveTo(point1X, point1Y);
                ctx.lineTo(point2X, point2Y);
                ctx.stroke();
            });
        }

        ctx.restore();
    },
};