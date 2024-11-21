import {models, model, Schema } from 'mongoose'

const shopSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:'Welcome to Sahaa'
    },
    location:{
        type:String,
        required:true
    }, 
    phone:{
        type:String,
        required:true
    },
    popularity:{
        type:Number,
        default:0
    },
    rating:{
        type:Number,
        default:0
    },
    orderAccepted:{
        type:Number,
        default:0
    },
    adress:{
        type:String,
        default:''
    },
    owner:
    {type:Schema.Types.ObjectId, ref:'User'}
})

const Shop = models.Shop || model('Shop', shopSchema)

export default Shop