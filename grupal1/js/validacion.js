function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

const validar = document.getElementById("regBtn"); //referencio boton



validar.addEventListener("click", () => {    
    let campos_form = document.getElementsByClassName("form-control"); //array de elementos html (campos de textos)
    let pass1 = document.getElementById("password1"); //referencio a pass 1
    let pass2 = document.getElementById("password2");//referencio a pass 2
    let terminos = document.getElementById("terminos"); //referencio al checkbox

    //booleanos para marcar errores
    let err_vacio = false; 
    let err_largo = false;
    let err_pass_rep = false;
    let err_terminos = false;


    //validar campos vacios
   for(let campo of campos_form){
       if(campo.value.length === 0){
           err_vacio = true;
       }       
   }
   //validar largo
   if(pass1.value.length < 6){
        err_largo = true;
   }
   //validar repetir contra
   if(pass1.value != pass2.value){
        err_pass_rep = true;
   }
   //valid terminos
   if(!terminos.checked){
    err_terminos = true;
   }

    if(err_largo || err_vacio || err_pass_rep || err_terminos){
        showAlertError();
    }
    else {
        showAlertSuccess();
    }


});

