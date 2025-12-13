class Producto {

    constructor(nombre, precio, stock) {

        this.nombre = nombre

        this.precio = parseFloat(precio)

        this.stock = parseInt(stock)

    }

    calcularPrecioFinal(cantidadPedida) {


        let cantidadPedida = number

        if (cantidadPedida > this.stock) 
        {

            return `Error: Stock insuficiente. Solo quedan ${this.stock} unidades.`

        } else 
        {

            let precioBase = this.precio * cantidadPedida

        }else if (cantidadPedida >= 0)
        {

            precioFinal = precioBase * 10 / 100

            console.log(precioFinal)

        }

    }
}



