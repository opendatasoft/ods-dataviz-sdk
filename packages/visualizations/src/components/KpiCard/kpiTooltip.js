import tippy from 'tippy.js';

export default function kpiTooltip(node, formattedValue) {
    let tip = null;
    // Check if aria-label is present for accessibility
    const label = node.getAttribute('aria-label');
    if (!label) node.setAttribute('aria-label', formattedValue);
    // Cancel if node has title not to create two tooltips on hover
    /* eslint-disable no-param-reassign */
    node.title = '';

    // Check if content is not empty to display tooltip
    if (formattedValue) {
        tip = tippy(node, { content: formattedValue });
    }
    return {
        update: (formattedValueUpdate) => {
            // Call the function after data loading or update
            const labelUpdate = node.getAttribute('aria-label');
            if (!labelUpdate) node.setAttribute('aria-label', formattedValue);
            if (formattedValueUpdate) {
                tip = tippy(node, { content: formattedValueUpdate });
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
