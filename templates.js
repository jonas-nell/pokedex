function getPokemonCardTemplate(pokemon, primaryType, index) {
    const card = document.createElement("div");

    card.classList.add("card");
    card.classList.add(`type-${primaryType}`);
    card.dataset.id = "card";
    card.addEventListener("click", () => openPokemonDialog(index));

    card.innerHTML = /*html*/ `
            <div class="card-top">
                <h2>${pokemon.name}</h2>
                <p>#${pokemon.id}</p>
            </div>
            <img data-id = "card-image" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
            <div class= "card-bottom">${getTypeBadges(pokemon.types)}</div>
    `;

    return card;
}

function getPokemonDialogTemplate(pokemon) {
    return /*html*/ `
        <h2>${pokemon.name}</h2>
        <p>#${pokemon.id}</p>
        <img data-id = "dialog-image" class = dialog-image src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
        <div class="dialog-tabs">
            <button id="aboutTab">About</button>
            <button id="statsTab">Stats</button>
        </div>
        <div id="dialogContentPage">

        </div>
        <div class="bottom-dialog">
            <button data-id = "prev-button" id="previous"><img src="./assets/icons/arrow-right.png" alt=""></button>
            <button data-id = "next-button" id="next"><img src="./assets/icons/arrow-right.png" alt=""></button>
        </div>
    `;
}

function getAboutTemplate(pokemon) {
    return /*html*/ `
        <span>Height: ${pokemon.height}</span>
        <span>Weight: ${pokemon.weight}</span>
        <span>Abilities: ${pokemon.abilities.map(a => a.ability.name).join(", ")}</span>
        <span class="dialog-types">${getTypeBadges(pokemon.types)}</span>
    `;
}

function getStatsTemplate(pokemon) {
    let statsHtml = "";

    for (const stat of pokemon.stats) {
        statsHtml += /*html*/ `
            <span>${stat.stat.name}: ${stat.base_stat}</span>
        `;
    }
    return statsHtml;
}
