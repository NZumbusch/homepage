<script lang="ts">
    import { onMount } from "svelte";
    import { coverInView } from "../stores/coverInView";


    let coverImages = [
        /*"/img/pictures/suedkurier_quer.jpg",*/
        "https://nzumbusch.github.io/homepage/img/pictures/preistraegerkonzert_land.jpg"
    ];
    let usedImageCounter = 0;
    /*
    setInterval(() => {
        usedImageCounter++;
        if (usedImageCounter >= coverImages.length) {
            usedImageCounter = 0;
        }
    }, 5000)*/


    // Create a new IntersectionObserver object
    let observer = new IntersectionObserver(function (entries, observer) {
        coverInView.set(entries[0].isIntersecting)
    });
    let coverElement: HTMLElement;
    onMount(() => {
        observer.observe(coverElement);
    })
</script>

<div class="relative h-[80vh]" id="cover">
    <div bind:this={coverElement} class="absolute top-1 sm:top-auto sm:bottom-[250px] left-0 w-5 h-5 bg-transparent"></div>


    <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('{coverImages[usedImageCounter]}')"></div>

    {#if coverImages.length > 1}
        <div class="absolute bottom-16 flex w-full items-center justify-center">
            <div class="bg-black/50 flex flex-row rounded-full p-4">
                {#each coverImages as img, num}
                    <div on:click={() => {usedImageCounter = num;}} class="cursor-pointer w-8 h-8 {usedImageCounter != num ? "bg-theme-dim" : "bg-theme-bright"} rounded-full mr-4 last:mr-0"></div>
                {/each}
            </div>
        </div>
    {/if}
</div>
