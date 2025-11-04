const auto = {
    marca : 'Ferrari',
    modelo : 'F8 Tributo',
    año : 2023,
    color : 'Rojo',
    velocidadMaxima : 340,
    precio : 280000,
    combustible : "Gasolina",
    puertas : 2
};

console.log (auto);

let mensajeDinamico = (`El auto ${auto.marca} es uno de los autos más potentes en el mercado alcanzando una velocidad de  ${auto.velocidadMaxima} por hora!`);

document.writeln(mensajeDinamico);