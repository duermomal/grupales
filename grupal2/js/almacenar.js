
const agregar = document.getElementById("agregar");
const limpiar = document.getElementById("limpiar");
const nuevoItem = document.getElementById("item");
const contenedor = document.getElementById("contenedor");
let items = [];



document.addEventListener("DOMContentLoaded", () => { //este evento se lanza al cargar la pagina, se usa para dejar cargado el contenedor con los item actuales del storage (si hay)
    if(localStorage.getItem('texto')){      //chequeamos si hay algun valor en el localStorage
        items = JSON.parse(localStorage.getItem('texto'));      //si hay algo, obtenemos el arreglo en formato string y lo parseamos (convertimos a formato array con JSON.parse())
        for(let textos of items){     //se recorre el arreglo de items
            contenedor.innerHTML += `<li>${textos}</li>`; //agrega los items en listas 
        }
    }
});

agregar.addEventListener("click", () => {  //este evento se dispara al darle click al boton agregar
    if (nuevoItem.value) {//si hay texto en el input, chequeamos si hay algo en el localStorage
       if(localStorage.getItem('texto')){
            items = JSON.parse(localStorage.getItem('texto')); //si hay algo, obtenemos el arreglo en formato string y lo parseamos (convertimos a formato array)
       }
       contenedor.innerHTML += `<li>${nuevoItem.value}</li>`;       
       items.push(nuevoItem.value);                   //agregamos el valor al arreglo auxiliar de items
       localStorage.setItem("texto",JSON.stringify(items)); //transformamos el array en string y lo guardamos en el localStorage con la clave 'texto' 
    } 
});

limpiar.addEventListener("click", () => { //este evento se dispara al limpiar
    items = []; // limpiamos el array (el bug que teniamos)
    localStorage.clear();  //borramos el item por la clave 'texto'
    contenedor.innerHTML = "";  //vaciamos el contenedor <li>
});


