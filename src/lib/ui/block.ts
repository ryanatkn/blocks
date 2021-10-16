export type Block = ComponentBlock | ImageBlock | TextBlock | ElementBlock;

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

export interface ElementBlock {
	id: string;
	type: 'Element';
	name: 'h1' | 'h2' | 'h3' | 'blockquote';
	props?: {class?: string};
	children: Block[];
}

// TODO should these be part of `ElementBlock`?

export interface ImageBlock {
	id: string;
	type: 'Image';
	props: {src: string; alt: string; class?: string; width?: number; height?: number};
}

export interface TextBlock {
	id: string;
	type: 'Text';
	// props?: {class?: string}; // TODO to support this, need to add a span wrapper
	content: string;
}
