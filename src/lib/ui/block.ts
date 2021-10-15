export type Block = ComponentBlock | ImageBlock | TextBlock | BlockquoteBlock | H1Block;

export interface ComponentBlock {
	id: string;
	type: 'Component';
	component: string;
	props: {src: string};
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

export interface H1Block {
	id: string;
	type: 'H1';
	props?: {class?: string};
	children: Block[];
}
