const buscar = document.getElementById("btnBuscar");
const campo_texto = document.getElementById("inputBuscar");
const contenedor = document.getElementById("contenedor");

const URL = 'https://images-api.nasa.gov/search?q=';

let getJSONData = function(url){
    let result = {};
   
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
         
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
       
        return result;
    });
}


//para armar las cartita
const getCardHTML = (img) => {
    return `<div class="card">
    <img href="${img}" />
</div>`;
}



buscar.addEventListener('click', () => {
    contenedor.innerHTML = '';
    getJSONData(URL + campo_texto.value).then(function(resultado){
        if(resultado.status == 'ok'){
            for(let item of resultado.data.collection.items){
                contenedor.innerHTML += getCardHTML(item.links[0].href)

            }
        }
    });
    
});