<script lang="ts">
    import ShortTextFormat from './ShortTextFormat.svelte';
    import { isValidUrl } from './utils';
    import type { URLFormatProps } from './types';

    type $$Props = URLFormatProps;

    interface Props {
        rawValue: $$Props['rawValue'];
        display?: $$Props['display'];
        target?: $$Props['target'];
        rel?: $$Props['rel'];
    }

    let {
        rawValue,
        display = (v: string) => v,
        target = '_blank',
        rel = 'nofollow noreferrer noopener'
    }: Props = $props();

    let format = $derived((v: unknown) => {
        if (isValidUrl(v)) {
            return {
                text: display && display(v),
                href: v,
            };
        }
        // eslint-disable-next-line no-console
        console.warn(`ODS Dataviz SDK - Table: no url detected in ${v}. Formatting as string.`);
        return { text: null, href: null };
    });

    let { text, href } = $derived(format(rawValue));
</script>

{#if text}
    <a {href} {rel} {target}>{text}</a>
{:else}
    <ShortTextFormat {rawValue} {display} />
{/if}
