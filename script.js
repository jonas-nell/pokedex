const allPokemon = [];

let offset = 0;
const loadCount = 25;

const gallery = document.getElementById("gallery");

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
    await loadPokemon();
}

function renderPokemon(pokemonArray) {
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
