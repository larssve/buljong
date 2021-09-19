<script>
    import { onMount } from "svelte";
    import { burnerOverlap, water, waterTemperature } from "./stores"

    const buttons = [...Array(10).keys()]
    
    let burner = 0
    let cooktop = [
        {
            heat: 0,
            target: 0
        },
        {
            heat: 0,
            target: 0
        },
        {
            heat: 0,
            target: 0
        },
        {
            heat: 0,
            target: 0
        }
    ]

    const off = () => {
        cooktop.forEach(b => b.target = 0);
        cooktop = cooktop;
    }

    const updateCooktop = () => {
        cooktop.forEach(b => {
                if (b.target > b.heat) {
                    b.heat++;
                } else if (b.target < b.heat) {
                    b.heat--;
                }
            });
            cooktop = cooktop;
    }

    const increaseTemperature = (burner) => {
        if ($waterTemperature >= 100) {
            waterTemperature.set(100);
            
        } else {
            let inc = burner.heat / 5 * $burnerOverlap[1] / 100;
            waterTemperature.update(wt => wt + inc);
        }
    }

    const approachRoomTemperature = () => {
        let dec = 0.4;
        let roomTemperature = 20;
        if ($waterTemperature < roomTemperature) {
            waterTemperature.update(wt => wt + dec);
        } else {
            waterTemperature.update(wt => wt - dec);
        }
    }

    const updateWaterTemperature = () => {
        let burner = cooktop[$burnerOverlap[0]];
        if ($burnerOverlap[1] < 1 || burner.heat == 0) {
            approachRoomTemperature();
        } else {
            increaseTemperature(burner);
        }
    }

    onMount( () => {
        const interval = setInterval(() => {
            updateCooktop();
            updateWaterTemperature();
        }, 1000);
    });
</script>

<div class="cooktop">
    {#each cooktop as burner}
    <div class="burner h{burner.heat}"></div>
    {/each}
    <div class="selectors">
        <div class="top">
            <p on:click="{() => burner=0}">⭶</p>
            <p on:click="{() => burner=1}">⭷</p>
        </div>
        <div class="bottom">
            <p on:click="{() => burner=2}">⭹</p>
            <p on:click="{() => burner=3}">⭸</p>
        </div>
    </div>
    <div class="control-panel">
        <p class="on-off" on:click={ off }>⏼</p>
        {#each buttons as val}
            <p on:click={ () => cooktop[burner].target = val }>{val}</p>
        {/each}
    </div>
</div>