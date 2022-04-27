// TODO make a schema for this and use it to validate/parse
// TODO should `children` instead be the Activity Streams `Collection` `items`?

export const defaultCode = `
<Column>
	<div class="panel-inset markup">
		<h1 class="flex">
			spiderspace <img onClick="ToggleDevmode" class="pixelated rotating-hue" src="/favicon.png" alt="spiderspace spider logo" width="16" height="16" />
		</h1>
	</div>
	<blockquote style="margin: var(--spacing_xl) 0;">
		press
		<button class="inline" onClick="ToggleDevmode">
			<img onClick="ToggleDevmode" class="pixelated rotating-hue" src="/favicon.png" alt="spiderspace spider logo" width="32" height="32" />
		</button> or <code>Backtick \`</code>
		to enter devmode
	</blockquote>
	<Iframe src="https://spiderspace.github.io/about" class="panel-outset" width="380px" height="300px" />
	<Background src="/favicon.png" alt="spiderspace spider logo" class="pixelated rotating-hue" />
	<img onClick="ToggleDevmode" class="pixelated rotating-hue" src="/favicon.png" alt="spiderspace spider logo" width="256" height="256" />
</Column>
`;
