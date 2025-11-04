
let num1 = parseFloat(prompt("Ingresar primer numero: "));
let num2 = parseFloat(prompt("Ingresar segundo numero: "));
let operador = prompt("Ingresar operador (+, -, *, /): ");

let resultado;

if (operador === "+"){
    resultado = num1 + num2
}else if (operador === "-"){
    resultado = num1 - num2
}else if (operador === "*"){
    resultado = num1 * num2
}else if (operador === "/"){
    resultado = num1 / num2
}else{
   alert("Operacion no reconocida, intente de nuevo")
   resultado = null
}

if (resultado !== null){
    alert(`${num1} ${operador} ${num2} = ${resultado}`)
}