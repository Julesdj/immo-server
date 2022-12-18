import User from "../models/user.model.js";

export const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: "admin" }).select("-password");
        res.status(200).json(admins);
    } catch (ex) {
        res.status(404).json({ message: ex.message });
    }
};
