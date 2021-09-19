<script>
    import { spring } from "svelte/motion";
    import { onMount } from "svelte"

    let counter;
    
    // See global.css for sensible values
    let handleOffsetTop = 57;
    let handleOffsetLeft = 140;

    let coords = spring({x: 300, y: 200}, {
        stiffness: 0.25,
        damping: 0.75
    });

    const start = () => {
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", stop);
    }

    const stop = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", stop);       
    }

    const move = (e) => {
        let countertop = counter.item(0);

        coords.set({
            x: e.clientX - countertop.offsetLeft - handleOffsetLeft,  
            y: e.clientY - countertop.offsetTop - handleOffsetTop
        });
    }

    onMount(() => {
        counter = document.getElementsByClassName("countertop");
    });
</script>

<div class="draggable" style="position: relative; left: {$coords.x}px; top:{$coords.y}px;" on:mousedown={ start }>
    <slot></slot>
</div>