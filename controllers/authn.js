import User from "../models/user.model.js";

export const authenticateUser = async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json("Invalid email or password.");
        if (req.body.password !== user.password)
            return res.status(400).json("Invalid email or password.");

        //Generate authn token
        const token = user.generateAuthnToken();

        res.status(200).json(token);
    } catch (ex) {
        res.status(400).json({ message: ex.message });
    }
};
