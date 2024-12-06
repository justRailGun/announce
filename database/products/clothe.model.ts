import {Schema} from 'mongoose'
import BaseProduct from './baseProducts.model'

const clotheSchema = new Schema({
    size :{
        type:String,
    },
    color :{
        type:String,
    },
    brand:{
        type:String,
    },
    materiel:{
        type:String,
    }
})


const Clothe = BaseProduct.discriminators?.Clothe ||  BaseProduct.discriminator('Clothe', clotheSchema)

export default Clothe