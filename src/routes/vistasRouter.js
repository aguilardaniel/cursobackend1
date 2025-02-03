import {Router} from "express"
import { ProductManagerMongo as ProductManager} from "../dao/productmanagermongo.js"
import { procesaErrores } from "../utils.js";



export const router=Router()
const productManager = new ProductManager();

router.get('/products',async(req,res)=>{

    let {page,limit,sort,query}=req.query
    if(!page){
        page=1
    }
    if(!limit){
        limit=10
    }
    if (sort === 'asc') {
        sort = { price: 1 };  // Orden ascendente por precio
      } else if (sort === 'desc') {
        sort = { price: -1 }; // Orden descendente por precio
      }

    
    let {docs: productos, totalPages, hasPrevPage, prevPage, hasNextPage, nextPage}=await productManager.getProducts(page, sort, limit, query)//console.log(productos)

    res.render("home",{
        //los parametros que quiero enviar, en este caso todavia nada
        productos,
        totalPages, hasPrevPage, prevPage, hasNextPage, nextPage
        /*
        ,
        

            totalPages, 
            hasPrevPage, 
            prevPage, 
            hasNextPage, 
            nextPage
        */

    })

})


router.get('/realtimeproducts',async(req,res)=>{

    let {page,limit,sort,query}=req.query
    if(!page){
        page=1
    }
    if(!limit){
        limit=10
    }
    if (sort === 'asc') {
        sort = { price: 1 };  // Orden ascendente por precio
      } else if (sort === 'desc') {
        sort = { price: -1 }; // Orden descendente por precio
      }

    
    let {docs: productos, totalPages, hasPrevPage, prevPage, hasNextPage, nextPage}=await productManager.getProducts(page, sort, limit, query)
    //console.log(productos)
    
    //let productos=await productManager.getProducts()

res.render("realTimeProducts",{
    //los parametros que quiero enviar, en este caso todavia nada
    productos,
    totalPages, hasPrevPage, prevPage, hasNextPage, nextPage

})

})