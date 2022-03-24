//const express = require('express')
import express from "express"
import cors from "cors"
import { dbConnection } from "../database/config.js"

//importar  rutas
import categorias from "../routes/categoria.js"
import articulos from "../routes/articulo.js"
import clientes from "../routes/cliente.js"
import ingresos from "../routes/ingreso.js"
import proveedores from "../routes/proveedor.js"
import ventas from "../routes/venta.js"
import usuario from "../routes/usuario.js"


class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.middlewares()
        this.conexionDB()
        this.routes()

    }


    routes() {
        this.app.use("/api/categoria", categorias);
        this.app.use("/api/articulo", articulos);
        this.app.use("/api/cliente", clientes)
        this.app.use("/api/ingreso", ingresos)
        this.app.use("/api/proveedor", proveedores)
        this.app.use("/api/venta", ventas)
        this.app.use("/api/usuario", usuario)

    }


    middlewares() {
        this.app.use(cors())
        this.app.use(express.static("public"))
        this.app.use(express.json()) //parseo y lectura del body

    }

    async conexionDB() {
        await dbConnection()
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en ${this.port}`)
        })
    }
}



export { Server }


