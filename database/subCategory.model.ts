import {models, model, Schema } from 'mongoose'; 

const subCategorySchema = new Schema({
    name : {type : String, required: true},
    slug : {type : String, required: true , lowercase : true,},
    parentCategory : {type : Schema.Types.ObjectId, ref: 'Category', required: true},
},
{timestamps: true})

const SubCategory = models.SubCategory || model('SubCategory', subCategorySchema)

export default SubCategory