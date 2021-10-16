export type Block = ComponentBlock | TextBlock | ElementBlock;

export type ComponentBlock = ColumnComponentBlock | IframeComponentBlock;
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
	props: {src: string};
}

export type ElementBlock = OtherElementBlock | ImgElementBlock;

export interface OtherElementBlock {
	id: string;
	type: 'Element';
	name: 'h1' | 'h2' | 'h3' | 'blockquote' | 'p' | 'span' | 'div';
	props?: {class?: string};
	children: Block[];
}

export interface ImgElementBlock {
	id: string;
	type: 'Element';
	name: 'img';
	props: {src: string; alt: string; class?: string; width?: number; height?: number};
}

export interface TextBlock {
	id: string;
	type: 'Text';
	content: string;
}
