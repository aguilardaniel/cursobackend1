import {Router} from "express"
import { CartManagerMongo as CartManager } from "../dao/cartmanagermongo.js";
import { procesaErrores } from "../utils.js";
import { ProductManagerMongo as ProductManager} from "../dao/productmanagermongo.js";
import { isValidObjectId } from 'mongoose';
import mongoose from "mongoose"; 


export const router=Router()


const cartManager = new CartManager();
const productManager = new ProductManager();

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
            /*
            cid=Number(cid)
            if(isNaN(cid)){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`Se requiere un id numérico`})
            }
        */

            if(!isValidObjectId(cid)){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`Se requiere un id de mongodb válido`})
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
        
  
        router.post("/:cid/product/:pid", async(req, res)=>{
            //app.post("/", async(req, res)=>{
            
                let {cid, pid} =req.params

                if(!isValidObjectId(cid)){
                    res.setHeader('Content-Type','application/json');
                    return res.status(400).json({error:`El id de carrito debe ser un id de mongodb válido`})
                }

                if(!isValidObjectId(pid)){
                    res.setHeader('Content-Type','application/json');
                    return res.status(400).json({error:`El id delproducto debe ser un id de mongodb válido`})
                }
                /*
                cid=Number(cid)
                if(isNaN(cid)){
                    res.setHeader('Content-Type','application/json');
                    return res.status(400).json({error:`El id de carrito debe ser numérico`})
                }
                */
                
                
                /*
                pid=Number(pid)
                if(isNaN(pid)){
                    res.setHeader('Content-Type','application/json');
                    return res.status(400).json({error:`El id delproducto debe ser numérico`})
                }
                */

                try {
                    // verificar tipo de datos acá también??
                    let carrito=await cartManager.getCartById(cid)
                    let producto= await productManager.getProductById(pid)

                    if(!carrito || !producto){
                        res.setHeader('Content-Type','application/json');
                        return res.status(400).json({error:`Error con el carrito o el producto`})
                    }

                    //let pidObjectId = new mongoose.Types.ObjectId(pid).toString();
                    //console.log(pidObjectId)
                    //let posicionDeProductoEnCarrito=carrito.products.findIndex(p=>p.product._id.toString() == pidObjectId)
            
            
                    let posicionDeProductoEnCarrito=carrito.products.findIndex(p=>p.product._id == pid)
                    
                    //let posicionDeProductoEnCarrito=carrito.products.findIndex(p=>p.product==pid)
                        if(posicionDeProductoEnCarrito==-1){
                            carrito.products.push({
                                product: pid,
                                quantity: 1
                            })
                        }else{
                            carrito.products[posicionDeProductoEnCarrito].quantity++
                    }
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
                    
             




                    let carritoModificado=await cartManager.modifyCart(cid, carrito)
                    
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


                   
        
            
            // resto validaciones pertinentes...
            try {
           /*

                //corrobora que cada producto agregado tenga un id válido
             carrito.products.forEach(async(elemento) => {

                let idDelProducto= String(elemento.product)
                console.log(idDelProducto)

        
                if(!isValidObjectId(idDelProducto)){
                    res.setHeader('Content-Type','application/json');
                    return res.status(400).json({error:`Los id de los productos deben ser ids de mongodb válidos`})
                }


                let producto= await productManager.getProductById(idDelProducto)
                console.log(producto)

                if(!producto){
                    res.setHeader('Content-Type','application/json');
                    return res.status(400).json({error:`El id de alguno de los productos no existe`})
                }

            });
*/
        
                let nuevoCarrito=await cartManager.addCart(carrito)   // ... son aquí op. spread
                
                res.setHeader('Content-Type','application/json');
                return res.status(201).json({payload:`Carrito Agregado`, nuevoCarrito});
            } catch (error) {
                procesaErrores(res, error)
            }
        
        })



    router.delete("/:cid", async(req, res)=>{
            //app.delete("/:id", async(req, res)=>{
            
                let {cid} =req.params
                if(!isValidObjectId(cid)){
                    res.setHeader('Content-Type','application/json');
                    return res.status(400).json({error:`El id de carrito debe ser un id de mongodb válido`})
                }
                /*
                pid=Number(pid)
                if(isNaN(pid)){
                    res.setHeader('Content-Type','application/json');
                    return res.status(400).json({error:`El id debe ser numérico`})
                }
            */
        
        
        
                try {
                    // verificar tipo de datos acá también??
                    /*
                    let productoParaBorrar=await productManager.getProductById(pid)
            
                    if(!productoParaBorrar){
                        res.setHeader('Content-Type','application/json');
                        return res.status(400).json({error:`No existe el producto con id ${pid}`})
                        
                    }
            */
                    let carritoBorrado=await cartManager.deleteCart(cid)
                    console.log(carritoBorrado)
        
                    if(!carritoBorrado){
                        res.setHeader('Content-Type','application/json');
                        return res.status(400).json({error:`No existe el carrito con id ${cid}`})
                        
                    }
                    
        
        
                    res.setHeader('Content-Type','application/json');
                    return res.status(200).json({payload:`Se eliminó el carrito con id ${cid}`, carritoBorrado});
                } catch (error) {
                    procesaErrores(res, error)
                }
            
            })

router.put("/:cid", async(req, res)=>{
    //app.put("/:id", async(req, res)=>{
        let {cid} =req.params
       
        if(!isValidObjectId(cid)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Se requiere un id de mongodb válido`})
        }

        
   
        let aModificar=req.body
        
        try {
          
            let carrito=await cartManager.getCartById(cid)
                    //let producto= await productManager.getProductById(pid)

                    if(!carrito){
                        res.setHeader('Content-Type','application/json');
                        return res.status(400).json({error:`Error con el carrito`})
                    }

                    carrito.products={
                       
                        ...aModificar
                        //id: cid
                    }
                
            
                
             




            let carritoModificado=await cartManager.modifyCart(cid, carrito)

            


          
            
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({payload:`Se modifico carrito con id ${cid}`, carritoModificado});

            


            
        
            
        } catch (error) {
            procesaErrores(res, error)
        }

    })


        
    