import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

// @deposit Balance
// @ method : post
// @end point: transection/deposit

export const deposit = async (req, res) => {
  const { amount } = req.body;
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
      type: "deposit",
      amount,
      description: "Deposit to account",
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
  const { amount } = req.body;
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
    const transaction = new Transaction({
      userId: user._id,
      type: "withdrow",
      amount,
      description: "Withdrow from account",
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
  const { amount, recipient } = req.body;
  const senderId = req.user._id;
  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findOne({ email: recipient });
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
      type: "transfer",
      amount: parseFloat(amount),
      description: `Transfer balance from${sender._id}`,
      targetAccount: receiver._id,
    });

    const receiverTransaction = new Transaction({
      userId: receiver._id,
      type: "transfer",
      amount: parseFloat(amount),
      description: `Transfer money from ${sender._id}`,
      targetAccount: sender._id,
    });

    await senderTransaction.save();
    await receiverTransaction.save();
    // res.status(200).json({
    //   message: "Transfer Successfull",
    //   senderBalance: sender.balance,
    //   receiverBalance: receiver.balance,
    // });
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
