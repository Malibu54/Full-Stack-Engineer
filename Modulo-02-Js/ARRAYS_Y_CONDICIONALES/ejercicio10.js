let entrada = prompt("Ingresar palabras separadas por comas: ");

let palabras = entrada.split(",");

let palindromas = [];

for (let i = 0; i < palabras.length; i++){
    let palabra = palabras [i].trim();
    let alreves = palabra.split("").reverse().join("");
    if(palabra.toLocaleLowerCase()===alreves.toLocaleLowerCase()){
        palindromas.push(palabra);
    }
}

console.log("Palabras palindromas encontradas: ")
console.log(palindromas);