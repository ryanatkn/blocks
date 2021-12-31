import {type Json} from '@feltcoop/felt/util/json.js';

// TODO where does this belong? `parse` module?

export const parseString: (value: unknown) => string | undefined = (value) =>
	typeof value === 'string' ? value : undefined;

// TODO does weird things like turn `NaN` into `null` but w/e (should prob be undefined?)
export const parseJson: (value: unknown) => Json | undefined = (value) =>
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
	component: TComponent;
	props: TProps;
}
export type ComponentBlock =
	| ColumnComponentBlock
	| IframeComponentBlock
	| DashboardComponentBlock
	| GridComponentBlock;
export interface ColumnComponentBlock extends BaseComponentBlock<'Column', {blocks: BaseBlock[]}> {}
export interface IframeComponentBlock
	extends BaseComponentBlock<
		'Iframe',
		{src: string; width?: number | string; height?: number | string; class?: string}
	> {}
export interface DashboardComponentBlock extends BaseComponentBlock<'Dashboard', {}> {}
export interface GridComponentBlock extends BaseComponentBlock<'Grid', {}> {}

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
	attributes?: {class?: string; style?: string};
}

export interface OtherElementBlock extends BaseElementBlock {
	name: 'h1' | 'h2' | 'h3' | 'blockquote' | 'p' | 'span' | 'div' | 'code';
	children: Block[];
}

export interface ImgElementBlock extends BaseElementBlock {
	name: 'img';
	attributes: {
		src: string;
		alt: string;
		width?: number;
		height?: number;
	} & BaseElementBlock['attributes'];
}
export interface ButtonElementBlock extends BaseElementBlock {
	name: 'button';
	children: Block[];
	onClick?: EventDoc; // TODO rename? `event`? `action`? `click`? `onclick`?
}
export interface AElementBlock extends BaseElementBlock {
	name: 'a';
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
			return value as Block; // TODO
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
			if (id === undefined) {
				return undefined;
			}
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

export const parseId: (value: unknown) => string | undefined = parseString;

export const parseContent: (value: unknown) => string | undefined = parseString;

export const parseComponent: (value: unknown) => string | undefined = parseString;

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
