import { Schema}  from "mongoose"
import BaseProduct from "./baseProducts.model" ;

const smallProductSchema = new Schema({
    type:{
        type:String,
        required:true
    },
    brand :{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    state :{
        type: String,
        default:'new'
    },
})

const SmallProduct = BaseProduct.discriminator('SmallProduct', smallProductSchema);

export default SmallProduct