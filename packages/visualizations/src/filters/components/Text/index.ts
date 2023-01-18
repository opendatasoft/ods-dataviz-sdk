import TextImpl from './Text.svelte';
import SvelteFilterImpl from '../SvelteFilterImpl';

export default class Text extends SvelteFilterImpl<Record<string, never>> {
    protected getSvelteComponentClass(): typeof TextImpl {
        return TextImpl;
    }
}
