import User from "../models/user.model.js";

export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: "user" }).select("-password");
        res.status(200).json(customers);
    } catch (ex) {
        res.status(404).json({ message: ex.message });
    }
};
