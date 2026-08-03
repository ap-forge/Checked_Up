import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
        unique:true
    },

    code:{
        type:String,
        required:true,
        unique:true
    },

    hierarchy:{
        type:Number,
        required:true
    },

    permissions:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Permission"
        }
    ],

    isActive:{
        type:Boolean,
        default:true
    }
},
{
    timestamps:true
}
);

export default mongoose.models.Role ||
  mongoose.model("Role", roleSchema);