
const agregar = document.getElementById("agregar");
const limpiar = document.getElementById("limpiar");
const nuevoItem = document.getElementById("item");
const contenedor = document.getElementById("contenedor");


agregar.addEventListener("click", (evt) => {
    // Si tenemos texto ingresado en el input, lo guardamos en el localStorage
    for (let i = 0);
    if (nuevoItem.value) localStorage.setItem("text", nuevoItem.value);  
});
 