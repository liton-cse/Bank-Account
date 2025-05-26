import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

// @deposit Balance
// @ method : post
// @end point: transection/deposit

export const deposit = async (req, res) => {
  let { amount } = req.body;
  amount = Number(amount); // Convert the amount to a number

  if (isNaN(amount)) {
    return res.status(400).json({ message: "Invalid amount" }); // Handle invalid amount
  }
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User Not found" });
    }
    user.balance += amount;
    await user.save();
    const transaction = new Transaction({
      userId: user._id,
      receiveId: user.email,
      type: "deposit",
      email: user.email,
      amount,
      description: `Deposit to account ${user.email}`,
    });
    await transaction.save();
    res
      .status(200)
      .json({ message: "Deposit Successfull", balance: user.balance });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error in deposit", Error: error.message });
  }
};

// @withdrow Balance
// @ method : post
// @end point: transaction/withdrow

export const withdrow = async (req, res) => {
  let { amount } = req.body;
  amount = Number(amount);
  if (isNaN(amount)) {
    return res.status(400).json({ message: "Invalid AMount" });
  }
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    }
    if (user.balance < amount) {
      res.status(400).json({ message: "Insufficient Balance" });
    }
    user.balance -= amount;
    await user.save();
    console.log(user.email);
    const transaction = new Transaction({
      userId: user._id,
      receiveId: user.email,
      type: "withdrow",
      amount,
      description: `Withdrow from account ${user.email}`,
    });
    await transaction.save();
    res
      .status(200)
      .json({ message: "Withdrow Successfully", balance: user.balance });
  } catch (error) {
    return res.status(400).json({ message: "Error in withdrow" });
  }
};

// @Transection transfering
// @ method : get
// @end point: transection/transfer
export const transfer = async (req, res) => {
  const { recipient } = req.body;
  let { amount } = req.body;
  amount = Number(amount);
  if (isNaN(amount)) {
    return res.status(400).json({ message: "Invalid Amount" });
  }
  const senderId = req.user._id;
  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findOne({ email: recipient });
    console.log(sender.email);
    if (!sender || !receiver) {
      return res
        .status(400)
        .json({ message: "User or recipient are not found" });
    }
    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient amount" });
    }
    sender.balance -= parseFloat(amount);
    receiver.balance += parseFloat(amount);

    await sender.save();
    await receiver.save();
    const senderTransaction = new Transaction({
      userId: sender._id,
      receiveId: receiver.email,
      type: "transfer",
      amount: parseFloat(amount),
      description: `Transfer balance to ${receiver._id}`,
      targetAccount: receiver._id,
    });

    const receiverTransaction = new Transaction({
      userId: receiver._id,
      receiveId: sender.email,
      type: "transfer",
      amount: parseFloat(amount),
      description: `Transfer money from ${sender._id}`,
      targetAccount: sender._id,
    });

    await senderTransaction.save();
    await receiverTransaction.save();

    res.status(200).json({
      message: "Transfer Successfull",
      sender: senderTransaction,
      Receiver: receiverTransaction,
      senderBalance: sender.balance,
      receiverBalance: receiver.balance,
    });
  } catch (error) {
    res.status(400).json({ message: "Error in transfer", Error: error });
  }
};

// @Transection History
// @ method : get
// @end point: transection/history
export const transactionHistory = async (req, res) => {
  const userId = req.user._id;
  try {
    const history = await Transaction.find({ userId }).sort({ date: -1 });
    res.status(200).json({ history });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// I f iwant to reset my balance .. it is no necessary.......

export const resetBalance = async (req, res) => {
  const userId = req.user._id;

  try {
    // Clear all transactions for the user
    await Transaction.deleteMany({ userId });

    // Reset user's balance to 0
    await User.updateOne({ _id: userId }, { $set: { balance: 0 } });

    res.status(200).json({ message: "Account balance reset to 0." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

// fetch the latest data from base on type.....

export const latestHistory = async (req, res) => {
  const userId = req.user._id;
  try {
    const latestHistory = await Transaction.find({ userId }).sort({ data: -1 });
    //Lateast deposit history from database....
    const filterDepositHistory = latestHistory.filter(
      (history) => history.type === "deposit"
    );
    const depositHistory = filterDepositHistory.slice(0, 3);

    //latest Withdrow history from Databse......

    const filterWithdrowHistory = latestHistory.filter(
      (history) => history.type === "withdrow"
    );
    const withdrowHistory = filterWithdrowHistory.slice(0, 3);

    //lateast Transfer money history from databse...
    const filterTransferHistory = latestHistory.filter(
      (history) => history.type === "transfer"
    );
    const transferHistory = filterTransferHistory.slice(0, 3);
    res.status(200).json({
      depositHistory: depositHistory,
      withdrowHistory: withdrowHistory,
      transferHistory: transferHistory,
    });
  } catch (error) {
    console.log(error);
  }
};
