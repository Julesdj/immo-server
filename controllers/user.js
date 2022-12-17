import User from "../models/user.model.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password");
        res.status(200).json(user);
    } catch (ex) {
        res.status(404).json({ message: ex.message });
    }
};
