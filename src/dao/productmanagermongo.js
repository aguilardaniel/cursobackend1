//import fs from "fs"
import {productsModel} from "./models/productsModel.js"


export class ProductManagerMongo{

    //static cantidadDeProductosDefinidos=0;

    #products
    #path
    constructor(){


        this.#products= []  
        this.#path="./src/data/productos.json"     

    }


    async addProduct(title, description,code, price, status, stock, category, thumbnail){
       
        /*
        let productoParaAgregar= {

            //id: idProximo,
            title: title,
            description: description,
            code: code,
            price: price,
            status: status,
            stock: stock,
            category: category,
            thumbnail: thumbnail,

        }
        */
       
        /*
        let idProximo=0

      
            this.#products= await this.getProducts()

        
        if(this.#products.length>0){
            idProximo=Math.max(...this.#products.map(d=>d.id))+1
         }
                

        let productoParaAgregar= {

            id: idProximo,
            title: title,
            description: description,
            code: code,
            price: price,
            status: status,
            stock: stock,
            category: category,
            thumbnail: thumbnail,

        }
        
        ProductManager.cantidadDeProductosDefinidos++
        this.#products.push(productoParaAgregar);
        await fs.promises.writeFile(this.#path,JSON.stringify(this.#products, null, 5))
        return productoParaAgregar


        */


       

        //return await productsModel.create(productoParaAgregar).toJSON()
        //return productoParaAgregar.toJSON()

        let productoParaAgregar= {

            
            title: title,
            description: description,
            code: code,
            price: price,
            status: status,
            stock: stock,
            category: category,
            thumbnail: thumbnail,

        }
        let nuevoProducto= await productsModel.create(productoParaAgregar)
        return nuevoProducto.toJSON()
        

    }


    async modifyProduct(id, modificaciones={}){
        
        /*
        this.#products=await this.getProducts()
        let indiceProducto=this.#products.findIndex(p=>p.id===id)
        if(indiceProducto==-1){
            throw new Error(`producto inexistente con id ${id}`)
        }


        this.#products[indiceProducto]={
            ... this.#products[indiceProducto],
            ...modificaciones,  
            id
        }

        await fs.promises.writeFile(this.#path,JSON.stringify(this.#products, null, 5))
        return this.#products[indiceProducto]
*/
        return await productsModel.findByIdAndUpdate(id, modificaciones, {new:true}).lean()
    }

    async deleteProduct(idParaEliminar){
        /*
        
        this.#products= await this.getProducts()
        let indiceProducto=this.#products.findIndex(p=>p.id===idParaEliminar)
        if(indiceProducto==-1){
            throw new Error(`producto inexistente con id ${idParaEliminar}`)
        }
        
        let productoBorrado= this.#products[indiceProducto]

        this.#products = this.#products.filter((producto) => producto.id!=idParaEliminar)
        await fs.promises.writeFile(this.#path,JSON.stringify(this.#products, null, 5))
*/

        let productoBorrado = await productsModel.findByIdAndDelete(idParaEliminar).lean()
        return productoBorrado

 
        }

    async getProducts(page, sort, limit, query){
/*
        if(fs.existsSync(this.#path)){
            return JSON.parse(await fs.promises.readFile(this.#path, { encoding: "utf-8" }))
        }else{
            return []
        }
 */      

        //return await productsModel.find().lean()
        return await productsModel.paginate(query, {limit, page, sort,  lean: true})

    }


    async getProductById(idDelProducto){
/*
        this.#products = await this.getProducts()
        
        let productoParaBuscar = this.#products.find((producto)=>producto.id===idDelProducto)

        if(!productoParaBuscar){

            console.log("Not found")
            return

        }

        console.log(productoParaBuscar)
        
*/        
        let productoParaBuscar= await productsModel.findById(idDelProducto).lean()
        return productoParaBuscar


    }



    async getProductByCode(codeDelProducto){

        this.#products = await this.getProducts()
        
        let productoParaBuscar = this.#products.find((producto)=>producto.code===codeDelProducto)

        if(!productoParaBuscar){

            console.log("Not found")
            return

        }

        console.log(productoParaBuscar)
        return productoParaBuscar


    }

    async getProductByTitle(titleDelProducto){

        this.#products = await this.getProducts()
        
        let productoParaBuscar = this.#products.find((producto)=>producto.title===titleDelProducto)

        if(!productoParaBuscar){

            console.log("Not found")
            return

        }

        console.log(productoParaBuscar)
        return productoParaBuscar


    }


}


/* 
const productManager = new ProductManager();

console.log("Prueba con todos los Datos");
productManager.addProduct("Martillo","Herramienta", "5000","martillo.png", "A0001","15");
console.log(" ");

console.log("Prueba con todos los Datos");
productManager.addProduct("Tornillo","Pieza", "30","tornillo.png", "A0002","3000000");
console.log(" ");

console.log("Prueba con código repetido")
productManager.addProduct("Martillo","Herramienta", "5000","martillo.png", "A0001","15")
console.log(" ")

console.log("Prueba sin un dato")
productManager.addProduct("Martillo", "5000","martillo.png", "A0001","15")
console.log(" ")


console.log("Prueba buscar un id con id=0")
productManager.getProductById(0)
console.log(" ")

console.log("Prueba buscar un id con id=1")
productManager.getProductById(1)
console.log(" ")

console.log("Prueba buscar un id con id=2")
productManager.getProductById(2)
console.log(" ")

console.log("Prueba buscar un id con id=3")
productManager.getProductById(3)
console.log(" ")

console.log("Prueba mostrar todos los productos")
productManager.getProducts()
console.log(" ") */