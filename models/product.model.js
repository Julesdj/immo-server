import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema(
    {
        name: String,
        price: Number,
        description: String,
        category: String,
        rating: Number,
        inventory: Number,
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
