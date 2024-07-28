import { validationResult } from "express-validator";
import generateBalanceSheet from "../helpers/BalanceSheet.js";
import { Expense } from "../modal/ExpenseSchema.js";
import { splitEqually, splitExact, splitPercentage } from "../utils/split.js";

export const createExpense = async (req, res) => {
  try {
    const { description, paidBy, amount, participants, splitType } = req.body;

    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).send({ error: result.array() });

    const paidByParticipant = participants.find(
      (p) => p.user.toString() === paidBy
    );
    if (!paidByParticipant) {
      participants.push({ user: paidBy, amount: 0 });
    }
    let totalAmount;
    if (splitType === "equal") {
      splitEqually(amount, participants);
    } else if (splitType === "exact") {
      totalAmount = splitExact(amount, participants);
    } else if (splitType === "percentage") {
      splitPercentage(amount, participants);
    }
    const newExpense = new Expense({
      description,
      paidBy,
      amount,
      participants,
      splitType,
    });
    await newExpense.save();
    res.status(200).send({
      message: "Success",
      newExpense,
    });
  } catch (error) {
    console.log(error);
  }
};

export const individualExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const findExpenseUser = await Expense.find({ "participants.user": userId })
      .populate("paidBy")
      .populate("participants.user");
    let totalAmount = 0;
    const expenseDetails = [];
    findExpenseUser.forEach((expense) => {
      expense.participants.forEach((participant) => {
        if (participant.user && participant.user._id.toString() === userId) {
          const amount = parseFloat(participant.amount);
          if (!isNaN(amount)) {
            totalAmount += amount;
          }
        }
      });
      expenseDetails.push({
        description: expense.description,
        paidBy: expense.paidBy,
        totalAmount: expense.amount,
        splitType: expense.splitType,
        participants: expense.participants.map((participant) => ({
          name: participant.user ? participant.user.name : "Unknown",
          amount: participant.amount,
        })),
      });
    });
    return res.status(200).send({ totalAmount, expenseDetails });
  } catch (error) {
    console.log(error);
  }
};

export const downloadBalanceSheet = async (req, res) => {
  try {
    const userId = req.user._id;
    const findExpenseUser = await Expense.find({ "participants.user": userId })
      .populate("paidBy")
      .populate("participants.user");
    generateBalanceSheet(findExpenseUser, userId, res);
    return res.send({ message: "Success  " });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error" });
  }
};
