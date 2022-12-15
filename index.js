import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import clientRoutes from "./routes/client.routes.js";
import salesRoutes from "./routes/sales.routes.js";
import managementRoutes from "./routes/management.routes.js";
import generalRoutes from "./routes/general.routes.js";

// SEED MOCK DATA
import User from "./models/user.model.js";
import { userData } from "./data/mock.data.js";

// CONFIGURATION
dotenv.config();
const port = process.env.PORT || 9000;
const app = express();

// MONGOOSE SETUP
const db = process.env.MONGO_URI;
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(
        () => console.log("Connected to the database successfully."),

        //RESET THE DATABASE< THEN SEED MOCK DATA FOR TEST PURPOSES
        // db.users.drop(),
        User.insertMany(userData)
    )
    .catch((err) =>
        console.error("Could not connect to the database.", err.message)
    );

// MIDDLEWARES
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

// ROUTES
app.use("/clients", clientRoutes);
app.use("/sales", salesRoutes);
app.use("/managements", managementRoutes);
app.use("/generals", generalRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));
