

let palabra = prompt ("Ingresar una palabra: ");
let contador = 0;

for (let i = 0; i < palabra.length; i++){
    let letra =palabra[i].toLocaleLowerCase();
    if (
        letra === "a" ||
        letra === "e" ||
        letra === "i" ||
        letra === "o" ||
        letra === "u"
    ){
        contador = contador + 1
    }

}

console.log("La palabra tiene " + contador + " vocales");