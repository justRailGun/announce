import {model, models , Schema} from "mongoose"

const userSchema= new Schema({
    name :{
        type: String,
        required : true, 
    },
    email :{
        type: String,
        required : true,
        unique  : true,
    },
    password :{
        type: String,
        required : true, 
    },
    image :{
        type: String,
        required : true, 
    },
    role :{
        type: String,
        required : true, 
        default : "user",
    },
    shop :{
        type: Schema.Types.ObjectId,
        ref: "Shop",
        required : true,
    },
    product :[{
        type: Schema.Types.ObjectId,
        ref: "BaseProduct",
        required : true,
    }],

}) 

const User = models.User || model('User', userSchema)

export default User