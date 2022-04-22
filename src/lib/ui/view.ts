import type {Root, SvelteChild} from 'svast';
import {compile as stringifySvast} from 'svast-stringify';
import {parse as parseSvast} from 'svelte-parse';
import {setContext, getContext} from 'svelte';
import type {Readable} from 'svelte/store';
import type {Result} from '@feltcoop/felt';

export type ViewData = Root;

export type ViewNode = Root | SvelteChild; // TODO does this technically need to include `Node`?

export type ViewProps = Record<string, any>;
export type ViewDirectives = Record<string, any>;
export interface ViewInfo {
	props: ViewProps | undefined;
	directives: ViewDirectives | undefined;
}

// Svelte errors with string directive values, so to keep the code Svelte-compatible,
// we use specially named properties like `onClick` instead
export type ViewDirective = 'onClick';
export const viewDirectives: Set<ViewDirective> = new Set(['onClick'] as const);

/**
 * Returns the props object for a Svelte component SVAST,
 * e.g. `<Foo a="A" b="B" />` returns `{a: 'A', b: 'B'}`.
 * @param view
 * @returns Props object that can be splatted into a Svelte component.
 */
export const toViewInfo = (view: ViewNode): ViewInfo => {
	let props: ViewProps | undefined;
	let directives: ViewProps | undefined;
	if ('properties' in view) {
		for (const property of view.properties) {
			if (property.type === 'svelteProperty') {
				// TODO refactor
				const {name} = property;
				const v = viewDirectives.has(name as any) // TODO better type handling?
					? directives || (directives = {})
					: props || (props = {});
				for (const value of property.value) {
					if (value.type === 'text') {
						if (name in v) {
							v[name] += value.value;
						} else {
							v[name] = value.value;
						}
					} // else unhandled dynamic content
				}
			}
		}
	}
	return {props, directives};
};

export const toComponentViewData = (tagName: string): ViewData => ({
	type: 'root',
	children: [
		{
			type: 'svelteComponent',
			tagName,
			properties: [],
			selfClosing: true,
			children: [],
		} as any, // TODO this cast is needed until this PR fixes it: https://github.com/pngwn/MDsveX/pull/436
	],
});

export interface ViewContext {}

const KEY = Symbol();
export const getViewContext = (): Readable<ViewContext> => getContext(KEY);
export const setViewContext = (ctx: Readable<ViewContext>): void => setContext(KEY, ctx);

export const parseView = (value: string, generatePositions = false): ViewData =>
	parseSvast({value, generatePositions});

export const parseViewString = (value: string): Result<{value: string}, {message: string}> => {
	try {
		const parsed = parseView(value);
		return {ok: true, value: stringifySvast(parsed)};
	} catch (err) {
		return {ok: false, message: 'failed to parse'};
	}
};

export const serializeView = stringifySvast;
