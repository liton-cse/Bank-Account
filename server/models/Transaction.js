import mongoose, { Mongoose } from "mongoose";
const TransactionSchema = new mongoose.Schema({
    userId:{
        tyep: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: [true, 'User Id is required'],
    },
    amount:{
        type:Number,
        required:[true,'Amount is required'],
        min:[0.01, 'Amount must be greater than Zero']
    },
    type:{
        type:String,
        enum:['deposit','withdrow'],
        required:[true, 'transaction is required']
    },
    description:{
        type:String,
        required:[true,'Description is required'],
        trim: true,
        minlength:[200,'Must be within 200 character']
    }
},{timestamps: true});

const transaction = mongoose.model('Transaction', TransactionSchema);