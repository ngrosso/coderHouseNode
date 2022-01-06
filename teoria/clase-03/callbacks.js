const operacion = (num1,num2,operar) => operar(num1,num2);

const suma = (a,b) => a+b;
const resta = (a,b) => a-b;
const multiplicacion = (a,b) => a*b;
const division = (a,b) => a/b;


console.log(operacion(5,2,suma));