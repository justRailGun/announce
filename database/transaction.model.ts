import {model ,models , Schema} from "mongoose";


const transactionSchema = new Schema({
    userId: {type : Schema.Types.ObjectId, ref : "User" , required : true},
    "User Information" : {
        name : {type : String, required : true},
        email : {type : String, required : true},
        phone : {type : String, required : true},
    }
    ,
    "Shipping Adress" : {
        country : {type : String, required : true},
        city : {type : String, required : true},
        address : {type : String, required : true},
        "Zip Code" : {type : String, required : true},
    },
    totalCost : {type : Number, required : true},
    // name :{type : String, required : true},
    // email : {type : String, required : true},
    // phone : {type : String, required : true},
    // country : {type : String, required : true},
    // city : {type : String, required : true},
    // address : {type : String, required : true},
    // "Zip Code" : {type : String, required : true},
    "Delivery-Instructions" : {type : String, required : true},
    products : [{type : Schema.Types.ObjectId , ref: 'BaseProduct' , required : true}],
},{timestamps : true})

const Transaction = models.Transaction || model("Transaction", transactionSchema)

export default Transaction