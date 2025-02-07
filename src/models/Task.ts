import mongoose, {Document} from "mongoose";


interface ITask extends Document {
    title:string,
    description:string,
    status:string
    createdAt:Date,
    updatedAt:Date
}

const TaskSchema = new mongoose.Schema({
    title:{type:String, required:true},
    description: {type:String, required:true},
    status: {type:String, required: true}
},
{
    timestamps:true
})

export const TaskModel =  mongoose.model<ITask>("Task", TaskSchema)