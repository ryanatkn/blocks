import type {ClientEvent} from '$lib/app/events';
import type {Json} from '@feltcoop/felt/util/json.js';
import type {SvelteComponent} from 'svelte';

// TODO where do these belong? `parse` module?

export interface ParseValue<T> {
	(value: unknown, options: ParseBlockOptions): T | undefined;
}

export const parseString: ParseValue<string> = (value) =>
	typeof value === 'string' ? value : undefined;

export const parseNumber: ParseValue<number> = (value) =>
	typeof value === 'number' && !Number.isNaN(value) ? value : undefined;

// TODO does weird things like turn `NaN` into `null` but w/e (should prob be undefined?)
export const parseJson: ParseValue<Json> = (value) =>
	value === undefined ? undefined : JSON.parse(JSON.stringify(value));

// TODO add `type: 'Fragment'` to handle arrays?

// TODO more types? `Html`, `Markdown` -- security tho
interface BaseBlock {
	[key: string]: Json;
}
export type Block = ComponentBlock | TextBlock | ElementBlock;

// TODO should this be a generic?
export interface BaseComponentBlock<
	TComponent extends string = string,
	TProps extends {[key: string]: Json} = {[key: string]: Json},
> {
	id: string;
	type: 'Component';
	component: TComponent; // TODO should this be `name`?
	props: TProps;
}
export type ComponentBlock =
	| ColumnComponentBlock
	| IframeComponentBlock
	| DashboardComponentBlock
	| GridComponentBlock
	| BackgroundComponentBlock;
// TODO prop types of each impl are duplicated in their components
export interface ColumnComponentBlock extends BaseComponentBlock<'Column', {blocks: BaseBlock[]}> {}
export interface IframeComponentBlock
	extends BaseComponentBlock<
		'Iframe',
		{src: string; width?: number | string; height?: number | string; class?: string}
	> {}
export interface DashboardComponentBlock extends BaseComponentBlock<'Dashboard', {}> {}
export interface GridComponentBlock extends BaseComponentBlock<'Grid', {}> {}
export interface BackgroundComponentBlock
	extends BaseComponentBlock<'Background', {src: string; alt: string; classes?: string}> {}

export interface TextBlock {
	id: string;
	type: 'Text';
	content: string;
}

export interface ElementBlock {
	id: string;
	type: 'Element';
	element: string;
	// TODO use zod and parse attrs
	// TODO could support `style` if properly sanitized,
	// but that's not a light process until it's builtin to the platform:
	// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Sanitizer_API
	attributes?: {
		[key: string]: any;
		class?: string;
		src: string;
		alt?: string;
		width?: number;
		height?: number;
		href: string;
	};
	children?: Block[]; // TODO problem here is some elements cannot have children, but this makes the current usage cleaner
	onClick?: ClientEvent;
}

// TODO schema
export const parseBlocks: ParseValue<Block[]> = (value, options) => {
	if (!Array.isArray(value)) return undefined;
	const parsed: Block[] = [];
	for (const v of value) {
		const p = parseBlock(v, options);
		if (p !== undefined) parsed.push(p);
	}
	return parsed;
};

export interface ParseBlockOptions {
	toId?: () => string;
	components: Map<string, typeof SvelteComponent>; // TODO value type? make it generic?
	elements: Map<string, any>; // TODO value type? make it generic?
	events: Map<string, any>; // TODO value type? make it generic?
}

export const parseBlock: ParseValue<Block> = (value, options) => {
	const type = (value as Block)?.type;
	switch (type) {
		case 'Element': {
			const v = value as Partial<ElementBlock>; // TODO is just for type purposes
			let parsed: ElementBlock = {type} as any;

			const element = parseElement(v.element, options);
			if (element === undefined) return undefined;
			parsed.element = element;

			if (v.attributes) {
				const attributes = parseAttributes(v.attributes, options);
				if (attributes !== undefined) parsed.attributes = attributes as ElementBlock['attributes'];
			}

			if (v.children) {
				const children = parseChildren(v.children, options);
				if (children !== undefined) parsed.children = children;
			}

			if (v.onClick) {
				const onClick = parseOnClick(v.onClick, options);
				if (onClick !== undefined) parsed.onClick = onClick;
			}

			const id = parseId(v.id, options) ?? (options.toId ? options.toId() : undefined);
			if (id === undefined) return undefined;
			parsed.id = id;

			return parsed as ElementBlock; // TODO hmm?
		}
		case 'Component': {
			const v = value as Partial<BaseComponentBlock>; // TODO is just for type purposes
			let parsed: BaseComponentBlock = {type} as any;

			const component = parseComponent(v.component, options);
			if (component === undefined) return undefined;
			parsed.component = component;

			const props = parseProps(v.props, options);
			if (props === undefined) return undefined;
			parsed.props = props;

			const id = parseId(v.id, options) ?? (options.toId ? options.toId() : undefined);
			if (id === undefined) return undefined;
			parsed.id = id;

			return parsed as ComponentBlock; // TODO hmm?
		}
		case 'Text': {
			const v = value as Partial<TextBlock>; // TODO is just for type purposes
			let parsed: TextBlock = {type} as any;

			const content = parseContent(v.content, options);
			if (content === undefined) return undefined;
			parsed.content = content;

			const id = parseId(v.id, options) ?? (options.toId ? options.toId() : undefined);
			if (id === undefined) return undefined;
			parsed.id = id;

			return parsed;
		}
		default:
			return undefined;
	}
};

export const parseId: ParseValue<string> = parseString;

export const parseContent: ParseValue<string> = parseString;

export const parseComponent: ParseValue<string> = (value, options) =>
	options.components.has(value as string) ? (value as string) : undefined;

// TODO specific impls for each component type
export const parseProps: ParseValue<{[key: string]: Json}> = (value, options) => {
	if (!value || typeof value !== 'object') return undefined;
	const parsed: {[key: string]: Json} = {};
	for (const key in value) {
		const p = parseJson((value as {[key: string]: any})[key], options); // TODO parse JSON?
		if (p !== undefined) parsed[key] = p;
	}
	return parsed;
};

export const parseElement: ParseValue<string> = (value, options) =>
	options.elements.has(value as string) ? (value as string) : undefined;

export const parseEvent: ParseValue<ClientEvent> = (value, options) =>
	value && options.events.has((value as ClientEvent).name) ? (value as ClientEvent) : undefined;

export const parseClass: ParseValue<string> = parseString;

// TODO rules for domains (outbound links are less sensitive than embedding)
export const parseHref: ParseValue<string> = parseString;

// TODO rules for domains (embedding is more sensitive than outbound links)
export const parseSrc: ParseValue<string> = parseString;

export const parseAlt: ParseValue<string> = parseString;

export const parseDimension: ParseValue<number> = parseNumber;

// TODO parameterize like `toId`?
// TODO custom per `element`
export const parseAttributes: ParseValue<{[key: string]: Json}> = (value, options) => {
	if (!value || typeof value !== 'object') return undefined;
	const parsed: {[key: string]: Json} = {};
	for (const key in value) {
		const v = (value as {[key: string]: any})[key];
		let p: Json | undefined;
		switch (key) {
			case 'class': {
				p = parseClass(v, options);
				break;
			}
			case 'href': {
				p = parseHref(v, options);
				break;
			}
			case 'src': {
				p = parseSrc(v, options);
				break;
			}
			case 'alt': {
				p = parseAlt(v, options);
				break;
			}
			case 'width':
			case 'height': {
				p = parseDimension(v, options);
				break;
			}
			// TODO optionally return warnings for ignored attributes (other warnings/diagnostics too)
		}
		if (p !== undefined) parsed[key] = p;
	}
	return parsed;
};

// TODO should this even exist? maybe as a lookup in a map from the string `'children'`
export const parseChildren: ParseValue<Block[]> = parseBlocks;

// TODO should this even exist? maybe as a lookup in a map from the string `'onClick'`
export const parseOnClick: ParseValue<ClientEvent> = parseEvent;
