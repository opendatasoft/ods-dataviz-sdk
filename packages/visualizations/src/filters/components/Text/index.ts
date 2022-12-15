import TextImpl from './Text.svelte';
import SvelteFilterImpl from '../SvelteFilterImpl';

export default class Text extends SvelteFilterImpl<{}> {
    protected getSvelteComponentClass(): typeof TextImpl {
        return TextImpl;
    }
}
