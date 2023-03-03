import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema

const contentSchema = new mongoose.Schema(
    {
        companyName : {
            type : String, 
            required : true,
        }, 
        position : {
            type : String, 
            required : true,
        },
        date : {
            type : String,
        }, 
        package : {
            type : String,
        },
        questions : {
             type : String,
             required : true
        },
        user : {
           type : ObjectId,
           ref : "user" 
        } 
    }
)

const Content = mongoose.model("content", contentSchema)
export {Content}
