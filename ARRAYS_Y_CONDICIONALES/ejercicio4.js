
let numeros = [23, 45, 12, 67, 34, 89, 21];

let maximo = numeros[0]; 

for (let i = 0; i < numeros.length; i++) {
    
    // 3. Si el número que estoy viendo es mayor al que tengo guardado...
    if (numeros[i] > maximo) {
        // ...lo reemplazo
        maximo = numeros[i];
    }
}
console.log("El número más grande es: " + maximo);

