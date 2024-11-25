import {Schema} from 'mongoose'
import BaseProduct from './baseProducts.model'

const furnitureSchema = new Schema({
    type:{
        type:String,
        required:true
    }, 
    size: {
        type:String,
        required:true
    },
    materiel:{
        type:String,
        required:true
    }
})

const Furniture = BaseProduct.discriminators?.Furniture ||  BaseProduct.discriminator('Furniture', furnitureSchema);

export default Furniture