let filas = parseInt(prompt("¿Cuántas líneas queres pegarte? (1-7):"));

for (let i = filas; i >= 1; i--) {
  let linea = "";
  for (let j = 0; j < i; j++) {
    linea += "*";
  }
  console.log(linea);
}