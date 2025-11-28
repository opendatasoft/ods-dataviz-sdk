<script lang="ts">
    import { onDestroy } from 'svelte';
    import type { LinksMenuProps } from 'types';

    // Ensure exported type matches declared props
    type $$Props = LinksMenuProps;

    export let links: $$Props['links'];
    export let style: $$Props['style'] = null;

    let menuElement: HTMLDivElement;
    let isOpen = false;

    function toggleMenu() {
        isOpen = !isOpen;
    }

    function closeMenu() {
        isOpen = false;
    }

    /**
     * Close the menu when clicking outside of it.
     * This handler is attached to the window only after the menu opens (via the reactive $: statement),
     * ensuring it doesn't interfere with the initial click that opens the menu.
     */
    function handleClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;
        // Check if click is outside this specific menu instance
        if (menuElement && !menuElement.contains(target)) {
            closeMenu();
        }
    }

    /**
     * Attach/detach the click listener based on menu state.
     * When menu opens, we use setTimeout to delay listener attachment by one tick,
     * preventing the opening click from immediately closing the menu.
     */
    $: if (isOpen) {
        setTimeout(() => {
            window.addEventListener('click', handleClickOutside);
        }, 0);
    } else {
        window.removeEventListener('click', handleClickOutside);
    }

    // Clean up event listener when component is destroyed
    onDestroy(() => {
        window.removeEventListener('click', handleClickOutside);
    });
</script>

<div bind:this={menuElement} class="links-menu" {style}>
    <button class="links-button" on:click={toggleMenu} aria-label="Links" aria-expanded={isOpen}>
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="10" cy="4" r="1.5" fill="currentColor" />
            <circle cx="10" cy="10" r="1.5" fill="currentColor" />
            <circle cx="10" cy="16" r="1.5" fill="currentColor" />
        </svg>
    </button>

    {#if isOpen && links.length > 0}
        <div class="dropdown">
            {#each links as link}
                <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="dropdown-item"
                    on:click={closeMenu}
                >
                    {#if link.icon}
                        <span class="dropdown-item-icon">
                            {@html link.icon}
                        </span>
                    {/if}
                    <span class="dropdown-item-label">{link.label}</span>
                </a>
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
        padding: 0;
        cursor: pointer;
        outline: none;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        border-radius: 50%;
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
        border: none;
        box-shadow: 0px 0px 0px 1px var(--visualization-card-background),
            0px 0px 0px 3px var(--links-button-default-text);
    }

    .links-button:active {
        border: none;
        background-color: var(--links-button-hover-background);
        color: var(--links-button-hover-text);
        box-shadow: 0px 0px 0px 1px var(--visualization-card-background),
            0px 0px 0px 3px var(--links-button-hover-text);
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

    .dropdown-item:hover {
        background: #f5f5f5;
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
</style>
