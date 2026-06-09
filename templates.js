function getPokemonCardTemplate(pokemon, primaryType, index){
    const card = document.createElement("div");

    card.classList.add("card");
    card.classList.add(`type-${primaryType}`);
    card.addEventListener("click", () => openPokemonDialog(index));

    card.innerHTML = /*html*/`
            <div class="card-top">
                <h2>${pokemon.name}</h2>
                <p>#${pokemon.id}</p>
            </div>
            <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
            <div class= "card-bottom">${getTypeBadges(pokemon.types)}</div>
    `;

    return card;
}

function getPokemonDialogTemplate(pokemon){
    return /*html*/`
        <h2>${pokemon.name}</h2>
        <p>#${pokemon.id}</p>
        <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
        <div class="stats">

        </div>
        <div class="bottom-dialog">
            <button id="previous"><img src="./assets/icons/arrow-right.png" alt=""></button>
            <button id="next"><img src="./assets/icons/arrow-right.png" alt=""></button>
        </div>
    `;
}