import {Router} from "express"
import { ProductManager } from "../dao/productmanager.js"
import { procesaErrores } from "../utils.js";



export const router=Router()
const productManager = new ProductManager();

router.get('/',async(req,res)=>{
   
        let productos=await productManager.getProducts()

    res.render("home",{
        //los parametros que quiero enviar, en este caso todavia nada
        productos

    })

})


router.get('/realtimeproducts',async(req,res)=>{
   
    let productos=await productManager.getProducts()

res.render("realTimeProducts",{
    //los parametros que quiero enviar, en este caso todavia nada
    productos

})

})