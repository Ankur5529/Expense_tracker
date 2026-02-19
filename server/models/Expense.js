import mongoose from "mongoose";

const expenseSchema=new mongoose.Schema(
    {
    title:{
        type:String,
        required:true,
        trim:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
        enum:["Food","Transport","Entertainment","Utilities","Health","Other"],
        default:"Other",
    },
    date:{
        type:Date,
        default:Date.now,
    },
    },
{
    timestamps:true,
}
);

const Expense=mongoose.model("Expense",expenseSchema);

export default Expense;