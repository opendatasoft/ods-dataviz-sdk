import SvelteImpl from '../SvelteImpl';
import type { DataFrame } from '../types';
import TableImpl from './Table.svelte';
import type { TableOptions  } from './types';

export default class Table extends SvelteImpl<DataFrame, TableOptions> {
    protected getSvelteComponentClass(): typeof TableImpl {
        return TableImpl;
    }
}
