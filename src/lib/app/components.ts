import type {SvelteComponent} from 'svelte';
import Iframe from '$lib/ui/Iframe.svelte';
import Column from '$lib/ui/Column.svelte';
import Dash from '$lib/ui/Dash.svelte';
import Full from '$lib/ui/Full.svelte';

export const components: Record<string, typeof SvelteComponent> = {Iframe, Column, Dash, Full};
