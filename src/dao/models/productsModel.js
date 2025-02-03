import mongoose from "mongoose"; 
import paginate from "mongoose-paginate-v2";
/*
export const productsModelo2=mongoose.model(
    "products",
    new mongoose.Schema(
        {
            id: {
                type: Number, 
                unique: true
            },
            title: {
                type: String, 
                unique: true
            },
            description: String,
            code: {
                type: String, 
                unique: true
            },
            price: Number,
            status: {type:Boolean, default: true},
            stock: Number,
            category: String,
            thumbnail: {
                type: Array, 
                default: []
            }
    
        },
        {
            
            timestamps: true,
            
        }
    )

)
*/
const productosCollection="products"  // le da nombre al model y a la colección

const productosSchema=new mongoose.Schema(
    {
        
        title: {
            type: String, 
            unique: true
        },
        description: String,
        code: {
            type: String, 
            unique: true
        },
        price: Number,
        status: {type:Boolean, default: true},
        stock: Number,
        category: String,
        thumbnail: {
            type: Array, 
            default: []
        }



/*
        title: String, 
        descrip: String,
        price: Number, 
        status: {type:Boolean, default: true}, 
        stock: Number, 
        images: {
            type: Array, 
            default: []
        }
*/


    },
    {
        // collection: "productos2021",
        timestamps: true, 
        // strict: false
    }
)

productosSchema.plugin(paginate)

export const productsModel=mongoose.model(
    productosCollection,
    productosSchema
)


