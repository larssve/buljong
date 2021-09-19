<script>
    import Buljong from "./Buljong.svelte"

    import { waterTemperature, flavourTown } from "./stores"

    const cook = (temp) => {
        if ($flavourTown) {
            if (temp > 90 || cooking == "finish") return "finish";
            if (temp > 80 || cooking == "sprint") return "sprint";
            if (temp > 70 || cooking == "progress") return "progress";
            if (temp > 60 || cooking ==  "start") return "start";
            else return "";
        }
        return "";
    }

    $:cooking = cook($waterTemperature);
</script>


<div class="pot-content">
    <div class="water" >
        {#if $waterTemperature > 60}
            <div class="steam" id="steam-one"/>
        {/if}
        {#if $waterTemperature > 70}
            <div class="steam" id="steam-two"/>
        {/if}
        {#if $waterTemperature > 80}
            <div class="steam" id="steam-three"/>
            <div class="bubble" id="bubble-one"/>
            {/if}
        {#if $waterTemperature > 90}
            <div class="steam" id="steam-four"/>
            <div class="bubble" id="bubble-two"/>
        {/if}
    </div>

    {#if $flavourTown}
        {#if !(cooking == "finish" || cooking == "sprint") }
        <Buljong wrapped={false} draggable={false} />
        {/if}

        <div class="delicious {cooking}"></div>
    {/if}
</div>

