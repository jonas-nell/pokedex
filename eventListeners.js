const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

searchInput.addEventListener("input", checkSearchInput);

searchButton.addEventListener("click", searchPokemon);


searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && searchInput.value.trim().length >= 3){
        searchPokemon();
    }
});

loadMore.addEventListener("click", loadMorePokemon);

searchInput.addEventListener("input", () => {
    checkSearchInput();
    const searchTerm = searchInput.value.trim();

    if (searchTerm === "") {
        noResultsState(false);
        gallery.innerHTML = "";
        renderPokemon(allPokemon);
    }
});

const closeDialog = document.getElementById("closeDialog");

closeDialog.addEventListener("click", () => {
    pokemonDialog.close();
});

