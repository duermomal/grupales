const getCardHTML = (img, title) => {
    return `<div class="card">
    <img src="${URL_IMAGES}${img}" />
    <h3>${title}</h3>
    <a href="${API_URL_SEARCH}${encodeURIComponent(title)}" target="_blank">Ver Más</a>
</div>`;
}

const showMovies = (array) => {
    // ## INICIO BLOQUE 3 ##
    debugger;
    const container = document.getElementById("container");
    container.innerHTML = "";
    for (let movie of array) {
        container.innerHTML += getCardHTML(movie.poster_path, movie.title)
    }
    // ## FIN BLOQUE 3 ##
}

const submitSearchEvent = async (e) => {
    // ## INICIO BLOQUE 2 ##
    debugger;
    e.preventDefault();
    const response = await getMovies(document.getElementById("txtSearch").value);
    if (response.status === "ok") {
        showMovies(response.data.results);
    } else {
        alert("OCURRIÓ UN ERROR");
    }
    // ## FIN BLOQUE 2 ##
}


window.addEventListener("load", () => {
    // ## INICIO BLOQUE 1 ##
    debugger;
    const formSearch = document.getElementById("formSearch");
    formSearch.addEventListener("submit", submitSearchEvent);
    // ## FIN BLOQUE 1 ##
});
