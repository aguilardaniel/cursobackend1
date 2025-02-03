import mongoose from "mongoose"; 


const cartsCollection="carts"  // le da nombre al model y a la colección

const cartsSchema=new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId, // Referencia al modelo 'products'
                    ref: "products"
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        default: []
    }
},
{
    timestamps: true
}
)

export const cartsModel=mongoose.model(
    cartsCollection,
    cartsSchema
)















