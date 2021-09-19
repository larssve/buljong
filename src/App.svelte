<script>
	import Cooktop from "./Cooktop.svelte";
	import Pot from "./Pot.svelte";
	import Buljong from "./Buljong.svelte"

	import { flavourTown } from "./stores"

	let counter;
</script>

<div class="kitchen">
	<div class="countertop" bind:this={ counter }>
		<Cooktop />
		<Pot />
		<div class="plate">
			{#if !$flavourTown}
				<Buljong />
			{/if}
		</div>
	</div>
</div>