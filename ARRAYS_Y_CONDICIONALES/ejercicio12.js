
let numeroSecreto = Math.floor(Math.random()*10)+1;

let intento;
let encontrado = false;

while (!encontrado){
    intento=parseInt(prompt("Adivina el numero entre el 1 y el 10: "));
    if (intento === numeroSecreto){
        alert("Adivinaste el numero! ")
        encontrado = true;
    }else if (intento > numeroSecreto){
        alert("El numero es mas chico, intenta de vuelta");
    }else if (intento <numeroSecreto){
        alert("El numero es mas grande. intenta de vuelta ")
    }
}