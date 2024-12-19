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
    image :{
        type: String,
        required : true, 
    },
    role :{
        type: String,
        default : "user",
    },
    products :[{
        type : Schema.Types.ObjectId,
        ref : 'Product',
        default : []
    }],
},{timestamps: true}) 

const User = models.User || model('User', userSchema)

export default User