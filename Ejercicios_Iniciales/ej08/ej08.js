/*

Problema:
Calcular el IVA de un producto
Solicita al usuario el precio de un producto en dolares y su precio final a pesos (1dolar = $1530), además tenemos que sumarle el IVA (21%) y además le vamos a sumar la ganancia de la tienda que es un 30%. Muestra el precio total en un alert.

Algoritmo en pseudocódigo
1. SOLICITAR precio en dólares al usuario
2. LEER y ALMACENAR en variable "precioUSD"
3. CALCULAR precioPesos = precioUSD * 1530
4. CALCULAR precioConIVA = precioPesos * 1.21
5. CALCULAR precioFinal = precioConIVA * 1.30
6. MOSTRAR precioFinal en alert
*/

let precioUSD = parseFloat(prompt("Ingresar precio en dolares: "));

const precioPesos = precioUSD * 1530;
const precioConIVA = precioPesos * 1.21;
const precioFinal = precioConIVA * 1.30;

alert(`El precio final es ${precioFinal}`)