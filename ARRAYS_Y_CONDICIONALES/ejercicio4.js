
let numeros = [23, 45, 12, 67, 34, 89, 21];

let maximo = numeros[0]; 

for (let i = 0; i < numeros.length; i++) {
    

    if (numeros[i] > maximo) {

        maximo = numeros[i];
    }
}
console.log("El número más grande es: " + maximo);

