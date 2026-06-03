function getPokemonCardTemplate(pokemon){
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = /*html*/`
            <h2>${pokemon.name}</h2>
            <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
            <p>#${pokemon.id}</p>
            ${getTypeBadges(pokemon.types)}    
    `;

    return card;
}