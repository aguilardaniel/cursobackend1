import {Router} from "express"
import { ProductManagerMongo as ProductManager} from "../dao/productmanagermongo.js";
import { procesaErrores } from "../utils.js";
import { isValidObjectId } from 'mongoose';


const prueba="texto de prueba"




export const router=Router()

const productManager = new ProductManager();

    router.get("/", async(req, res)=>{
    //app.get("/", async(req, res)=>{


        try {
            let productos=await productManager.getProducts()
        
            res.setHeader('Content-Type','application/json')
            return res.status(200).json({productos})
            
        } catch (error) {
            procesaErrores(res, error)
        }
    })
    
    router.get("/:pid", async(req, res)=>{
    //app.get("/:id", async(req, res)=>{
    
        let {pid} =req.params
        /*
        pid=Number(pid)
        if(isNaN(pid)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Se requiere un id numérico`})
        }
    */

        if(!isValidObjectId(pid)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Se requiere un id de mongodb válido`})
        }

        
        try {
            let productos=await productManager.getProductById(pid)
            if(!productos){
                res.setHeader('Content-Type','application/json');
                return res.status(404).json({error:`No existe un producto con id ${pid}`})
            }
    
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({productos});
        } catch (error) {
            procesaErrores(res, error)
        }
    
    })
    
    
    router.post("/", async(req, res)=>{
    //app.post("/", async(req, res)=>{
    
        let {title, description,code, price, status=true, stock, category, thumbnail}=req.body
    
        if(!title || !description || !code || !price || !stock || !category ){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Debe ingresar todos los datos requeridos`})
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
    
            let nuevoProducto=await productManager.addProduct(title, description,code, price, status, stock, category, thumbnail)   // ... son aquí op. spread
           

           // socket.on("nuevoProducto", (producto) => {
                // Emitir a todos los clientes que un nuevo producto ha sido añadido
                //console.log(".......")
                let productos=await productManager.getProducts()
                req.socket.emit("actualizarProductos", productos)
                


            res.setHeader('Content-Type','application/json');
            return res.status(201).json({payload:`Producto Creado!`, nuevoProducto});
        } catch (error) {
            procesaErrores(res, error)
        }
    
    })
    
    router.put("/:pid", async(req, res)=>{
    //app.put("/:id", async(req, res)=>{
        let {pid} =req.params
        /*
        pid=Number(pid)
        if(isNaN(pid)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`El id debe ser numérico`})
        }
*/
        if(!isValidObjectId(pid)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Se requiere un id de mongodb válido`})
        }

        
   
        let aModificar=req.body
        /*
        if(aModificar.id){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`No está permitido modificar el id`})
        }
    */
        try {
            
            // verificar tipo de datos acá también??
            let productos=await productManager.getProducts()
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
            let productoModificado=await productManager.modifyProduct(pid, aModificar)


                req.socket.emit("actualizarProductos", productos)
            
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({payload:`Se modifico producto con id ${pid}`, productoModificado});

            


            
        
            
        } catch (error) {
            procesaErrores(res, error)
        }

    })
    
    router.delete("/:pid", async(req, res)=>{
    //app.delete("/:id", async(req, res)=>{
    
        let {pid} =req.params
        /*
        pid=Number(pid)
        if(isNaN(pid)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`El id debe ser numérico`})
        }
    */

        if(!isValidObjectId(pid)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Se requiere un id de mongodb válido`})
        }


        try {
            // verificar tipo de datos acá también??
            /*
            let productoParaBorrar=await productManager.getProductById(pid)
    
            if(!productoParaBorrar){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`No existe el producto con id ${pid}`})
                
            }
    */
            let productoBorrado=await productManager.deleteProduct(pid)

            if(!productoBorrado){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`No existe el producto con id ${pid}`})
                
            }
            
            let productos=await productManager.getProducts()

            req.socket.emit("actualizarProductos", productos)

            res.setHeader('Content-Type','application/json');
            return res.status(200).json({payload:`Se eliminó el producto con id ${pid}`, productoBorrado});
        } catch (error) {
            procesaErrores(res, error)
        }
    
    })
    