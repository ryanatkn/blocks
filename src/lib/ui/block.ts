// TODO add `type: 'Fragment'` to handle arrays?

// TODO
type EventDoc = {
	name: string;
	params?: any;
};

export type Block = ComponentBlock | TextBlock | ElementBlock;

export type ComponentBlock =
	| ColumnComponentBlock
	| IframeComponentBlock
	| DashboardComponentBlock
	| GridComponentBlock;
export interface ColumnComponentBlock {
	id: string;
	type: 'Component';
	component: 'Column';
	props: {blocks: Block[]};
}
export interface IframeComponentBlock {
	id: string;
	type: 'Component';
	component: 'Iframe';
	props: {src: string; width?: number | string; height?: number | string; class?: string};
}
export interface DashboardComponentBlock {
	id: string;
	type: 'Component';
	component: 'Dashboard';
	props: {};
}
export interface GridComponentBlock {
	id: string;
	type: 'Component';
	component: 'Grid';
	props: {};
}

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

// TODO `sanitizeBlocks` probably
// TODO schema. and parse instead? return a partial array?
export const validateBlocks: (value: unknown) => asserts value is Block[] = (value) => {
	value; // TODO
};
