function getPokemonCardTemplate(pokemon, primaryType){
    const card = document.createElement("div");

    card.classList.add("card");
    card.classList.add(`type-${primaryType}`);

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