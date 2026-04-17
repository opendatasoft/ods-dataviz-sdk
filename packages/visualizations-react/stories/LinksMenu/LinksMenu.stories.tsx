import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ChartSeriesType, LINKS_MENU_CLASS, type Link } from '@opendatasoft/visualizations';
import { Chart } from 'src';
import { COLORS } from '../utils';

type ClickLogEntry = {
    at: string;
    kind: 'href-tracked' | 'action';
    label: string;
    href?: string;
};

/* eslint-disable react/prop-types */
function LinksMenuDemo({ options, ...rest }: React.ComponentProps<typeof Chart>) {
    const [hrefTrackedClicks, setHrefTrackedClicks] = useState(0);
    const [actionClicks, setActionClicks] = useState(0);
    const [log, setLog] = useState<ClickLogEntry[]>([]);

    const addLog = (entry: Omit<ClickLogEntry, 'at'>) =>
        setLog(prev => [
            { ...entry, at: new Date().toISOString() },
            ...prev,
        ].slice(0, 10));

    const CODE_LIBRARY_HREF = 'https://codelibrary.opendatasoft.com/';

    const hrefPlainLabel = 'Open Code Library (href, no onClick callback)';
    const hrefTrackedLabel = 'Open Code Library (href, onClick tracking)';
    const actionLabel = 'Show message (action, window.alert)';

    const links: Link[] = [
        {
            href: CODE_LIBRARY_HREF,
            label: hrefPlainLabel,
        },
        {
            href: CODE_LIBRARY_HREF,
            label: hrefTrackedLabel,
            onClick: () => {
                setHrefTrackedClicks(c => c + 1);
                addLog({ kind: 'href-tracked', label: hrefTrackedLabel, href: CODE_LIBRARY_HREF });
            },
        },
        {
            label: actionLabel,
            onClick: () => {
                setActionClicks(c => c + 1);
                addLog({ kind: 'action', label: actionLabel });
                // eslint-disable-next-line no-alert
                window.alert('LinksMenu action clicked');
            },
        },
    ];

    const storyCss = `
.linksMenuStoryOuter{
  padding:8px 12px 16px;
  width:100%;
  box-sizing:border-box;
  font-family:ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  color:#111;
}
.linksMenuStoryGrid{
  display:grid;
  gap:16px;
  align-items:start;
  width:100%;
  max-width:980px;
  margin:0 auto;
  grid-template-columns:minmax(0, 1fr);
}
@media (min-width: 900px){
  .linksMenuStoryGrid{
    grid-template-columns:minmax(0, 1fr) minmax(260px, 320px);
  }
}
`;

    const chartColumn: React.CSSProperties = {
        minWidth: 0,
        width: '100%',
    };

    const chartHost: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    };

    const chartFrame: React.CSSProperties = {
        width: '100%',
        maxWidth: 480,
    };

    const docColumn: React.CSSProperties = {
        width: '100%',
        maxWidth: 320,
    };

    const panel: React.CSSProperties = {
        border: '1px solid #e6e6e6',
        borderRadius: 10,
        background: '#fff',
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        padding: 14,
    };

    const h2: React.CSSProperties = {
        margin: 0,
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: 0.2,
    };

    const muted: React.CSSProperties = {
        margin: '10px 0 0',
        fontSize: 12,
        lineHeight: 1.45,
        color: '#444',
    };

    const list: React.CSSProperties = {
        margin: '10px 0 0',
        paddingLeft: 18,
        fontSize: 12,
        lineHeight: 1.55,
        color: '#333',
    };

    const code: React.CSSProperties = {
        fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        fontSize: 12,
        background: '#f6f8fa',
        border: '1px solid #eef0f3',
        borderRadius: 8,
        padding: '10px 10px',
        overflow: 'auto',
    };

    const inlineCode: React.CSSProperties = {
        fontFamily: code.fontFamily,
        fontSize: 12,
        lineHeight: 'inherit',
        background: '#f6f8fa',
        border: '1px solid #eef0f3',
        borderRadius: 6,
        padding: '0 4px',
        display: 'inline-block',
        transform: 'translateY(0.5px)',
    };

    const divider: React.CSSProperties = {
        height: 1,
        background: '#eee',
        margin: '14px 0',
    };

    const statRow: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        gap: 12,
        fontSize: 12,
        marginTop: 8,
    };

    const logList: React.CSSProperties = {
        margin: '10px 0 0',
        padding: 0,
        listStyle: 'none',
    };

    const logItem: React.CSSProperties = {
        marginTop: 10,
    };

    const logPre: React.CSSProperties = {
        margin: 0,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        ...code,
    };

    return (
        <>
            <style>{storyCss}</style>
            <div className="linksMenuStoryOuter">
                <div className="linksMenuStoryGrid">
                    <div style={chartColumn}>
                        <div style={chartHost}>
                            <div style={chartFrame}>
                                <Chart
                                    {...rest}
                                    options={{
                                        ...options,
                                        links,
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <aside style={{ ...panel, ...docColumn }}>
                        <h2 style={h2}>LinksMenu</h2>
                        <p style={muted}>
                            This story uses a <code style={inlineCode}>Chart</code> only as a host. The interesting part is{' '}
                            <code style={inlineCode}>options.links</code>, which is rendered by the SDK{' '}
                            <code style={inlineCode}>LinksMenu</code>.
                        </p>

                        <div style={divider} />

                        <h2 style={h2}>What you can pass</h2>
                        <ul style={list}>
                            <li>
                                Demo menu items, first <strong>href</strong> without{' '}
                                <code style={inlineCode}>onClick</code>, second <strong>href</strong> with{' '}
                                <code style={inlineCode}>onClick</code> tracking, third <strong>action</strong> with{' '}
                                <code style={inlineCode}>window.alert</code>
                            </li>
                            <li>
                                <strong>LinkHref</strong>, navigational item, opens <code style={inlineCode}>href</code>{' '}
                                in a new tab, optional <code style={inlineCode}>onClick</code> runs before navigation
                            </li>
                            <li>
                                <strong>LinkAction</strong>, in menu action, renders as a button,{' '}
                                <code style={inlineCode}>onClick</code> is required
                            </li>
                            <li>
                                Optional <code style={inlineCode}>icon</code> on both shapes, SVG string
                            </li>
                        </ul>

                        <p style={muted}>
                            Type guard, <code style={inlineCode}>isLinkHref(link)</code>, wrapper class,{' '}
                            <code style={inlineCode}>{LINKS_MENU_CLASS}</code>
                            , useful when cloning the DOM for image export.
                        </p>

                        <div style={divider} />

                        <h2 style={h2}>Click debug</h2>
                        <div style={statRow}>
                            <span>Href tracked onClick</span>
                            <strong>{hrefTrackedClicks}</strong>
                        </div>
                        <div style={statRow}>
                            <span>Action onClick</span>
                            <strong>{actionClicks}</strong>
                        </div>

                        <div style={{ marginTop: 12, fontSize: 12, fontWeight: 700 }}>
                            Log, latest first, JSON per line
                        </div>
                        <ul style={logList}>
                            {log.map(e => (
                                <li key={`${e.at}-${e.kind}-${e.label}`} style={logItem}>
                                    <pre style={logPre}>{JSON.stringify(e, null, 2)}</pre>
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>
            </div>
        </>
    );
}

const meta: Meta<typeof Chart> = {
    title: 'LinksMenu',
    component: Chart,
};

export default meta;

export const Demo: StoryObj<typeof Chart> = {
    args: {
        data: {
            loading: false,
            value: [
                { x: 0, y: 10, z: 6 },
                { x: 1, y: 12, z: 7 },
                { x: 2, y: 8, z: 9 },
                { x: 3, y: 13, z: 5 },
            ],
        },
        options: {
            labelColumn: 'x',
            links: [],
            series: [
                {
                    label: 'Green',
                    type: ChartSeriesType.Line as const,
                    valueColumn: 'y',
                    tension: 0,
                    borderColor: COLORS.green,
                },
                {
                    label: 'Blue',
                    type: ChartSeriesType.Line as const,
                    valueColumn: 'z',
                    tension: 0,
                    borderColor: COLORS.blue,
                },
            ],
            title: {
                text: 'LinksMenu demo',
            },
            legend: {
                display: true,
            },
        },
    },
    render: (args: React.ComponentProps<typeof Chart>) => <LinksMenuDemo {...args} />,
};

