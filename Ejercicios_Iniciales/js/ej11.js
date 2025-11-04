// 1) Crear array con siete productos
const listaDeCompras = [
    'leche',
    'pan',
    'huevos',
    'manzanas',
    'arroz',
    'aceite',
    'azúcar'
];

// 2) Mostrar cada elemento en la consola
console.log('Lista inicial:');
listaDeCompras.forEach((producto, indice) => {
    console.log(`${indice}: ${producto}`);
});

// 3) Agregar un elemento al final (push)
listaDeCompras.push('yogur');
console.log('\nDespués de push:');
listaDeCompras.forEach((producto, indice) => {
    console.log(`${indice}: ${producto}`);
});

// 4) Reemplazar el producto en el índice 2
listaDeCompras[2] = 'queso';
console.log('\nDespués de reemplazar el índice 2:');
listaDeCompras.forEach((producto, indice) => {
    console.log(`${indice}: ${producto}`);
});