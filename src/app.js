import express from "express"
import {ProductManager} from "./dao/productmanager.js"
//quitar si la pongo en routes
import { procesaErrores } from "./utils.js";
import {router as productsRouter} from "./routes/products.router.js"
import {router as cartsRouter} from "./routes/carts.router.js"

const PORT = 8080
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

// const productManager = new ProductManager();



console.log("Prueba con todos los Datos");
//productManager.addProduct("Martillo","Herramienta", "5000","martillo.png", "A0001","15");
//productManager.addProduct("Tornillo","Pieza", "30","tornillo.png", "A0002","3000000");

//await productManager.addProduct("Tornillo3","Pieza", "30","tornillo3.png", "A0004","3000000");
//await productManager.addProduct("Martillo","Herramienta", "5000","martillo.png", "A0001","15");

//await productManager.getProductById(2);



app.listen(PORT,()=>{

    console.log(`Server online en puerto: ${PORT}`)

})



app.get("/", (req, res)=>{

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('Bienvenido al server');
    
})