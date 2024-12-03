import {models, model, Schema } from 'mongoose'

const categorySchema = new Schema({
    name:{type: String, required: true},
    slug : {type : String, required: true , lowercase : true,},
},{timestamps:true})

const Category = models.Category || model('Category', categorySchema)   

export default Category