import type {SvelteComponent} from 'svelte';
import Iframe from '$lib/ui/Iframe.svelte';
import Column from '$lib/ui/Column.svelte';

export const components: Record<string, typeof SvelteComponent> = {Iframe, Column};
