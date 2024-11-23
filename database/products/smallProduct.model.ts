import { Schema}  from "mongoose"
import BaseProduct from "./baseProducts.model" ;

const smallProductSchema = new Schema({
    type:{
        type:String,
    },
    brand :{
        type:String,
    },
    model:{
        type:String,
    },
    state:{
        type: String,
    },
})

const SmallProduct = BaseProduct.discriminators?.SmallProduct || BaseProduct.discriminator('SmallProduct', smallProductSchema);

export default SmallProduct