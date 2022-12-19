import mongoose from "mongoose";
import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

export const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: "admin" }).select("-password");
        res.status(200).json(admins);
    } catch (ex) {
        res.status(404).json({ message: ex.message });
    }
};

export const getUserPerformance = async (req, res) => {
    try {
        const { id } = req.params;

        const userWithStats = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "affiliatestats",
                    localField: "_id",
                    foreignField: "userId",
                    as: "affiliateSalesStats",
                },
            },
            { $unwind: "$affiliateSalesStats" },
        ]);

        const salesTransactions = await Promise.all(
            userWithStats[0].affiliateSalesStats.affiliateSales.map((id) => {
                return Transaction.findById(id);
            })
        );

        const filteredSalesTransactions = salesTransactions.filter(
            (transaction) => transaction !== null
        );

        res.status(200).json({
            user: userWithStats[0],
            sales: filteredSalesTransactions,
        });
    } catch (ex) {
        res.status(404).json({ message: ex.message });
    }
};
