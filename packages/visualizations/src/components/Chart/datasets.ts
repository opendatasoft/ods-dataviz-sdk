import type { ChartDataset } from 'chart.js';
import type { Options as DataLabelsOptions } from 'chartjs-plugin-datalabels/types/options';
import type {
    ChartSeries,
    DataLabelsConfiguration,
    FillConfiguration,
    ScriptableTreemapContext,
} from './types';
import type { DataFrame } from '../types';
import { defaultCompactNumberFormat, assureMaxLength } from '../utils/formatter';
import {
    defaultValue,
    singleChartJsColor,
    multipleChartJsColors,
    DEFAULT_GREY_COLOR,
} from './utils';

function chartJsFill(fill: FillConfiguration | undefined) {
    if (fill === undefined) return false;
    return {
        target: fill.mode,
        above: singleChartJsColor(fill.above),
        below: singleChartJsColor(fill.below),
    };
}

function chartJsDataLabels(dataLabels: DataLabelsConfiguration | undefined): DataLabelsOptions {
    if (dataLabels === undefined) return { display: false };
    const { text, align, anchor } = dataLabels;
    return {
        textAlign: 'center',
        align: align ? (context) => align(context.dataIndex) : 'end',
        anchor: anchor ? (context) => anchor(context.dataIndex) : 'end',
        display: defaultValue(dataLabels.display, false),
        color: defaultValue(dataLabels.color, 'rgb(0,0,0)'),
        backgroundColor: defaultValue(dataLabels.backgroundColor, 'rgb(255,255,255, 0.8)'),
        offset: defaultValue(dataLabels.offset, 4),
        borderRadius: defaultValue(dataLabels.borderRadius, 3),
        formatter: (value, context) =>
            text ? text(context.dataIndex) : defaultCompactNumberFormat(value),
        padding: defaultValue(dataLabels.padding, 4),
    };
}

export default function toDataset(df: DataFrame, s: ChartSeries): ChartDataset {
    if (s.type === 'bar') {
        return {
            type: 'bar',
            data: df.map((entry) => entry[s.valueColumn]),
            backgroundColor: multipleChartJsColors(s.backgroundColor),
            borderColor: multipleChartJsColors(s.borderColor),
            borderWidth: defaultValue(s.borderWidth, 1),
            borderRadius: defaultValue(s.borderRadius, 5),
            label: defaultValue(s.label, ''),
            indexAxis: defaultValue(s.indexAxis, 'x'),
            barPercentage: defaultValue(s.barPercentage, 0.9),
            categoryPercentage: defaultValue(s.categoryPercentage, 0.8),
            datalabels: chartJsDataLabels(s.dataLabels),
            stack: s.stack,
        };
    }

    if (s.type === 'line') {
        return {
            type: 'line',
            data: df.map((entry) => entry[s.valueColumn]),
            backgroundColor: singleChartJsColor(s.backgroundColor),
            borderColor: singleChartJsColor(s.borderColor),
            label: defaultValue(s.label, ''),
            fill: chartJsFill(s.fill),
            datalabels: chartJsDataLabels(s.dataLabels),
            tension: defaultValue(s.tension, 0),
            pointRadius: defaultValue(s.pointRadius, 3),
            pointBackgroundColor: defaultValue(s.pointBackgroundColor, 'rgb(255,255,255)'),
            borderDash: defaultValue(s.borderDash, []),
            borderWidth: defaultValue(s.borderWidth, 2),
            spanGaps: defaultValue(s.spanGaps, true),
        };
    }

    if (s.type === 'pie') {
        return {
            type: 'pie',
            label: defaultValue(s.label, ''),
            data: df.map((entry) => entry[s.valueColumn]),
            backgroundColor: multipleChartJsColors(
                s.backgroundColor?.length ? s.backgroundColor : [DEFAULT_GREY_COLOR]
            ),
            datalabels: chartJsDataLabels(s.dataLabels),
        };
    }

    if (s.type === 'radar') {
        return {
            type: 'radar',
            data: df.map((entry) => entry[s.valueColumn]),
            backgroundColor: singleChartJsColor(s.backgroundColor),
            borderColor: singleChartJsColor(s.borderColor),
            label: defaultValue(s.label, ''),
            datalabels: chartJsDataLabels(s.dataLabels),
            pointRadius: defaultValue(s.pointRadius, 3),
            pointBackgroundColor: defaultValue(s.pointBackgroundColor, 'rgb(255,255,255)'),
            borderWidth: defaultValue(s.borderWidth, 2),
        };
    }
    if (s.type === 'doughnut') {
        return {
            type: 'doughnut',
            label: defaultValue(s.label, ''),
            data: df.map((entry) => entry[s.valueColumn]),
            backgroundColor: multipleChartJsColors(
                s.backgroundColor?.length ? s.backgroundColor : DEFAULT_GREY_COLOR
            ),
            datalabels: chartJsDataLabels(s.dataLabels),
        };
    }
    if (s.type === 'treemap') {
        return {
            tree: df,
            datalabels: chartJsDataLabels(s.dataLabels),
            data: [], // from chartjs-chart-treemap index.esm.d.ts: data will be auto-generated from `tree` but appears mandatory in the types
            key: s.keyColumn,
            groups: s.keyGroups,
            borderColor: defaultValue(singleChartJsColor(s.borderColor), 'rgb(255,255,255)'),
            borderWidth: defaultValue(s.borderWidth, 1),
            spacing: defaultValue(s.spacing, 0),
            backgroundColor: (context: ScriptableTreemapContext) => {
                if (s.colorFormatter && typeof context?.index === 'number') {
                    return s.colorFormatter(context.index);
                }
                return DEFAULT_GREY_COLOR;
            },
            labels: s.labels
                ? {
                      align: s.labels.align,
                      display: defaultValue(s.labels.display, false),
                      formatter(context: ScriptableTreemapContext) {
                          if (
                              s.labels &&
                              s.labels.labelsFormatter &&
                              typeof context?.index === 'number'
                          ) {
                              const { maxLength } = s.labels;
                              if (maxLength) {
                                  const formattedLabels = s.labels.labelsFormatter(context.index);
                                  if (Array.isArray(formattedLabels)) {
                                      return formattedLabels.map((l) =>
                                          assureMaxLength(l, maxLength)
                                      );
                                  }
                                  return assureMaxLength(formattedLabels, maxLength);
                              }
                              return s.labels.labelsFormatter(context.index);
                          }
                          return '';
                      },
                      font: s.labels.font,
                      color: s.labels.color,
                      overflow: defaultValue(s.labels.overflow, 'cut'),
                      hoverColor: s.labels.hoverColor,
                      hoverFont: s.labels.hoverFont,
                      position: s.labels.position,
                  }
                : { display: false },
        };
    }

    if (s.type === 'scatter') {
        return {
            type: 'scatter',
            label: defaultValue(s.label, ''),
            data: df.map((entry) => ({
                x: entry[defaultValue(s.indexAxis, 'x')],
                y: entry[defaultValue(s.valueColumn, 'y')],
            })),
            datalabels: chartJsDataLabels(s.dataLabels),
            backgroundColor: singleChartJsColor(s.backgroundColor),
            pointRadius: defaultValue(s.pointRadius, 5),
            pointHitRadius: defaultValue(s.pointHitRadius, 5),
            pointHoverRadius: defaultValue(s.pointHoverRadius, 5),
            pointBorderColor: defaultValue(s.pointBorderColor, 'rgba(255,255,255, 0)'),
        };
    }
    throw new Error('Unknown chart type');
}
