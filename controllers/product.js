import Product from "../models/product.model.js";
import ProductStat from "../models/productStat.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        // const getProductsWithStats = await Promise.all(
        //     products.map(async (product) => {
        //         const stat = await ProductStat.find({
        //             productId: product._id,
        //         });
        //         return {
        //             ...product._doc,
        //             stat,
        //         };
        //     })
        // );
        res.status(200).json(products);
    } catch (ex) {
        res.status(404).json({ message: ex.message });
    }
};

export const getProductStats = async (req, res) => {
    try {
        const productStats = await ProductStat.find().populate("productId");

        res.status(200).json(productStats);
    } catch (ex) {
        res.status(404).json({ message: ex.message });
    }
};
