/*
Problema:
Solicita al usuario que ingrese dos números e ingrese un símbolo de una operación (+, -, *, /) usando prompt. Muestra el resultado de la operación en un alert. 🔴
Tip: Condicionales if elseif, o switch

Algoritmo en pseudocodigo:
1. SOLICITAR primer número
2. SOLICITAR segundo número
3. SOLICITAR operación (+, -, *, /)
4. EVALUAR operación:
   SI operación = "+" ENTONCES resultado = num1 + num2
   SI operación = "-" ENTONCES resultado = num1 - num2
   SI operación = "*" ENTONCES resultado = num1 * num2
   SI operación = "/" ENTONCES resultado = num1 / num2
   SI NO, mostrar error
5. MOSTRAR resultado
*/

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