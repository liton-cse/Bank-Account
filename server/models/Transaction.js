import mongoose, { Mongoose } from "mongoose";
const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0.01, "Amount must be greater than Zero"],
    },
    type: {
      type: String,
      enum: ["deposit", "withdrow", "transfer"],
      required: [true, "transaction is required"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      default: "",
      maxlength: [200, "Must be within 200 character"],
    },

    targetAccount: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // For transfer
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
