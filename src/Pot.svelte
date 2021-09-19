<script>
    import { onMount } from "svelte"

    import { burnerOverlap, flavourTown } from "./stores"
    
    import Water from "./Water.svelte"
    import Draggable from "./Draggable.svelte"
    import Buljong from "./Buljong.svelte";


    let pot;
    let burners;
    
    const closest = (el, ls) => {
        let r = el.getBoundingClientRect();
        let acc = ls[0];

        for (const b of ls.slice(1)) {
            let br = b.getBoundingClientRect();
            let ar = acc.getBoundingClientRect();
            
            if (
                (Math.abs(r.left - br.left) + Math.abs(r.top - br.top)) < 
                (Math.abs(r.left - ar.left) + Math.abs(r.top - ar.top))) {
                acc = b
            }
        }
        
        return ls.indexOf(acc);
    }

    const degreeOverlap = (a, b) => {
        let r1 = a.getBoundingClientRect();
        let r2 = b.getBoundingClientRect();
        let offset = 7;

        let degree = 100 - (Math.abs(r1.left - r2.left - offset) + Math.abs(r1.top - r2.top - offset));
        return degree;
    }

    const overlaps = (p, bs) => {
        let i = closest(p, bs);
        let closestBurner = bs[i];
        return[i, degreeOverlap(p, closestBurner)];
    }
    
    onMount(() => {
        burners = [... document.getElementsByClassName("burner")];
    });
</script>

<Draggable>
    <div class="pot" bind:this={ pot }></div>
    <div class="base"></div>
    <div class="handle" on:click={ () => burnerOverlap.set(overlaps(pot, burners)) }></div>
    <Water/>

    <div class="flavour-zone" on:drop|preventDefault={ () => flavourTown.set(true) } ondragover="return false"></div>

</Draggable>
