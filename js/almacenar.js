
const agregar = document.getElementById("agregar");
const limpiar = document.getElementById("limpiar");
const nuevoItem = document.getElementById("item");
const contenedor = document.getElementById("contenedor");
let items = [];



agregar.addEventListener("click", (evt) => { 
    // Si tenemos texto ingresado en el input, lo guardamos en el localStorage
    if (nuevoItem.value) {
       if(localStorage.getItem('texto')){
            items = JSON.parse(localStorage.getItem('texto'));
       }
    items.push(nuevoItem.value);
    
        
    } 
});
