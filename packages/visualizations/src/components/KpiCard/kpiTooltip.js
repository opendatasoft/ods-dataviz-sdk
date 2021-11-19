import tippy from 'tippy.js';

export function kpiTooltip(node, formattedValue) {
    let tip = null;
    // Check if aria-label is present for accessibility
    const label = node.getAttribute("aria-label");
    if (!label) node.setAttribute("aria-label", formattedValue);
    // Cancel if node has title not to create two tooltips on hover
    node.title = "";

    // Check if content is not empty to display tooltip
    if (formattedValue) {
        tip = tippy(node, {content: formattedValue});
    }
    return {
        update: (formattedValue) => {
                // Call the function after data loading or update
                const label = node.getAttribute("aria-label");
                if (!label) node.setAttribute("aria-label", formattedValue);
                if (formattedValue) {
                    tip = tippy(node, {content: formattedValue});
                }
        },
        // Cancel the tooltip instance on unmount
        destroy: () => {
            if (tip) {
                tip.destroy()
            }
        },
      };

  };
