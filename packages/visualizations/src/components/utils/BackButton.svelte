<script>
</script>

<button class="back-button" type="button" on:click>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
        ><path fill="none" d="M0 0h24v24H0z" /><path
            d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"
        /></svg
    >
</button>

<style>
    /*
     * Looks like one of the map control buttons it sits under, at the size of a whole control group
     * rather than a single button (it stands alone, so it carries the group's padding itself). The
     * map that mounts it owns where it goes, since only that map knows which corner its controls are
     * in.
     */
    button {
        cursor: pointer;
        position: absolute;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: content-box;
        width: var(--map-control-button-size);
        height: var(--map-control-button-size);
        padding: var(--spacing-50);
        border: none;
        border-radius: var(--border-radius-6);
        background-color: var(--background-color);
        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.26);
    }
</style>
