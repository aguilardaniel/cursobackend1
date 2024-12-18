import fs from "fs"

export class CartManager{

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
        
/*
        const existeCode = this.#products.find((producto)=>producto.code===code);

        if(existeCode){
            console.log("Ya existe un producto con ese código");
            return;
        }

        if(!title || !description || !price || !thumbnail || !code || !stock ){

            console.log("Debe ingresar todos los campos requeridos");
            return;

        }

*/
        

        let carritoParaAgregar= {

            id: idProximo,
            products: arrayProductos,

        }
        
        //ProductManager.cantidadDeProductosDefinidos++
        this.#carts.push(carritoParaAgregar);
        await fs.promises.writeFile(this.#path,JSON.stringify(this.#carts, null, 5))
        return carritoParaAgregar


    }


    async modifyCart(cid, quantity ,pid){

        let productoParaAgregar=[{
            producto: pid,
            quantity: quantity,
        }]

        this.#carts=await this.getCarts()
        let indiceCarrito=this.#carts.findIndex(p=>p.id===cid)
        if(indiceCarrito==-1){
            throw new Error(`carrito inexistente con id ${cid}`)
        }


        this.#carts[indiceCarrito].products={
            ...this.#carts[indiceCarrito].products,
            ...productoParaAgregar,  
            //id: cid
        }

        await fs.promises.writeFile(this.#path,JSON.stringify(this.#carts, null, 5))
        return this.#carts[indiceCarrito]

    }

    async getCarts(){

        if(fs.existsSync(this.#path)){
            return JSON.parse(await fs.promises.readFile(this.#path, { encoding: "utf-8" }))
        }else{
            return []
        }
        

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

        this.#carts = await this.getCarts()
        
        let carritoParaBuscar = this.#carts.find((carrito)=>carrito.id===idDelCarrito)

        if(!carritoParaBuscar){

            console.log("Not found")
            return

        }

        console.log(carritoParaBuscar)
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