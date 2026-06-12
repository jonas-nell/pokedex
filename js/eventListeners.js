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
        loadMore.classList.remove("d-none");
        renderPokemon(allPokemon);
    }
});

const closeDialog = document.getElementById("closeDialog");

closeDialog.addEventListener("click", () => {
    pokemonDialog.close();
    enableScroll();
});

pokemonDialog.addEventListener("click", (event) => {
    if (event.target === pokemonDialog) {
        pokemonDialog.close();
        enableScroll();
    }
});

function getNavigationListeners(){
    document.getElementById("next").addEventListener("click", showNextPokemon);
    document.getElementById("previous").addEventListener("click", showPreviousPokemon);
}

function getDialogContentListeners(pokemon){
        document.getElementById("aboutTab").addEventListener("click", () => {
        renderDialogPage(getAboutTemplate(pokemon));
        setActiveTab(document.getElementById("aboutTab"));
    });

    document.getElementById("statsTab").addEventListener("click", () => {
        renderDialogPage(getStatsTemplate(pokemon));
        setActiveTab(document.getElementById("statsTab"));
    });
}