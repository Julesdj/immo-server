import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import clientRoutes from "./routes/client.routes.js";
import managementRoutes from "./routes/management.routes.js";
import productRoutes from "./routes/product.routes.js";
import salesRoutes from "./routes/sales.routes.js";
import generalRoutes from "./routes/general.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/authn.routes.js";

// SEED MOCK DATA
import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import ProductStat from "./models/productStat.model.js";
import Transaction from "./models/transaction.model.js";
import OverallStat from "./models/overallStat.model.js";
import AffiliateStat from "./models/affiliateStat.model.js";
import {
    userData,
    dataProduct,
    dataProductStat,
    dataTransaction,
    dataOverallStat,
    dataAffiliateStat,
} from "./data/mock.data.js";

// CONFIGURATION
dotenv.config();
const port = process.env.PORT || 9000;
const app = express();

// MONGOOSE SETUP
const db = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(db);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        //SEED MOCK DATA FOR TEST PURPOSES
        // User.insertMany(userData)
        // Product.insertMany(dataProduct)
        // ProductStat.insertMany(dataProductStat)
        // Transaction.insertMany(dataTransaction)
        // OverallStat.insertMany(dataOverallStat)
        // AffiliateStat.insertMany(dataAffiliateStat)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

// MIDDLEWARES
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

// ROUTES
app.use("/api/client", clientRoutes);
app.use("/api/general", generalRoutes);
app.use("/api/management", managementRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

//Connect to the database before listening
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
    });
});
