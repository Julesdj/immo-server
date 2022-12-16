import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductStatSchema = new Schema({
    // productId: String, One way of doing it.
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
    yearlySalesTotal: Number,
    yearlyTotalUnitsSold: Number,
    year: Number,
    monthlyData: [
        {
            month: String,
            totalSales: Number,
            totalUnitsSold: Number,
        },
    ],
    dailyData: [
        {
            date: String,
            totalSales: Number,
            totalUnitsSold: Number,
        },
    ],
});

const ProductStat = mongoose.model("ProductStat", ProductStatSchema);
export default ProductStat;
