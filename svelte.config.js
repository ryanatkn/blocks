import {typescript} from 'svelte-preprocess-esbuild';
import static_adapter from '@sveltejs/adapter-static';

// const dev = process.argv.includes('dev'); // see below

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: typescript(),
	compilerOptions: {
		immutable: true,
	},
	kit: {
		adapter: static_adapter(),
		paths: dev ? undefined : {base: '/blocks'},
		files: {assets: 'src/static'},
		prerender: {default: true},
		vite: {
			ssr: {
				noExternal: ['@feltcoop/felt'],
			},
		},
	},
};
