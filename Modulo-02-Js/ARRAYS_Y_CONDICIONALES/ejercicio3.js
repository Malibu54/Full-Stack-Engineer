let numero = Number(prompt("Introduce un número del 1 al 100:"));

for (let i = 1; i <= 100; i++) {
    let resultado = i * numero;
    if (resultado > 1000) {
        break;
    }
    console.log(numero + " x " + i + " = " + resultado);
}