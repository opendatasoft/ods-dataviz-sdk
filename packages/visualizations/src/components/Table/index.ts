import TableImpl from './Table.svelte';
import SvelteImpl from '../SvelteImpl';
import type { TableData, TableOptions } from './types';

export default class KpiCard extends SvelteImpl<TableData, TableOptions> {
    protected getSvelteComponentClass(): typeof TableImpl {
        return TableImpl;
    }
}
