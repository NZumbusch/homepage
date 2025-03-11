<script lang="ts">
    import Cover from "./lib/cover.svelte";
    import NavDesktop from "./lib/navigation/nav-desktop.svelte";
    import Icon from "@iconify/svelte";
    import NavMobile from "./lib/navigation/nav-mobile.svelte";

    import BehindEuph from "../public/img/pictures/portraits/IMG_6773 Kopie2.jpg";
    import LookingLeft from "../public/img/pictures/portraits/IMG_6738 Kopie 2.jpg";
    import levenshtein from "./lib/levenshtein";

    let socialMedia = [
        [ "fa:linkedin-square", "https://de.linkedin.com/in/nathanzumbusch" ],
        [ "fa:instagram", "https://www.instagram.com/nz.euph" ]
    ]

    type repT = (string | { title: string; original: boolean; piano: boolean; windband: boolean; brassband: boolean; orchestra: boolean; }[])[][];
    const rep: repT = [
        [ "Joseph Horovitz", [
            { title: "Euphonium Concerto", original: true, piano: true, windband: true, brassband: true, orchestra: true }
        ] ],
        [ "Philip Wilby", [
            { title: "Euphonium Concerto", original: true, piano: true, windband: true, brassband: true, orchestra: false }
        ] ],
        [ "Satoshi Yagisawa", [
            { title: "Euphonium Concerto", original: true, piano: true, windband: true, brassband: false, orchestra: false }
        ] ],
        [ "Yasuhide Ito", [
            { title: "Fantasy Variations", original: true, piano: true, windband: true, brassband: false, orchestra: false }
        ] ],
        [ "Luc Vertommen", [
            { title: "Carmen Fantasy Nr. 1", original: true, piano: true, windband: true, brassband: true, orchestra: false }
        ] ],
        [ "Rolf Wilhelm", [
            { title: "Concertino for Euphonium", original: true, piano: true, windband: true, brassband: false, orchestra: false }
        ] ],
        [ "Eduardo Boccalari", [
            { title: "Fantasia di Concerto", original: true, piano: true, windband: true, brassband: false, orchestra: false }
        ] ],
        [ "Bert Appermont", [
            { title: "The Green Hill", original: true, piano: true, windband: true, brassband: true, orchestra: false }
        ] ],
        [ "Jean-Baptiste Arban", [
            { title: "Fantasie Brillante", original: false, piano: true, windband: true, brassband: true, orchestra: true },
            { title: "Fantaisie Variations on \"The Carnival of Venice\"", original: false, piano: true, windband: true, brassband: true, orchestra: true }
        ] ],
        [ "Gilles Rocha", [
            { title: "Ad Astra", original: true, piano: true, windband: false, brassband: true, orchestra: false }
        ] ],
        [ "Antonio Vivaldi", [
            { title: "Bassoon Concerto in E-flat minor, RV. 484", original: false, piano: true, windband: false, brassband: true, orchestra: true }
        ] ],
        [ "Georg F. Telemann", [
            { title: "Sonata in F minor", original: false, piano: true, windband: false, brassband: false, orchestra: false }
        ] ],
        [ "Robert Schumann", [
            { title: "Fantasiestücke, op. 73", original: false, piano: true, windband: false, brassband: false, orchestra: false }
        ] ],
        [ "Marcel Bitsch", [
            { title: "Intermezzo", original: true, piano: true, windband: false, brassband: false, orchestra: false }
        ] ],
        [ "Jules Semler-Collery", [
            { title: "Intermezzo", original: true, piano: true, windband: false, brassband: false, orchestra: false }
        ] ],
        [ "Thomas Rüedi", [
            { title: "In Modo Humano", original: true, piano: false, windband: false, brassband: false, orchestra: false },
            { title: "Anemoi", original: true, piano: false, windband: false, brassband: false, orchestra: false }
        ] ],
        [ "Leonard Falcone", [
            { title: "Mazurka", original: true, piano: false, windband: false, brassband: false, orchestra: false }
        ] ],
        [ "Zequinha de Abreu", [
            { title: "Tico-Tico no Fubá", original: true, piano: false, windband: false, brassband: false, orchestra: false }
        ] ]
    ]



    const compareStrings = (a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;

        return 0;
    }

    const compare = (a, b) => {
        const splitA = a.split(" ");
        const splitB = b.split(" ");
        const lastA = splitA[splitA.length - 1];
        const lastB = splitB[splitB.length - 1];
        if (lastA === lastB) {
            return compareStrings(splitA[0], splitB[0])
        } else {
            return compareStrings(lastA, lastB);
        }
    }



    let repertoireFilterComposer = "";
    let repertoireFilterTitle = "";
    let repertoireFilter = "";
    let fRep: repT = [];
    //$: console.log(repertoireFilter, repertoireFilterComposer, repertoireFilterTitle)
    $: repertoireFilter, repertoireFilterTitle, repertoireFilterComposer, updateRepertoire();
    const updateRepertoire = () => {
        fRep = rep;
        console.log(repertoireFilter, repertoireFilterComposer, repertoireFilterComposer, rep, fRep);
        fRep = repertoireFilterComposer.length > 0 ? rep.filter((element) => { return (levenshtein(element[0], repertoireFilterComposer) < 3) || element[0].indexOf(repertoireFilterComposer) !== -1; }) : rep.slice();

        if (repertoireFilterTitle.length > 0) {
            fRep.forEach((element, i) => {
                fRep[i] = [ element[0], element[1].filter( (e) => { return (levenshtein(e.title, repertoireFilterTitle) < 3) || e.title.indexOf(repertoireFilterTitle) !== -1; } ) ]
            })
        }

        if (repertoireFilter !== "") {
            fRep.forEach((element, i) => {
                fRep[i] = [ element[0], element[1].filter( (e) => { 
                    switch (repertoireFilter) {
                        case "c":
                            return e.windband;
                            break;
                        case "s":
                            return e.orchestra;
                            break;
                        case "b":
                            return e.brassband;
                            break;
                        case "p":
                            return e.piano;
                            break;
                        case "u":
                            return !(e.windband || e.orchestra || e.brassband || e.piano);
                            break;
                        default:
                            return false;
                    }
                } ) ]
            })
        }


        fRep = fRep.filter((e) => { return (e[1].length > 0) }).sort((a, b) => {
            return compare(a[0], b[0]);
        })

        console.log(fRep, rep)

    }



    let innerWidth = 0;
    let innerHeight = 0;
    $: onMobile = innerWidth < innerHeight;
    // $: console.log(innerWidth, innerHeight, innerWidth < innerHeight); 
    let repFilterVisible = false;
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
        <div class="relative text-right pb-8 w-[80%] sm:w-[50%]">
            <div class="flex flex-row-reverse justify-between items-start mb-5">
                <div>
                    <h1 class="text-4xl font-playfair flex-grow-0 mt-16 sm:mt-0">Repertoire</h1>
                    <p>{fRep.length} results.</p>
                </div>
            
                <div class="search-container">
                    <div class="dropdown">
                        <button id="filterDropdown" style="{  repFilterVisible ? "transform: scale(1.03)" : '' }" aria-haspopup="true" aria-expanded="false" onclick="{() => {repFilterVisible = !repFilterVisible}}">
                            Filters
                        </button>
                        <div
                            id="filterContent"
                            class="dropdown-content {repFilterVisible ? "active" : "" }"
                            aria-labelledby="filterDropdown"
                        >
                            <div class="filter-group">
                                <label for="phaseFilter">Accompaniment</label>
                                <select bind:value={repertoireFilter} id="phaseFilter">
                                    <option value="">All</option>
                                    <option value="c">Concert Band</option>
                                    <option value="b">Brass Band</option>
                                    <option value="s">Symphony Orchestra</option>
                                    <option value="p">Piano</option>
                                    <option value="u">Unaccompanied</option>
                                </select>
                            </div>
                
                            <div class="filter-group">
                                <label for="composerFilter">Composer</label>
                                <input bind:value={repertoireFilterComposer} type="text" id="composerFilter" placeholder="Composer" />
                            </div>
                            <div class="filter-group">
                                <label for="titleFilter">Title</label>
                                <input bind:value={repertoireFilterTitle} type="text" id="titleFilter" placeholder="Title" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="scrollbox h-[60vh] overflow-y-auto pr-5" style="border-right: 2px solid black;">
                {#if fRep.length > 0}
                
                    {#each fRep as composer}
                        <div class="text-xl mt-5 first:mt-0">{ composer[0] }</div>
                        {#each composer[1] as p}
                            <p>{ p.title }</p>
                        {/each}
                    {/each}
                
                {:else}
                    Sadly there are no results for this filter. Try something different. s
                {/if}
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




<style>

    :root {
        --primary-color: #9160D6; /* Vert moderne */
        --secondary-color: #CBB3BF; /* Fond sombre */
        --accent-color: #535353; /* Gris foncé */
        --text-color: #121212;
        --background-color: #191414; /* Fond légèrement plus clair */
    }




.dropdown button {
    padding: 12px 24px;
    background-color: var(--primary-color);
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    
}

input[type="text"],
input[type="date"],
select {
    padding: 12px;
    border: 1px solid var(--accent-color);
    border-radius: 5px;
    font-size: 16px;
    background-color: var(--secondary-color);
    color: var(--text-color);
    flex-grow: 1;
}

input::placeholder {
    color: var(--accent-color);
}

#searchInput {
    padding-left: 20px;
    flex-grow: 2;
}

button {
    padding: 12px 24px;
    background-color: var(--primary-color);
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: var(--accent-color);
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    left: 0;
    top: 100%;
    background-color: var(--secondary-color);
    min-width: 250px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
    z-index: 1;
    padding: 20px;
    border-radius: 5px;
}

.dropdown-content.active {
    display: block;
    margin-top: 10px;
}

.toolbar {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        background-color: var(--secondary-color);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    }

    .search-container {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .dropdown button {
        padding: 8px 12px;
        background-color: #CBB3BF;

        color: black;
        border: 2px solid #CBB3BF;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 700;
        transition: background-color 0.3s ease;
    }

    input[type="text"],
    input[type="date"],
    select {
        padding: 12px;
        border: 1px solid var(--accent-color);
        border-radius: 5px;
        font-size: 16px;
        background-color: var(--secondary-color);
        color: var(--text-color);
        flex-grow: 1;

        width: 100%;
    }

    input::placeholder {
        color: var(--accent-color);
    }

    #searchInput {
        padding-left: 20px;
        flex-grow: 2;
    }

    button {
        padding: 12px 24px;
        background-color: var(--primary-color);
        color: var(--text-color);
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 700;
        transition: background-color 0.3s ease;
    }

    button:hover {
        transform: scale(1.03);
    }

    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        left: 0;
        top: 100%;
        background-color: var(--secondary-color);
        min-width: 250px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
        z-index: 1;
        padding: 20px;
        border-radius: 5px;
    }

    .dropdown-content.active {
        display: block;
    }

    .filter-group {
        margin-bottom: 15px;
    }

    .filter-group label {
        display: block;
        margin-bottom: 5px;
        color: #121212;
        font-weight: 700;
    }

    @media (max-width: 768px) {
        .toolbar {
            flex-direction: column;
            align-items: stretch;
        }

        .search-container {
            flex-direction: column;
            align-items: stretch;
        }

        .dropdown-content {
            width: 100%;
            left: 0;
        }
    }

</style>