<script lang="ts">
    import { coverInView } from "../../stores/coverInView";

    let sections = [
        ["Home", "#cover"],
        ["Biography", "#biography"],
        [ "Repertoire", "#repertoire" ],
        //["Media"],
        ["Contact", "#contact"]
    ]
    let focused = false;

</script>

<div class="relative w-[100vw] h-auto">


    <div class="transition-all transition-[1s] p-4 z-10 relative flex flex-row items-center justify-between {$coverInView ? "bg-transparent" : "bg-white shadow-lg"}">
        <span class="p-2 ml-4 font-playfair text-3xl text-black relative">Nathan Zumbusch</span>

        <div role="doc-subtitle" on:mouseenter={() => {focused = true;}} on:mouseleave={() => {focused = false;}}>
            {#each sections as section, num}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                <span on:click={ () => { window.location.href = section[1]; }} class=" text-xl p-2 pl-4 pr-4 cursor-pointer font-semibold transition {focused ? "text-black/40" : "text-black/100"} hover:text-black/100">{section[0]}</span>
            {/each}
        </div>
    </div>


    
</div>