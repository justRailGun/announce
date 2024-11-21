import {Schema} from 'mongoose'
import BaseProduct from './baseProducts.model'
const vehiculeSchema = new Schema({
    brand :{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    power : {
        type:Number,
        required:true
    },
    distanceTravelled:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    color:{
        type:String,
    },
    fuel:{
        type:String,
    },
})

const Vehicule = BaseProduct.discriminator('Vehicule', vehiculeSchema);

export default Vehicule