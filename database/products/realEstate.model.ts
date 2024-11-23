import {Schema} from 'mongoose'
import BaseProduct from './baseProducts.model'

const realEstateSchema = new Schema({
    location:{
        type:String,
        required:true
    },
    bedrooms:{
        type:String,
        required:true
    },
    bathrooms:{
        type:String,
        required:true
    }, 
    surface: {
        type:String,
        required:true
    },
    floors:{
        type:String,
        required:true
    }
})

const RealEstate = BaseProduct.discriminators?.RealEstate ||  BaseProduct.discriminator('RealEstate', realEstateSchema);

export default RealEstate