const allPokemon = [];

let offset = 0;
const loadCount = 25;

let currentPokemonArray = []
let currentPokemon = null
let currentDisplayedPokemon = [];

const gallery = document.getElementById("gallery");
const loadingOverlay = document.getElementById("loadingOverlay");
const loadMore = document.getElementById("loadMore");
const noResults = document.getElementById("noResults");
const pokemonDialog = document.getElementById("pokemonDialog");
const dialogContent = document.getElementById("dialogContent");

async function fetchPokemon() {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${loadCount}&offset=${offset}`,
    );
    return response.json();
}

async function fetchPokemonDetails(pokemonList) {
    return Promise.all(
        pokemonList.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            return response.json();
        }),
    );
}

async function loadPokemon() {
    loadMore.disabled = true;

    try {
        const data = await fetchPokemon();
        const loadedPokemon = await fetchPokemonDetails(data.results);

        allPokemon.push(...loadedPokemon);
        renderPokemon(loadedPokemon);

        offset += loadCount;
    } catch (err) {
        console.error("Failed to load Pokémon", err);
    } finally{
        loadMore.disabled = false;
    }
}

async function init() {
    showLoadingScreen();
    checkSearchInput();
    const minimumLoadingTime = new Promise (resolve => setTimeout(resolve, 2500))
    await loadPokemon();
    await Promise.all([waitForImagesToLoad(), minimumLoadingTime]);
    hideLoadingScreen();
}

function renderPokemon(pokemonArray){
    currentDisplayedPokemon = pokemonArray;
    for (const pokemon of pokemonArray) {
        const primaryType = pokemon.types[0].type.name;
        const newCard = getPokemonCardTemplate(pokemon, primaryType);

        gallery.appendChild(newCard);
    }
}

// maybe change this to map instead of for loop
function getTypeBadges(types) {
    let badges = "";

    for (const typeDetails of types) {
        const type = typeDetails.type.name;
        badges += /*html*/ `
                <span class = "type-badge type-${type}">${type}</span>
        `;
    }
    return badges;
}


function hideLoadingScreen(){
    loadingOverlay.classList.add("d-none");
    enableScroll();
}

function showLoadingScreen(){
    loadingOverlay.classList.remove("d-none");
    disableScroll();
}

async function loadMorePokemon(){
    showLoadingScreen();
    const minimumLoadingTime = new Promise(resolve => setTimeout(resolve, 2500));
    await loadPokemon();
    await Promise.all([waitForImagesToLoad(),minimumLoadingTime]);
    hideLoadingScreen();
}

//currently scans ALL cards, not only newly added ones, maybe change at the end
// maybe change for loop to map
function waitForImagesToLoad(){
    const images = document.querySelectorAll(".card img");
    const promises = [];

    for (const img of images){
        if (img.complete){
            continue;
        }
    const imagePromise = new Promise((resolve) =>{
        img.onload = () => resolve();
        img.onerror = () => resolve();
    });

    promises.push(imagePromise);
    }

    return Promise.all(promises);
}

function disableScroll(){
    document.body.classList.add("no-scroll");
}

function enableScroll(){
    document.body.classList.remove("no-scroll");

}

function checkSearchInput(){
    searchButton.disabled = searchInput.value.trim().length <3;
}

function searchPokemon(){
    const searchTerm = searchInput.value.toLowerCase().trim();
    gallery.innerHTML = "";
    noResultsState(false);

    if (searchTerm === ""){
        renderPokemon(allPokemon);
        return;
    }
    
    const filteredPokemon = allPokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm));

    loadMore.classList.add("d-none");

    if (filteredPokemon.length === 0){
        noResultsState(true);
        return;
    }

    renderPokemon(filteredPokemon);
}


function noResultsState(isActive){
    if(isActive){
        noResults.classList.remove("d-none");
        loadMore.classList.add("d-none");
    } else{
        noResults.classList.add("d-none");
        loadMore.classList.remove("d-none");
    }
}

function openPokemonDialog(pokemon){
    currentPokemon = pokemon;
    const primaryType = pokemon.types[0].type.name;

    pokemonDialog.className = "";
    pokemonDialog.classList.add(`type-${primaryType}`);

    dialogContent.innerHTML = getPokemonDialogTemplate(pokemon);
    pokemonDialog.showModal();
    disableScroll();

    getNavigationListeners();

    renderDialogPage(getAboutTemplate(pokemon));
    setActiveTab(document.getElementById("aboutTab"));

    getDialogContentListeners(pokemon);
}

function showNextPokemon(){
    let index = getCurrentIndex() +1;

    if (index >= currentDisplayedPokemon.length){
        index = 0;
    }

    openPokemonDialog(currentDisplayedPokemon[index]);
}

function showPreviousPokemon(){
    let index = getCurrentIndex() -1;

    if (index < 0){
        index = currentDisplayedPokemon.length -1;
    }

    openPokemonDialog(currentDisplayedPokemon[index]);
}

function renderDialogPage(content){
    document.getElementById("dialogContentPage").innerHTML = content;
}

function setActiveTab(activeButton){
    document.getElementById("aboutTab").classList.remove("active-tab");
    document.getElementById("statsTab").classList.remove("active-tab");

    activeButton.classList.add("active-tab");
}

function getCurrentIndex(){
    return currentDisplayedPokemon.findIndex(p => p.id === currentPokemon.id);
}