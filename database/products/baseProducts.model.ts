import {models, Schema , model} from 'mongoose'

const baseProductSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type: String,
        required:true
    },
    views: {
        type: Number,
        default: 0
    },
    buyer:[{
        type : Schema.Types.ObjectId, ref:'User', required:true
    }]
})

const BaseProduct = models.BaseProduct || model('BaseProduct', baseProductSchema) 

export default BaseProduct

