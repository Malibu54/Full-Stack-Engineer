// no tiene que ser perfecto
// esta bien si no se o me equivoco
// solo tiene que existir

/**Crea un programa que use un bucle para generar un triángulo de asteriscos con la siguiente forma, donde el número de filas lo elija el usuario:
 * 
 * Inicio

  Leer n   // número de filas elegido por el usuario

  Para i desde n hasta 1 hacer
      Imprimir "*" repetido i veces
  Fin Para

Fin
 */


let filas = "*";

switch (filas) {
  case '*':
    console.log("*");
    break;
  case '**':
    console.log("**");
    break;
  case '***': 
    console.log("***");
    break;
  case '****':
    console.log("****");
    break;
  case '*****':
    console.log("*****");
    break;
  case '******':
    console.log("******");
    break;
  case '*******':
    console.log("*******");
    break;
  default: 
    console.log("Fila no válida o no registrada.");
}

