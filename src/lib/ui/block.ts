// TODO add `type: 'Fragment'` to handle arrays?

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

// TODO not sure about this definition, maybe make it generic
export type ElementBlock = OtherElementBlock | ImgElementBlock;

export interface OtherElementBlock {
	id: string;
	type: 'Element';
	name: 'h1' | 'h2' | 'h3' | 'blockquote' | 'p' | 'span' | 'div' | 'code';
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
