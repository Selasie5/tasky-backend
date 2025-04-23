import mongoose, {Document} from "mongoose";


interface ITask extends Document {
    title:string,
    description:string,
    status:string,
    deadline:Date,
    createdAt:Date,
    updatedAt:Date
}

const TaskSchema = new mongoose.Schema({
    title:{type:String, required:true},
    description: {type:String, required:true},
    deadline: {type:Date, required:true},
    status: {
        type:String,
        enum:["OPEN", "IN_PROGRESS", "COMPLETED"],
        default: "OPEN",
        required: true}
},

{
    timestamps:true
})

export const Task =  mongoose.model<ITask>("Task", TaskSchema)
