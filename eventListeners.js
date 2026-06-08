const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

searchInput.addEventListener("input", checkSearchInput);

searchButton.addEventListener("click", searchPokemon);

searchInput.addEventListener("input", handleSearchInput);

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && searchInput.value.trim().length >= 3){
        searchPokemon();
    }
});

loadMore.addEventListener("click", loadMorePokemon);