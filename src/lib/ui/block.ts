export type Block =
	| ComponentBlock
	| ImageBlock
	| TextBlock
	| BlockquoteBlock
	| H1Block
	| H2Block
	| H3Block;

export interface ComponentBlock {
	id: string;
	type: 'Component';
	component: string;
	props: any; //{src: string}; // TODO do a union of component block types?
}

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

export interface BlockquoteBlock {
	id: string;
	type: 'Blockquote';
	props?: {class?: string};
	children: Block[];
}

// TODO consider a generic `Element` instead of these? A problem is divergent behavior
// for things like "Iframe" and "Image", gets complicated.
export interface H1Block {
	id: string;
	type: 'H1';
	props?: {class?: string};
	children: Block[];
}
export interface H2Block {
	id: string;
	type: 'H2';
	props?: {class?: string};
	children: Block[];
}
export interface H3Block {
	id: string;
	type: 'H3';
	props?: {class?: string};
	children: Block[];
}
