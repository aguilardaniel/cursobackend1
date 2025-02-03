import express from "express"
import {engine} from "express-handlebars"
import { ProductManagerMongo as ProductManager} from "./dao/productmanagermongo.js"
import {Server} from "socket.io"
import { conectaDB } from './ConnDB.js';

//import { initSocket } from "./socket.js";
//import { getIO } from "./socket.js";

let serverSockets




//quitar si la pongo en routes
import { procesaErrores } from "./utils.js";
import {router as productsRouter} from "./routes/products.router.js"
import {router as cartsRouter} from "./routes/carts.router.js"
import {router as vistasRouter} from "./routes/vistasRouter.js"



const PORT = 8080
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")


app.use("/", vistasRouter)
app.use("/api/products", 
        (req, res, next)=>{
            req.socket=serverSockets
            next()
        },
        productsRouter)
app.use("/api/carts", cartsRouter)

// const productManager = new ProductManager();



console.log("Prueba con todos los Datos");
//productManager.addProduct("Martillo","Herramienta", "5000","martillo.png", "A0001","15");
//productManager.addProduct("Tornillo","Pieza", "30","tornillo.png", "A0002","3000000");

//await productManager.addProduct("Tornillo3","Pieza", "30","tornillo3.png", "A0004","3000000");
//await productManager.addProduct("Martillo","Herramienta", "5000","martillo.png", "A0001","15");

//await productManager.getProductById(2);



const ServerHTTP= app.listen(PORT,()=>{

    //Server HTTP
    console.log(`Server online en puerto: ${PORT}`)

})

app.get("/", (req, res)=>{

    res.setHeader('Content-Type','text/plain');ecommerce
    res.status(200).send('Bienvenido al server');
    
})

//Server Socket.io
//export const io= new Server(ServerHTTP)

//Inicializo el Socket.io y obtengo la instancia creada
//ambas funciones están en socket.js
//initSocket(ServerHTTP);
//const io = getIO();


serverSockets=new Server(ServerHTTP)

conectaDB(
    "mongodb+srv://agdaniel89:CoderHouse@cluster0.5qo4y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    "ecommerce"
)

   

/* 
io.on("connection", (socket)=>{
    console.log(`Se conectó el cliente ${socket.id}`)
}) */