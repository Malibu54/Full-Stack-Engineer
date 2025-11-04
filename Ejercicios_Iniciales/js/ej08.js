
let precioUSD = parseFloat(prompt("Ingresar precio en dolares: "));

const precioPesos = precioUSD * 1530;
const precioConIVA = precioPesos * 1.21;
const precioFinal = precioConIVA * 1.30;

alert(`El precio final es ${precioFinal}`)