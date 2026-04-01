import tippyAction from 'components/utils/tippy';
import type { Instance } from 'tippy.js';
import { DATA_FORMAT } from '../constants';

// These are the three column types whose CSS truncates content (see CellContent.svelte styles)
const TRUNCATING_FORMATS: string[] = [DATA_FORMAT.shortText, DATA_FORMAT.longText, DATA_FORMAT.url];

function tooltipOnOverflow(el: HTMLElement, dataFormat: string) {
    let action: ReturnType<typeof tippyAction> | null = null;

    function create() {
        action = tippyAction(el, {
            theme: 'ods-visualization-table',
            delay: [500, 0],
            duration: [275, 0],
            maxWidth: 350,
            onShow(inst: Instance) {
                // URLFormat and GeoFormat wrap their content in a role="button" div (Tooltip.svelte)
                // when a thumbnail/map tooltip is already active — don't overlap.
                if (el.querySelector('[role="button"]')) return false;

                // long-text clamp is on a child <span> (see CellContent.svelte);
                // for short-text/url the truncation CSS is on el itself.
                const target = el.querySelector<HTMLElement>(':scope > span') ?? el;
                const overflows =
                    target.scrollWidth > target.offsetWidth ||
                    target.scrollHeight > target.offsetHeight;
                if (!overflows) return false;
                inst.setContent(el.innerText);
                return undefined;
            },
        });
    }

    function teardown() {
        action?.destroy();
        action = null;
    }

    if (TRUNCATING_FORMATS.includes(dataFormat)) create();

    return {
        update(newDataFormat: string) {
            if (TRUNCATING_FORMATS.includes(newDataFormat) && !action) create();
            else if (!TRUNCATING_FORMATS.includes(newDataFormat) && action) teardown();
        },
        destroy: teardown,
    };
}

export default tooltipOnOverflow;
