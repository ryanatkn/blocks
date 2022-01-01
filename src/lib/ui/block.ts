import {type Json} from '@feltcoop/felt/util/json.js';

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
	element: string;
	// TODO could support `style` if properly sanitized,
	// but that's not a light process until it's builtin to the platform:
	// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Sanitizer_API
	attributes?: {class?: string};
	children?: Block[]; // TODO problem here is some elements cannot have children, but this makes the current usage cleaner
}

export interface OtherElementBlock extends BaseElementBlock {
	element: 'h1' | 'h2' | 'h3' | 'blockquote' | 'p' | 'span' | 'div' | 'code';
	children: Block[];
}

export interface ImgElementBlock extends BaseElementBlock {
	element: 'img';
	attributes: {
		src: string;
		alt?: string;
		width?: number;
		height?: number;
	} & BaseElementBlock['attributes'];
}
export interface ButtonElementBlock extends BaseElementBlock {
	element: 'button';
	children: Block[];
	onClick?: EventDoc; // TODO rename? `event`? `action`? `click`? `onclick`?
}
export interface AElementBlock extends BaseElementBlock {
	element: 'a';
	attributes: {
		href: string;
	} & BaseElementBlock['attributes'];
	children: Block[];
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
	components: Map<string, any>; // TODO what data structure? maybe a map where components are keys?
	elements: Map<string, any>; // TODO what data structure? maybe a map where elements are keys?
}

export const parseBlock: ParseValue<Block> = (value, options) => {
	const type = (value as Block)?.type;
	switch (type) {
		case 'Element': {
			const v = value as Partial<BaseElementBlock>; // TODO is just for type purposes
			let parsed: BaseElementBlock = {type} as any;

			const id = parseId(v.id, options) ?? (options.toId ? options.toId() : undefined);
			if (id === undefined) return undefined;
			parsed.id = id;

			const element = parseElement(v.element, options);
			if (element === undefined) return undefined;
			parsed.element = element;

			const attributes = parseAttributes(v.attributes, options);
			if (attributes !== undefined) parsed.attributes = attributes; // is optional (but not for `img`, need schemas)

			// TODO should it only call `parseChildren` (and `parseAttributes`) if the value is defined? not sure which is optimal
			const children = parseChildren(v.children, options);
			if (children !== undefined) parsed.children = children; // is optional (but not for `img`, need schemas)

			return parsed as ElementBlock; // TODO hmm?
		}
		case 'Component': {
			const v = value as Partial<BaseComponentBlock>; // TODO is just for type purposes
			let parsed: BaseComponentBlock = {type} as any;

			const id = parseId(v.id, options) ?? (options.toId ? options.toId() : undefined);
			if (id === undefined) return undefined;
			parsed.id = id;

			const component = parseComponent(v.component, options);
			if (component === undefined) return undefined;
			parsed.component = component;

			const props = parseProps(v.props, options);
			if (props === undefined) return undefined;
			parsed.props = props;

			return parsed as ComponentBlock; // TODO hmm?
		}
		case 'Text': {
			const v = value as Partial<TextBlock>; // TODO is just for type purposes
			let parsed: TextBlock = {type} as any;

			const id = parseId(v.id, options) ?? (options.toId ? options.toId() : undefined);
			if (id === undefined) return undefined;
			parsed.id = id;

			const content = parseContent(v.content, options);
			if (content === undefined) return undefined;
			parsed.content = content;

			return parsed;
		}
		default:
			return undefined;
	}
};

export const parseId: ParseValue<string> = parseString;

export const parseContent: ParseValue<string> = parseString;

// TODO `components` lookup in parameterized options
export const parseComponent: ParseValue<string> = parseString;

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

// TODO parameterize in the options -- is associated with the `BlockView`

export const parseElement: ParseValue<string> = (value, options) =>
	options.elements.has(value as string) ? (value as string) : undefined;

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
		}
		if (p !== undefined) parsed[key] = p;
	}
	return parsed;
};

export const parseChildren: ParseValue<Block[]> = parseBlocks;
