let minutos = prompt ("Ingrese los minutos");

const segundos = parseFloat(minutos)*60
const horas = minutos / 60

console.log (`Tenemos ${horas} horas y ${segundos} segundos`)