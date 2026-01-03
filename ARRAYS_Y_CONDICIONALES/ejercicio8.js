let num = parseInt(prompt("Ingresa un número entero positivo: "));
let invertido = 0;

if (num < 0) {
  console.log("El número debe ser positivo");
} else {
  while (num != 0) {
    let digito = num % 10;
    invertido = invertido * 10 + digito;
    num = Math.floor(num / 10);
  }

  console.log("El número invertido es: " + invertido);
}
