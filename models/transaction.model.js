import mongoose from "mongoose";

const { Schema } = mongoose;

const TransactionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        cost: String,
        products: {
            type: [Schema.Types.ObjectId],
            ref: "Product",
            of: Number,
        },
    },
    { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
