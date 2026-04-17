<script lang="ts">
    import { onDestroy, tick } from 'svelte';
    import type { LinksMenuProps } from 'types';
    import { isLinkHref } from 'types';

    // Ensure exported type matches declared props
    type $$Props = LinksMenuProps;

    export let links: $$Props['links'];
    export let style: $$Props['style'] = null;

    let menuElement: HTMLDivElement;
    let buttonElement: HTMLButtonElement;
    let menuItemElements: (HTMLElement | undefined)[] = [];
    let isOpen = false;
    let focusedIndex = -1;

    // Generate unique ID for aria-controls
    const menuId = `links-menu-${Math.random().toString(36).slice(2, 9)}`;

    async function openMenu(focusLast = false) {
        isOpen = true;
        focusedIndex = focusLast ? links.length - 1 : 0;
        await tick();
        menuItemElements[focusedIndex]?.focus();
    }

    function closeMenu(returnFocus = true) {
        isOpen = false;
        focusedIndex = -1;
        if (returnFocus) {
            buttonElement?.focus();
        }
    }

    function toggleMenu() {
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function handleMenuItemClick(link: $$Props['links'][number]) {
        link.onClick?.();
        closeMenu();
    }

    function focusItem(index: number) {
        if (index < 0) {
            focusedIndex = links.length - 1;
        } else if (index >= links.length) {
            focusedIndex = 0;
        } else {
            focusedIndex = index;
        }
        menuItemElements[focusedIndex]?.focus();
    }

    /** Handle keyboard navigation on the trigger button */
    function handleButtonKeydown(event: KeyboardEvent) {
        switch (event.key) {
            case 'ArrowDown':
            case 'Down':
                event.preventDefault();
                openMenu();
                break;
            case 'ArrowUp':
            case 'Up':
                event.preventDefault();
                openMenu(true);
                break;
            default:
                break;
        }
    }

    /** Handle keyboard navigation within the menu */
    function handleMenuKeydown(event: KeyboardEvent) {
        switch (event.key) {
            case 'Escape':
                event.preventDefault();
                closeMenu();
                break;
            case 'ArrowDown':
            case 'Down':
                event.preventDefault();
                focusItem(focusedIndex + 1);
                break;
            case 'ArrowUp':
            case 'Up':
                event.preventDefault();
                focusItem(focusedIndex - 1);
                break;
            case 'Home':
                event.preventDefault();
                focusItem(0);
                break;
            case 'End':
                event.preventDefault();
                focusItem(links.length - 1);
                break;
            case 'Tab':
                // Close menu on Tab, let default behavior continue
                closeMenu(false);
                break;
            default:
                break;
        }
    }

    /**
     * Get the root node for event listeners.
     * Returns ShadowRoot when inside Shadow DOM, otherwise document.
     * This ensures click-outside detection works in embedded/Shadow DOM contexts.
     */
    function getEventRoot(): Document | ShadowRoot {
        return (menuElement?.getRootNode() as Document | ShadowRoot) || document;
    }

    /** Close the menu when clicking outside of it. */
    function handleClickOutside(event: Event) {
        const target = (event.composedPath()[0] as HTMLElement) || (event.target as HTMLElement);
        if (menuElement && !menuElement.contains(target)) {
            closeMenu(false);
        }
    }

    // Attach/detach the click listener based on menu state
    // Use getRootNode() to support Shadow DOM (embeds)
    $: if (isOpen && menuElement) {
        getEventRoot().addEventListener('click', handleClickOutside);
    } else if (menuElement) {
        getEventRoot().removeEventListener('click', handleClickOutside);
    }

    // Reset menu items array when links change
    $: menuItemElements = new Array(links.length);

    // Clean up event listener when component is destroyed
    onDestroy(() => {
        getEventRoot().removeEventListener('click', handleClickOutside);
    });
</script>

<div bind:this={menuElement} class="links-menu" {style}>
    <button
        bind:this={buttonElement}
        class="links-button"
        type="button"
        aria-label="Links"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        on:click={toggleMenu}
        on:keydown={handleButtonKeydown}
    >
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <circle cx="10" cy="4" r="1.5" fill="currentColor" />
            <circle cx="10" cy="10" r="1.5" fill="currentColor" />
            <circle cx="10" cy="16" r="1.5" fill="currentColor" />
        </svg>
    </button>

    {#if isOpen && links.length > 0}
        <div
            id={menuId}
            class="dropdown"
            role="menu"
            aria-label="Links"
            tabindex="-1"
            on:keydown={handleMenuKeydown}
        >
            {#each links as link, index}
                {#if isLinkHref(link)}
                    <a
                        bind:this={menuItemElements[index]}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="dropdown-item"
                        role="menuitem"
                        tabindex={focusedIndex === index ? 0 : -1}
                        on:click={() => handleMenuItemClick(link)}
                    >
                        {#if link.icon}
                            <span class="dropdown-item-icon" aria-hidden="true">
                                {@html link.icon}
                            </span>
                        {/if}
                        <span class="dropdown-item-label">{link.label}</span>
                    </a>
                {:else}
                    <button
                        bind:this={menuItemElements[index]}
                        type="button"
                        class="dropdown-item dropdown-item--action"
                        role="menuitem"
                        tabindex={focusedIndex === index ? 0 : -1}
                        on:click={() => handleMenuItemClick(link)}
                    >
                        {#if link.icon}
                            <span class="dropdown-item-icon" aria-hidden="true">
                                {@html link.icon}
                            </span>
                        {/if}
                        <span class="dropdown-item-label">{link.label}</span>
                    </button>
                {/if}
            {/each}
        </div>
    {/if}
</div>

<style>
    .links-menu {
        position: relative;
        flex-shrink: 0;
        width: auto;
    }

    .links-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        cursor: pointer;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
            outline-color 0.15s ease-in-out;
        outline: 2px solid transparent;
        border-radius: var(--links-button-border-radius);
        color: var(--links-button-default-text);
        background-color: transparent;
        border: 1px solid transparent;
    }

    .links-button:hover {
        color: var(--links-button-hover-text);
        background-color: var(--links-button-hover-background);
        border-color: var(--links-button-hover-border);
    }

    .links-button:focus-visible {
        color: var(--links-button-focus-color);
        border-color: var(--links-button-focus-color);
        outline-color: var(--links-button-focus-color) !important;
        outline-offset: 1px;
    }

    .links-button:active {
        background-color: var(--links-button-hover-background);
        color: var(--links-button-active-color);
        outline-color: var(--links-button-active-color) !important;
        outline-offset: 1px;
    }

    .dropdown {
        position: absolute;
        top: 32px;
        right: 0;
        min-width: 200px;
        background: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        overflow: hidden;
    }

    .dropdown-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        font-size: 14px;
        color: #333;
        text-decoration: none;
        transition: background 0.2s ease;
    }

    .dropdown-item:hover,
    .dropdown-item:focus {
        background: #f5f5f5;
        outline: none;
    }

    .dropdown-item:focus-visible {
        outline: 2px solid var(--links-button-focus-color, #0066cc);
        outline-offset: -2px;
    }

    .dropdown-item-icon {
        display: flex;
        align-items: center;
        flex-shrink: 0;
    }

    .dropdown-item-icon :global(svg) {
        flex-shrink: 0;
        width: 16px;
        height: 16px;
        fill: currentColor;
    }

    .dropdown-item-label {
        flex: 1;
    }

    /* Action items: reset native button chrome to match anchor menu items */
    button.dropdown-item--action {
        width: 100%;
        margin: 0;
        border: none;
        background: transparent;
        font: inherit;
        text-align: left;
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
    }
</style>
