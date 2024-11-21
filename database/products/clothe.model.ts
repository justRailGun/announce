import {Schema} from 'mongoose'
import BaseProduct from './baseProducts.model'

const clotheSchema = new Schema({
    type:{
        type:String,
        required:true
    },
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


const Clothe =BaseProduct.discriminator('Clothe', clotheSchema);

export default Clothe