import {Router} from "express"
import { CartManager } from "../dao/cartmanager.js";
import { procesaErrores } from "../utils.js";



export const router=Router()


const cartManager = new CartManager();

    router.get("/", async(req, res)=>{
    //app.get("/", async(req, res)=>{


        try {
            let carritos=await cartManager.getCarts()
        
            res.setHeader('Content-Type','application/json')
            return res.status(200).json({carritos})
            
        } catch (error) {
            procesaErrores(res, error)
        }
    })



    router.get("/:cid", async(req, res)=>{
        //app.get("/:id", async(req, res)=>{
        
            let {cid} =req.params
            cid=Number(cid)
            if(isNaN(cid)){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`Se requiere un id numérico`})
            }
        
            try {
                let carrito=await cartManager.getCartById(cid)
                if(!carrito){
                    res.setHeader('Content-Type','application/json');
                    return res.status(404).json({error:`No existe un carrito con id ${cid}`})
                }
        
                res.setHeader('Content-Type','application/json');
                return res.status(200).json({carrito});
            } catch (error) {
                procesaErrores(res, error)
            }
        
        })
        
  
        router.post("/:cid/:product/:pid", async(req, res)=>{
            //app.post("/", async(req, res)=>{
            
                let {cid, product, pid} =req.params
                
                cid=Number(cid)
                if(isNaN(cid)){
                    res.setHeader('Content-Type','application/json');
                    return res.status(400).json({error:`El id de carrito debe ser numérico`})
                }

                product=Number(product)
                if(isNaN(product)){
                    res.setHeader('Content-Type','application/json');
                    return res.status(400).json({error:`La cantidad del producto a agregar debe ser numérica`})
                }

                pid=Number(pid)
                if(isNaN(pid)){
                    res.setHeader('Content-Type','application/json');
                    return res.status(400).json({error:`El id delproducto debe ser numérico`})
                }


                try {
                    // verificar tipo de datos acá también??
                    let carrito=await cartManager.getCarts()
            /*
                    if(aModificar.title){
                        let existeTitle=productos.find(p=>p.title.toLowerCase()===aModificar.title.trim().toLowerCase() && p.id!=pid)
                        if(existeTitle){
                            res.setHeader('Content-Type','application/json');
                            return res.status(400).json({error:`Ya existe un producto con title ${aModificar.title}. Tiene id ${existeTitle.id}`})
                        }
                    }
            
                    if(aModificar.code){
                        let existeCode=productos.find(p=>p.code.toLowerCase()===aModificar.code.trim().toLowerCase() && p.id!=pid)
                        if(existeCode){
                            res.setHeader('Content-Type','application/json');
                            return res.status(400).json({error:`Ya existe un producto con code ${aModificar.code}. Tiene id ${existeCode.id}`})
                        }
                    }
            */
            
                    let carritoModificado=await cartManager.modifyCart(cid, product, pid)
                    
                    res.setHeader('Content-Type','application/json');
                    return res.status(200).json({payload:`Se modifico producto con id ${pid}`, carritoModificado});
                } catch (error) {
                    procesaErrores(res, error)
                }

            
            })
            
            

    router.post("/", async(req, res)=>{
        //app.post("/", async(req, res)=>{
        
            let carrito=req.body
        
            if(!carrito){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`Debe ingresar datos al carrito`})
            }
        
         /*
            if(typeof title!=="string" || 
                typeof description!=="string" || 
                typeof code!=="string" || 
                typeof price!=="number" || 
                typeof status!=="boolean" || 
                typeof stock!=="number" || 
                typeof category!=="string")
                {
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`error en los tipos de datos enviados`})
            }
       
            if(thumbnail){
                if(!Array.isArray(stock) || thumbnail.every(item => typeof item == 'string')){
        
                    res.setHeader('Content-Type','application/json');
                    return res.status(400).json({error:`El thumbnail debe ser un array de elementos tipo string`})
                    
                }
            }
            
        */
          
        
            
            // resto validaciones pertinentes...
            try {
        
                
                //validar despúes, no se debe poder repetir ni el nombre ni el código
        /*
                let existeSegunCode=await productManager.getProductByCode(code)
                if(existeSegunCode){
                    res.setHeader('Content-Type','application/json');
                    return res.status(400).json({error:`Ya existe el code= ${code} entre los productos`})
                }
        
                let existeSegunTitle=await productManager.getProductByTitle(title)
                if(existeSegunTitle){
                    res.setHeader('Content-Type','application/json');
                    return res.status(400).json({error:`Ya existe el title= ${title} entre los productos`})
                }
         */   
        
                let nuevoCarrito=await cartManager.addCart(carrito)   // ... son aquí op. spread
                
                res.setHeader('Content-Type','application/json');
                return res.status(201).json({payload:`Carrito Agregado`, nuevoCarrito});
            } catch (error) {
                procesaErrores(res, error)
            }
        
        })


        
    