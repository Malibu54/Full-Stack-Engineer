let acumulado = 0;

while (acumulado <= 100) {
  let numero = parseInt(prompt("Ingresa un número entero: "));
  acumulado += numero;
}

console.log("Total acumulado: " + acumulado);
