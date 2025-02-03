//import fs from "fs"
import {cartsModel} from "./models/cartsModel.js"
import {productsModel} from "./models/productsModel.js"

export class CartManagerMongo{

    //static cantidadDeProductosDefinidos=0;

    #products
    #carts
    #path
    constructor(){


        this.#carts= []  
        this.#products= [] 
        this.#path="./src/data/carritos.json"     

    }


    async addCart(arrayProductos){
        
        /*
        let idProximo=0

        //if(this.#products==[]){
            this.#carts= await this.getCarts()
               // .then(console.log(this.#products))
               // .catch(e=>console.log(e.message))
        //}
        
        if(this.#carts.length>0){
            idProximo=Math.max(...this.#carts.map(d=>d.id))+1
           // ProductManager.cantidadDeProductosDefinidos=cantidadDeProductosDefinidos =this.#products.length

         }
    
        

        let carritoParaAgregar= {

            id: idProximo,
            products: arrayProductos,

        }
        
        //ProductManager.cantidadDeProductosDefinidos++
        this.#carts.push(carritoParaAgregar);
        await fs.promises.writeFile(this.#path,JSON.stringify(this.#carts, null, 5))
        return carritoParaAgregar
        */

        let carritoParaAgregar= {

            products: arrayProductos,

        }

        let nuevoCarrito = await cartsModel.create(carritoParaAgregar)
        nuevoCarrito = await nuevoCarrito.populate("products.product");
        return nuevoCarrito.toJSON()
        

    }

    async deleteCart(idParaEliminar){
  

        let carritoBorrado = await cartsModel.findByIdAndDelete(idParaEliminar).lean()
        return carritoBorrado

 
        }

    async modifyCart(cid,aModificar={}){
        /*
        this.#carts=await this.getCarts()
        let indiceCarrito=this.#carts.findIndex(p=>p.id===cid)
        if(indiceCarrito==-1){
            throw new Error(`carrito inexistente con id ${cid}`)
        }



        this.#carts[indiceCarrito]={
            ...this.#carts[indiceCarrito],
            ...aModificar
            //id: cid
        }

        await fs.promises.writeFile(this.#path,JSON.stringify(this.#carts, null, 5))
        return this.#carts[indiceCarrito]

        */
        return await cartsModel.findByIdAndUpdate(cid, aModificar, {new:true}).populate("products.product").lean()
        
    }

    async getCarts(){
/*
        if(fs.existsSync(this.#path)){
            return JSON.parse(await fs.promises.readFile(this.#path, { encoding: "utf-8" }))
        }else{
            return []
        }
 */       
    return await cartsModel.find().populate("products.product").lean()
/*       
            .then(info => {
                    let productosEnArchivo= info
                    this.#products=JSON.parse(productosEnArchivo)
            })
            .catch(e => console.log(e.message))

*/        

        //console.log(this.#products)
        //return this.#products

    }


    async getCartById(idDelCarrito){
        /*
        this.#carts = await this.getCarts()
        
        let carritoParaBuscar = this.#carts.find((carrito)=>carrito.id===idDelCarrito)

        if(!carritoParaBuscar){

            console.log("Not found")
            return

        }

        console.log(carritoParaBuscar)
        return carritoParaBuscar
*/
        let carritoParaBuscar= await cartsModel.findById(idDelCarrito).populate("products.product").lean()
        return carritoParaBuscar

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