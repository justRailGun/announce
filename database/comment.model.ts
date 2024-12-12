import { Schema , model, models} from 'mongoose'

const commentSchema = new Schema({
    product :{
        type : Schema.Types.ObjectId, ref:'BaseProduct', required:true
    },
    author : {
        type : Schema.Types.ObjectId, ref:'User', required:true
    },
    content : {
        type : String, required:true
    },
    rating : {
        type : Number, required:true
    }
},{timestamps: true})

const Comment = models.Comment || model('Comment', commentSchema)

export default Comment