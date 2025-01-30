<script lang="ts">
    import Cover from "./lib/cover.svelte";
    import NavDesktop from "./lib/navigation/nav-desktop.svelte";
    import Icon from "@iconify/svelte";
    import NavMobile from "./lib/navigation/nav-mobile.svelte";

    import BehindEuph from "../public/img/pictures/portraits/IMG_6773 Kopie2.jpg";
    import LookingLeft from "../public/img/pictures/portraits/IMG_6738 Kopie 2.jpg";


    let socialMedia = [
        [ "fa:linkedin-square", "https://de.linkedin.com/in/nathanzumbusch" ],
        [ "fa:instagram", "https://www.instagram.com/nz.euph" ]
    ]

    let repertoire = {
        "Wind Band": [false, [
            [ "Joseph Horovitz", "Euphonium Concerto" ],
            [ "Philip Wilby", "Euphonium Concerto" ],
            [ "Satoshi Yagisawa", "Euphonium Concerto" ],
            [ "Yasuhide Ito", "Fantasy Variations" ],
            [ "Luc Vertommen", "Carmen Fantasy" ],
            [ "Rolf Wilhelm", "Concertino for Euphonium" ],
            [ "Eduardo Boccalari", "Fantasia di Concerto" ],
            [ "Bert Appermont", "The Green Hill" ]
        ]],
        "Brass Band": [false, [
            [ "Joseph Horovitz", "Euphonium Concerto" ],
            [ "Philip Wilby", "Euphonium Concerto" ],
            [ "Luc Vertommen", "Carmen Fantasy" ],
            [ "Gilles Rocha", "Ad Astra" ],
            [ "Bert Appermont", "The Green Hill" ]
        ]],
        "Piano": [false, [
            [ "Joseph Horovitz", "Euphonium Concerto" ],
            [ "Philip Wilby", "Euphonium Concerto" ],
            [ "Satoshi Yagisawa", "Euphonium Concerto" ],
            [ "Yasuhide Ito", "Fantasy Variations" ],
            [ "Luc Vertommen", "Carmen Fantasy" ],
            [ "Rolf Wilhelm", "Concertino for Euphonium" ],
            [ "Anthony Girard", "Sonata for Euphonium and Piano" ],
            [ "Eduardo Boccalari", "Fantasia di Concerto" ],
            [ "Antonio Vivaldi", "Bassoon Concerto in E-flat minor, RV. 484" ],
            [ "Georg F. Telemann", "Sonata in F minor" ],
            [ "Robert Schumann", "Fantasiestücke, op. 73" ],
            [ "Bert Appermont", "The Green Hill" ]
        ]],
        "Unaccompanied": [false, [
            [ "Thomas Rüedi", "In Modo Humano" ],
            [ "Thomas Rüedi", "Anemoi" ],
            [ "Leonardo Falcone", "Mazurka" ]
        ]]
    }
    function openRepertoire (setting: keyof typeof repertoire) {
        for (let i in repertoire) {
            if (i != setting || repertoire[i as keyof typeof repertoire][0] == true) {
                repertoire[i as keyof typeof repertoire][0] = false;
            } else {
                repertoire[i as keyof typeof repertoire][0] = true;
            }
        }  
    }


    let innerWidth = 0;
    let innerHeight = 0;
    $: onMobile = innerWidth < innerHeight;
    $: console.log(innerWidth, innerHeight, innerWidth < innerHeight); 
</script>




<svelte:window bind:innerWidth bind:innerHeight />
<main>
    <div class="fixed top-0 left-0 w-auto h-auto z-30">
        {#if onMobile}
            <NavMobile />
        {:else}
            <NavDesktop />
        {/if}
    </div>
    
    <Cover></Cover>

    <div class="relative w-full h-auto bg-theme-dim">
        <div id="biography" class="w-full h-auto flex flex-col sm:flex-row items-center justify-center pr-8 pl-8 ">
            <div class="mt-8 sm:mt-0 mb-6 sm:mb-0 h-auto p-4 sm:p-[5vw]"><img class="w-full sm:w-[30vw]" src={BehindEuph}></div>
            <div class="sm:max-w-[60%] pb-8 pt-8">
                <h1 class="text-4xl font-playfair mb-8">About me</h1>
                <p>Nathan began his euphonium studies at the age of six. By playing in different ensembles and genres, he soon developed a sense for music playing and performance in different constellations and occasions.</p>
                <p class="mt-2">At age 10, he participated in his first music contest, from whereon he continued to gather competition experience, eventually leading to a <a class="text-theme-bright font-semibold mb-[5px] underline" href="https://dasneueradioseefunk.imsueden.de/musikschule-konstanz-erzielt-hervorragende-ergebnisse-364044/">first price in the prestigious "Bundeswettbewerb Jugend musiziert"</a>, with a full 25 of 25 points being given. </p>
                <p class="mt-2">Now, Nathan is playing in multiple ensembles, namely the <a class="text-theme-bright font-semibold mb-[5px] underline" href="https://landesblasorchester.de">symphonic wind orchestra of the state of "Baden-Württemberg"</a> and it's youth counterpart, and is performing both in an ensemble settings as well as as soloist with piano or concert band. He is also frequently working as a substitute in wind bands such as the <a class="text-theme-bright font-semibold mb-[5px] underline" href="https://landespolizeiorchester-bw.de">police band of the state of "Baden-Württemberg"</a>.</p>
                <p class="mt-2">Nathan began his lessons with Steffen Schwartz at the local music school in Constance, Germany. From thereon, he also studied with Michael Müller whilst frequently participating in masterclasses and taking lessons with renowned personalities like Steven Mead and Anne Jelle Visser.</p>
                <p class="mt-2">In autumn 2024, Nathan is now starting his bachelor studies in music performance at the <a class="text-theme-bright font-semibold mb-[5px] underline" href="https://hslu.ch">Lucerne conservatory</a> with <a class="text-theme-bright font-semibold mb-[5px] underline" href="https://thomasruedi.ch">Thomas Rüedi</a>.</p>
            </div>
        </div>
    </div>


    <div id="repertoire" class="pr-8 pl-8 relative w-full h-auto bg-theme-dim-alternate flex flex-col-reverse sm:flex-row items-center justify-center flex-grow">
        <div class="relative text-right pb-8">
            <h1 class="text-4xl font-playfair mb-8">Repertoire</h1>
            <div>
                {#each (Object.keys(repertoire) as Array<keyof typeof repertoire>) as setting}
                    <button on:click={() => {openRepertoire(setting)}} class="text-xl underline font-playfair italic mt-3 first:mt-0">{setting}</button>
                    <div  class="relative w-full transition-all overflow-hidden {repertoire[setting][0] == false ? "max-h-0" : "max-h-[fit]"}">
                        {#each (repertoire[setting][1] as string[][]) as piece}
                            <p>{piece[0]}: {piece[1]}</p>
                        {/each}
                    </div>
                {/each}
            </div>
        </div>

        <div class="mt-8 sm:mt-0 mb-6 sm:mb-0 h-auto p-4 sm:p-[5vw]"><img class="w-full sm:w-[30vw]" src={LookingLeft}></div>
    </div>


    <div id="contact" class="p-16 relative w-full h-auto bg-theme-dim flex sm:flex-row flex-col items-center justify-center flex-grow">
        <div class="relative max-w-[400px] text-center">
            <h1 class="text-4xl font-playfair mb-8">Connect with me</h1>
            <p>If you have any questions, want to work together on a project or just chat, I'd love to hear from you! <br> Feel free to reach out via <a class="text-theme-bright font-semibold mb-[5px] underline" href="https://www.instagram.com/nz.euph">social media</a> or <a class="text-theme-bright font-semibold mb-[5px] underline" href="mailto:info@nathanzumbusch.de">email</a>.</p>
        </div>
    </div>


    <div class="bg-white flex flex-col md:flex-row items-start justify-between p-16 pr-48 flex-grow">
        <div class="flex flex-col ">
            <h1 class="font-playfair text-4xl text-left mb-4" >Nathan Zumbusch</h1>
        
            <p class="text-nowrap mb-2">6003 Lucerne, Switzerland</p>
            <p class="text-nowrap mb-2">78464 Konstanz, Germany</p>
            <a href="mailto:info@nathanzumbusch.de">info@nathanzumbusch.de</a>
        </div>

        <div  class="font-playfair text-2xl flex flex-col md:flex-row justify-between items-start mt-8 md:mt-0 md:pl-16">
            <div class="md:pr-48">
                <h2>Follow me</h2>

                <div class="mt-4 flex flex-row">
                    {#each socialMedia as media}
                    <a href="{media[1]}" class="mr-4 last:mr-0 flex items-center justify-center h-[3rem] w-[3rem] rounded-full border-2 border-black"><Icon icon="{media[0]}" width="1.2rem" height="1.2rem" /></a>
                    {/each}
                </div>
            </div>
            <div class="mt-8 md:mt-0">
                <h2>Work with me</h2>

                <div class="mt-4 flex flex-row">
                    <a href="mailto:info@nathanzumbusch.de" class="bg-theme-dim-alternate font-rubik font-semibold text-sm pl-4 pr-4 mr-4 last:mr-0 w-auto text-nowrap flex-nowrap flex items-center justify-center h-[3rem] rounded-full">Get in touch</a>
                </div>
            </div>
        </div>
    </div>
</main>