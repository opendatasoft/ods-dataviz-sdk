import FilterImpl from './Filter.svelte';
import SvelteImpl from '../SvelteImpl';

export default class Filter extends SvelteImpl<string, string> {
    protected getSvelteComponentClass(): typeof FilterImpl {
        return FilterImpl;
    }
}
