<script lang="ts">
    import Icon from "@iconify/svelte";
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


    <div class="transition-all transition-[1s] p-4 pl-7 pr-7 z-10 relative flex flex-row items-center justify-between {$coverInView ? "bg-transparent" : "bg-white shadow-lg"}">
        <span class="font-playfair text-2xl text-black relative font-semibold">Nathan Zumbusch</span>

        <div class="cursor-pointer hidden">
            <Icon icon="fa:bars" width="1.3rem" height="1.3rem" />
        </div>
        
    </div>


    
</div>