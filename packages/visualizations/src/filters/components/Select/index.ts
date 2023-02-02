import SelectImpl from './Select.svelte';
import SvelteFilterImpl from '../SvelteFilterImpl';
import type { SelectOptions } from '../../types';

export default class Select extends SvelteFilterImpl<SelectOptions> {
    protected getSvelteComponentClass(): typeof SelectImpl {
        return SelectImpl;
    }
}
