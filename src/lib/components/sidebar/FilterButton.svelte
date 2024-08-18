<script>
	import { page } from '$app/stores';
	export let filterIcon, link, title, countDue, countTotal;
</script>

<a
	href={link}
	class="sidebar-button filter common w-full flex"
	class:active={$page.url.pathname === link}
>
	<span class="sidebar-filter-icon">
		<svelte:component this={filterIcon} size={20} />
	</span>
	<span class="sidebar-filter-name">{title}</span>
	<div class="flex gap-[0.1rem]">
		{#if countDue > 0}
			<div class="count due"><span>{countDue}</span></div>
		{/if}

		{#if countTotal > 0}
			<div class="count"><span>{countTotal}</span></div>
		{/if}
	</div>
</a>
