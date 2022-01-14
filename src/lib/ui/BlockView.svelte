<script lang="ts">
	import {getApp} from '$lib/app/app';
	import {getDevmode} from '@feltcoop/felt/ui/devmode.js';
	import {type Block, type ButtonElementBlock} from '$lib/ui/block';
	import Message from '@feltcoop/felt/ui/Message.svelte'; // TODO maybe remove this dependency
	import BlockViewChildren from '$lib/ui/BlockViewChildren.svelte';

	const {parseOptions} = getApp();

	export let block: Block;

	const devmode = getDevmode();

	const toClickHandler =
		(block: ButtonElementBlock): any =>
		(e: MouseEvent) => {
			// TODO probably replace this with a declarative event system, maybe like:
			// `dispatch(block.onClick.name, block.onClick.params)`
			if (block.onClick!.name === 'ToggleDevmode') {
				$devmode = !$devmode;
			} else {
				console.log('handle button click', e, block.onClick);
			}
		};
</script>

<!-- TODO consider passing `{block}` to components -->

<!-- TODO follow the <svelte:element> proposal: https://github.com/sveltejs/svelte/issues/2324 -->

<!-- svelte-ignore a11y-missing-attribute -->
{#if block.type === 'Component'}<svelte:component
		this={parseOptions.components.get(block.component)}
		{...block.props}
	/>{:else if block.type === 'Text'}{block.content}{:else if block.type === 'Element'}{#if block.element === 'a'}<a
			{...block.attributes}
			data-entity={block.id}
			target="_blank"
			rel="noreferrer noopener nofollow"
			><!--TODO should not override `target`/`rel` if it's an internal or trusted host-->
			<BlockViewChildren {block} />
		</a>{:else if block.element === 'button'}<button
			{...block.attributes}
			data-entity={block.id}
			on:click={block.onClick ? toClickHandler(block) : undefined}
		>
			<BlockViewChildren {block} />
		</button>{:else if block.element === 'h1'}<h1 {...block.attributes} data-entity={block.id}>
			<BlockViewChildren {block} />
		</h1>{:else if block.element === 'h2'}<h2 {...block.attributes} data-entity={block.id}>
			<BlockViewChildren {block} />
		</h2>{:else if block.element === 'h3'}<h3 {...block.attributes} data-entity={block.id}>
			<BlockViewChildren {block} />
		</h3>{:else if block.element === 'blockquote'}<blockquote
			{...block.attributes}
			data-entity={block.id}
		>
			<BlockViewChildren {block} />
		</blockquote>{:else if block.element === 'p'}<p {...block.attributes} data-entity={block.id}>
			<BlockViewChildren {block} />
		</p>{:else if block.element === 'code'}<code {...block.attributes} data-entity={block.id}>
			<BlockViewChildren {block} />
		</code>{:else if block.element === 'span'}<span {...block.attributes} data-entity={block.id}>
			<BlockViewChildren {block} />
		</span>{:else if block.element === 'div'}<div {...block.attributes} data-entity={block.id}>
			<BlockViewChildren {block} />
		</div>{:else if block.element === 'img'}<img
			{...block.attributes}
			data-entity={block.id}
		/>{:else}<Message status="error"
			><!-- TODO make these entities interactive UI components -->
			unknown element <code>'{block.element}'</code>
			for <code>Block</code> <code>{block.id}</code></Message
		>{/if}{/if}
