const URL = 'https://japceibal.github.io/japflix_api/movies-data.json';

const btn_buscar = document.getElementById("btnBuscar");
const input_buscar = document.getElementById("inputBuscar");
const lista_pelis = document.getElementById("lista");

const span_title = document.getElementById("span_title");
const span_overview = document.getElementById("span_overview");
const span_genres = document.getElementById("span_genres");
const span_dropdown = document.getElementById("span_dropdown");

let arrayPelisAux = [];

const getJSONData = async (url) => {
    const result = {};
   
    try {
        const response = await fetch(url);
        if (response.ok) {
            result.data = await response.json();
            result.status = "ok";

        } else {
            throw Error(response.statusText);
        }
    }
    catch (error) {
        result.status = 'error';
        result.data = error;
   
    }
    return result;
  };


function filtrarPelis(keyWord){
  
   let arrayPelisFiltrado = JSON.parse(localStorage.getItem("pelis")).filter(
       ({title, overview, tagline, genres}) => 
            title.toLowerCase().includes(keyWord.toLowerCase()) ||
            overview.toLowerCase().includes(keyWord.toLowerCase()) ||
            tagline.toLowerCase().includes(keyWord.toLowerCase()) ||
            genres.some(({ name }) => name.toLowerCase().includes(keyWord.toLowerCase()))
        ) 

    return arrayPelisFiltrado;
   
};

let ponerEstrellas = function (score) {
    let estrellas_html = '';
    for(let i = 1; i <= score; i++){
        estrellas_html += `<span class="fa fa-star checked"></span>`
    }
    for(let j = score+1; j <= 5; j++){
        estrellas_html += `<span class="fa fa-star"></span>`
    }
    return estrellas_html;
};



function mostrarPelis(filteredArray){

    let htmlPaAgregar = '';
    for(let peli of filteredArray){
        htmlPaAgregar += `<li onclick = "spanPeli(${peli.id})" class="list-group-item comments-list" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
                             <p id = "com_head" class = "comments-list-head"><b>${peli.title}</b> -  ${ponerEstrellas(Math.floor(peli.vote_average/2))}</p>
                             <p class = "comments-list-data">${peli.tagline}</p>    
                          </li>`;
    }

    lista_pelis.innerHTML = htmlPaAgregar;

};



function spanPeli(peliID) {

   let peliEncontrada = JSON.parse(localStorage.getItem("pelis")).find(pelicula => pelicula.id == peliID);

   console.log(peliEncontrada);


   span_title.innerHTML = peliEncontrada.title + " : " + peliEncontrada.tagline;
   span_overview.innerHTML = peliEncontrada.overview;
   let generosTxt = "";
   for(let i = 0; i <= peliEncontrada.genres.length-2; i++){
        console.log(peliEncontrada.genres[i].name);
        generosTxt += peliEncontrada.genres[i].name + " - ";
   }
   generosTxt += peliEncontrada.genres[peliEncontrada.genres.length-1].name;

   span_genres.innerHTML = generosTxt;

   span_dropdown.innerHTML = `
                                    <li><a class="dropdown-item">Year: ${peliEncontrada.release_date.substr(0,4)}</a></li>
                                    <li><a class="dropdown-item" >Runtime: ${peliEncontrada.runtime} mins</a></li>
                                    <li><a class="dropdown-item" >Budget: $${peliEncontrada.budget}</a></li>
                                    <li><a class="dropdown-item" >Revenue: $${peliEncontrada.revenue}</a></li>
                             `
};



btn_buscar.addEventListener("click", () => {    
    if(input_buscar.value) {
        arrayPelisAux = [];
        arrayPelisAux = filtrarPelis(input_buscar.value);
        mostrarPelis(arrayPelisAux);
    }
});


document.addEventListener("DOMContentLoaded", () => {
    getJSONData(URL).then(function (arrayComentariosJSON) {
        localStorage.setItem("pelis", JSON.stringify(arrayComentariosJSON.data));
    })   
});



