export type Block = ComponentBlock | TextBlock | ElementBlock;

export type ComponentBlock =
	| ColumnComponentBlock
	| IframeComponentBlock
	| DashComponentBlock
	| FullComponentBlock;
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
export interface DashComponentBlock {
	id: string;
	type: 'Component';
	component: 'Dash';
	props: {};
}
export interface FullComponentBlock {
	id: string;
	type: 'Component';
	component: 'Full';
	props: {};
}

export type ElementBlock = OtherElementBlock | ImgElementBlock;

export interface OtherElementBlock {
	id: string;
	type: 'Element';
	name: 'h1' | 'h2' | 'h3' | 'blockquote' | 'p' | 'span' | 'div';
	attributes?: {class?: string; style?: string};
	children: Block[];
}

export interface ImgElementBlock {
	id: string;
	type: 'Element';
	name: 'img';
	attributes: {
		src: string;
		alt: string;
		class?: string;
		style?: string;
		width?: number;
		height?: number;
	};
}

export interface TextBlock {
	id: string;
	type: 'Text';
	content: string;
}
