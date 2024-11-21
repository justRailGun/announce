import {Schema} from 'mongoose'
import BaseProduct from './baseProducts.model'

const realEstateSchema = new Schema({
    location:{
        type:String,
        required:true
    },
    bedrooms:{
        type:Number,
        required:true
    },
    bathrooms:{
        type:Number,
        required:true
    }, 
    surface: {
        type:Number,
        required:true
    },
    floors:{
        type:Number,
        required:true
    }
})

const ReslEstate = BaseProduct.discriminator('ReslEstate', realEstateSchema);

export default ReslEstate