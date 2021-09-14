export const pieDataLabelsPlugin =
    {
        afterDraw: (chart) => {
            const ctx = chart.ctx;
            ctx.save();
            const chartCenterPoint = {
                x:
                    (chart.chartArea.right - chart.chartArea.left) / 2 +
                    chart.chartArea.left,
                y: (chart.chartArea.bottom - chart.chartArea.top) / 2 + chart.chartArea.top,
            };
            chart.config.data.labels.forEach((label, i) => {
                const arc = chart.getDatasetMeta(0).data[i];

                // Get the center of the chart and the center point of the slice to determine the angle
                const centerPoint = arc.getCenterPoint();

                const angle = Math.atan2(
                    centerPoint.y - chartCenterPoint.y,
                    centerPoint.x - chartCenterPoint.x
                );

                //Check for offset on datalabels
                let datalabelsOfset = 0;
                if (arc.$datalabels[0]._model?.offset) {
                    datalabelsOfset = arc.$datalabels[0]._model.offset
                } ;

                // Get a first drawing point
                const point1X = chartCenterPoint.x + Math.cos(angle) * (arc.outerRadius - 8);
                let point1Y = chartCenterPoint.y + Math.sin(angle) * (arc.outerRadius - 8);
                // Get the second point depending of its position
                const point2X =
                    chartCenterPoint.x + Math.cos(angle) * (arc.outerRadius + 4 + datalabelsOfset);
                let point2Y = chartCenterPoint.y + Math.sin(angle) * (arc.outerRadius + 4 + datalabelsOfset);

                // Draw line between center of the slice and label
                ctx.strokeStyle = chart.config.data.datasets[0].backgroundColor[i];
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.moveTo(point1X, point1Y);
                ctx.lineTo(point2X, point2Y);
                ctx.stroke();
            });
            ctx.restore();
        },
    };