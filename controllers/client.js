import User from "../models/user.model.js";
import Transaction from "../models/transaction.model.js";

export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: "user" }).select("-password");
        res.status(200).json(customers);
    } catch (ex) {
        res.status(404).json({ message: ex.message });
    }
};

export const getTransactions = async (req, res) => {
    try {
        // SERVER SIDE PAGINATION
        //sort should look like this: {"field": "userId", "sort": "desc"}
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

        // formatted sort should look like {userId: -1}
        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
            };

            return sortFormatted;
        };

        const sortFormatted = Boolean(sort) ? generateSort() : {};

        const transactions = await Transaction.find({
            $or: [
                { cost: { $regex: new RegExp(search, "i") } },
                // { userId: { $regex: new RegExp(search, "i") } },
            ],
        })
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize);

        const total = await Transaction.countDocuments({
            name: { $regex: search, $options: "i" },
        });

        // TODO: Set default query parameters automatically if none provided

        res.status(200).json({ transactions, total });
    } catch (ex) {
        res.status(404).json({ message: ex.message });
    }
};
