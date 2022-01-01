import {type Json} from '@feltcoop/felt/util/json.js';

// TODO where do these belong? `parse` module?

export interface ValueParser<T extends Json> {
	(value: unknown): T | undefined;
}

export const parseString: ValueParser<string> = (value) =>
	typeof value === 'string' ? value : undefined;

export const parseNumber: ValueParser<number> = (value) =>
	typeof value === 'number' && !Number.isNaN(value) ? value : undefined;

// TODO does weird things like turn `NaN` into `null` but w/e (should prob be undefined?)
export const parseJson: ValueParser<Json> = (value) =>
	value === undefined ? undefined : JSON.parse(JSON.stringify(value));

// TODO add `type: 'Fragment'` to handle arrays?

// TODO
type EventDoc = {
	name: string;
	params?: any;
};

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

// TODO not sure about this definition, maybe make it generic
export type ElementBlock = OtherElementBlock | ImgElementBlock | ButtonElementBlock | AElementBlock;

// TODO uh oh complexity
export interface BaseElementBlock {
	id: string;
	type: 'Element';
	tagname: string;
	// TODO could support `style` if properly sanitized,
	// but that's not a light process until it's builtin to the platform:
	// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Sanitizer_API
	attributes?: {class?: string};
}

export interface OtherElementBlock extends BaseElementBlock {
	tagname: 'h1' | 'h2' | 'h3' | 'blockquote' | 'p' | 'span' | 'div' | 'code';
	children: Block[];
}

export interface ImgElementBlock extends BaseElementBlock {
	tagname: 'img';
	attributes: {
		src: string;
		alt?: string;
		width?: number;
		height?: number;
	} & BaseElementBlock['attributes'];
}
export interface ButtonElementBlock extends BaseElementBlock {
	tagname: 'button';
	children: Block[];
	onClick?: EventDoc; // TODO rename? `event`? `action`? `click`? `onclick`?
}
export interface AElementBlock extends BaseElementBlock {
	tagname: 'a';
	attributes: {
		href: string;
	} & BaseElementBlock['attributes'];
	children: Block[];
}

// TODO schema
export const parseBlocks: (value: unknown) => Block[] | undefined = (value) => {
	if (!Array.isArray(value)) return undefined;
	const parsed: Block[] = [];
	for (const v of value) {
		const p = parseBlock(v);
		if (p) parsed.push(p);
	}
	return parsed;
};

export interface ParseBlockOptions {
	toId?: () => string;
}

const DEFAULT_OPTIONS: ParseBlockOptions = {};

export const parseBlock: (value: unknown, options?: ParseBlockOptions) => Block | undefined = (
	value,
	options = DEFAULT_OPTIONS,
) => {
	const type = (value as Block)?.type;
	switch (type) {
		case 'Element': {
			const v = value as Partial<BaseElementBlock>; // TODO is just for type purposes
			let parsed: BaseElementBlock = {type} as any;

			const id = parseId(v.id) ?? (options.toId ? options.toId() : undefined);
			if (id === undefined) return undefined;
			parsed.id = id;

			const tagname = parseTagname(v.tagname);
			if (tagname === undefined) return undefined;
			parsed.tagname = tagname;

			const attributes = parseAttributes(v.attributes);
			if (attributes === undefined) return undefined;
			parsed.attributes = attributes;

			return parsed as ElementBlock; // TODO hmm?
		}
		case 'Component': {
			const v = value as Partial<BaseComponentBlock>; // TODO is just for type purposes
			let parsed: BaseComponentBlock = {type} as any;

			const id = parseId(v.id) ?? (options.toId ? options.toId() : undefined);
			if (id === undefined) return undefined;
			parsed.id = id;

			const component = parseComponent(v.component);
			if (component === undefined) return undefined;
			parsed.component = component;

			const props = parseProps(v.props);
			if (props === undefined) return undefined;
			parsed.props = props;

			return parsed as ComponentBlock; // TODO hmm?
		}
		case 'Text': {
			const v = value as Partial<TextBlock>; // TODO is just for type purposes
			let parsed: TextBlock = {type} as any;

			const id = parseId(v.id) ?? (options.toId ? options.toId() : undefined);
			if (id === undefined) return undefined;
			parsed.id = id;

			const content = parseContent(v.content);
			if (content === undefined) return undefined;
			parsed.content = content;

			return parsed;
		}
		default:
			return undefined;
	}
};

export const parseId: ValueParser<string> = parseString;

export const parseContent: ValueParser<string> = parseString;

// TODO `components` lookup in parameterized options
export const parseComponent: ValueParser<string> = parseString;

// TODO specific impls for each component type
export const parseProps: (value: unknown) => {[key: string]: Json} | undefined = (value) => {
	if (!value || typeof value !== 'object') return undefined;
	const parsed: {[key: string]: Json} = {};
	for (const key in value) {
		const p = parseJson((value as {[key: string]: any})[key]); // TODO parse JSON?
		if (p !== undefined) parsed[key] = p;
	}
	return parsed;
};

// TODO parameterize in the options -- is associated with the `BlockView`
const tagnames = new Set([
	'h1',
	'h2',
	'h3',
	'blockquote',
	'p',
	'span',
	'div',
	'code',
	'img',
	'button',
	'a',
]);

export const parseTagname: ValueParser<string> = (value) =>
	tagnames.has(value as string) ? (value as string) : undefined;

export const parseClass: ValueParser<string> = parseString;

// TODO rules for domains (outbound links are less sensitive than embedding)
export const parseHref: ValueParser<string> = parseString;

// TODO rules for domains (embedding is more sensitive than outbound links)
export const parseSrc: ValueParser<string> = parseString;

export const parseAlt: ValueParser<string> = parseString;

export const parseDimension: ValueParser<number> = parseNumber;

// TODO parameterize like `toId`?
// TODO custom per `tagname`
export const parseAttributes: (value: unknown) => {[key: string]: Json} | undefined = (value) => {
	if (!value || typeof value !== 'object') return undefined;
	const parsed: {[key: string]: Json} = {};
	for (const key in value) {
		const v = (value as {[key: string]: any})[key];
		let p: Json | undefined;
		switch (key) {
			case 'class': {
				p = parseSrc(v);
				break;
			}
			case 'href': {
				p = parseHref(v);
				break;
			}
			case 'src': {
				p = parseSrc(v);
				break;
			}
			case 'alt': {
				p = parseAlt(v);
				break;
			}
			case 'width':
			case 'height': {
				p = parseDimension(v);
				break;
			}
		}
		if (p !== undefined) parsed[key] = p;
	}
	return parsed;
};
