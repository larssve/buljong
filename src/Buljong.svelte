<script>
    export let draggable = true;
    export let wrapped = true;
</script>


<div class="buljong">
{#if wrapped}
    <div class="wrapper" on:click={ () => wrapped=false }></div>
{:else}        
    <div class="flavour" draggable="{ draggable }"></div>
{/if}
</div>