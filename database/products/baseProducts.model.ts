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
        default : "/images/shoes.png"
    },
    category:{
        type: Schema.Types.ObjectId,
        required:true,
        ref : 'Category'
    },
    "Sub-Category":{
        type: Schema.Types.ObjectId,
        required:true,
        ref : 'SubCategory'
    },
    views: {
        type: Number,
        default: 0
    },
    // user:{
    //     type : Schema.Types.ObjectId, ref:'User', required:true
    // }
},{timestamps: true})

const BaseProduct = models.BaseProduct || model('BaseProduct', baseProductSchema) 

export default BaseProduct

