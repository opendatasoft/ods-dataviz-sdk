import SelectImpl from './Select.svelte';
import SvelteFilterImpl from '../SvelteFilterImpl';

export default class Text extends SvelteFilterImpl<{}> {
    protected getSvelteComponentClass(): typeof SelectImpl {
        return SelectImpl;
    }
}
