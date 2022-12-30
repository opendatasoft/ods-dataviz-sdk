import TextImpl from './Text.svelte';
import SvelteImpl from '../../../components/SvelteImpl';

export default class Text extends SvelteImpl<null, any> {
    protected getSvelteComponentClass(): typeof TextImpl {
        return TextImpl;
    }
}
