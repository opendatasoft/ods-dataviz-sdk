import tippy from 'tippy.js';

export default function tippyAction(node, formattedValue) {
    let tip = null;
    // Cancel if node has title not to create two tooltips on hover
    /* eslint-disable no-param-reassign */
    node.title = '';

    // Set aria-label for accessibility
    node.setAttribute('aria-label', node.ariaLabel || formattedValue);

    // Check if content is not empty to avoid displaying empty tooltip
    tip = formattedValue && tippy(node, { content: formattedValue });
    return {
        update: (formattedValueUpdate) => {
            // Call again after data loading or update
            node.setAttribute('aria-label', node.ariaLabel || formattedValueUpdate);
            if (tip) {
                tip.setContent(formattedValueUpdate);
            } else {
                tip = formattedValueUpdate && tippy(node, { content: formattedValueUpdate });
            }
        },
        // Cancel the tooltip instance on unmount
        destroy: () => {
            if (tip) {
                tip.destroy();
            }
        },
    };
}
