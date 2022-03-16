import {typescript} from 'svelte-preprocess-esbuild';
import static_adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: typescript(),
	compilerOptions: {
		immutable: true,
	},
	kit: {
		adapter: static_adapter(),
		files: {assets: 'src/static'},
		prerender: {default: true},
		vite: {
			ssr: {
				noExternal: ['@feltcoop/felt'],
			},
		},
	},
};
