import {Schema} from 'mongoose'
import BaseProduct from './baseProducts.model'

const clotheSchema = new Schema({
    size :{
        type:String,
        required:true
    },
    color :{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    materiel:{
        type:String,
    }
})


const Clothe = BaseProduct.discriminators?.Clothe ||  BaseProduct.discriminator('Clothe', clotheSchema)

export default Clothe