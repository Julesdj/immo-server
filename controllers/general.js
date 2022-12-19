import Transaction from "../models/transaction.model.js";
import OverallStat from "../models/overallStat.model.js";

export const getDashboardSats = async (req, res) => {
    try {
        //Hardcoded values
        const currentMonth = "November";
        const currentYear = 2021;
        const currentDay = "2021-11-15";

        //Recent Transactions
        const transactions = await Transaction.find()
            .limit(50)
            .sort({ createdOn: -1 });

        //Overall Stats
        const overallStat = await OverallStat.find({ year: currentYear });

        const {
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
        } = overallStat[0];

        const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
            return month === currentMonth;
        });

        const todayStats = overallStat[0].dailyData.find(({ date }) => {
            return date === currentDay;
        });

        res.status(200).json({
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
            thisMonthStats,
            todayStats,
            transactions,
        });
    } catch (ex) {
        res.status(404).json({ message: ex.message });
    }
};
