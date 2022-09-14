const buscar = document.getElementById("btnBuscar");
const campo_texto = document.getElementById("inputBuscar");
const contenedor = document.getElementById("contenedor");

const URL = 'https://images-api.nasa.gov/search?q=';



let getJSONData = function (url) {
    let result = {};

    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function (response) {
            result.status = 'ok';
            result.data = response;

            return result;
        })
        .catch(function (error) {
            result.status = 'error';
            result.data = error;

            return result;
        });
}


//para armar las cartita
const getCardHTML = (img, titulo, descripcion, fecha) => {
    return `<div class="col">
                <div class="card h-100" >
                    <img src="${img}" class="card-img-top" alt="${titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${titulo}</h5>
                        <p class="card-text" >${descripcion}</p>
                    </div>
                </div>
            </div>`
}

/*const getCardHTML = (img, titulo, descripcion, fecha) => {
    return `<div class="card" style="width: 18rem;">
    <img src="${img}" class="card-img-top" alt="${titulo}">
    <div class="card-body">
      <h5 class="card-title">${titulo}</h5>
      <p class="card-text">${descripcion}</p>
      <address>${fecha}</address>
    </div>
  </div>`
}*/



buscar.addEventListener('click', () => {
    contenedor.innerHTML = '';
    getJSONData(URL + campo_texto.value)
        .then(function (resultado) {
            let array_nasa = resultado.data.collection.items;
            if (resultado.status == 'ok') {
                for (let item of array_nasa) {
                    const {links:[{href}], data:[{title,description,date_created}]} = item; //para desestructurar el objeto items
                    contenedor.innerHTML += getCardHTML(href, title, description, date_created); //llamo directamente con los nombres que defini arriba

                }
            }
    });

});