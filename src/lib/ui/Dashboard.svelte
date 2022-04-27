<div class="dashboard">
	<div class="nav column-sm">
		<nav>
			<!-- TODO how to support this? -->
			<slot name="nav" />
		</nav>
	</div>
	<div class="content">
		<slot />
	</div>
</div>

<style>
	.dashboard {
		display: flex;
		width: 100%;
		height: 100%;
	}
	.nav {
		height: 100%;
		overflow: auto;
	}
	.content {
		height: 100%;
		flex: 1;
		/* TODO do we need to focus() the .content on mount and add `tabindex="-1"`?  */
		overflow: auto;
	}
</style>
