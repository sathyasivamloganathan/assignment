import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    paidBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    participants: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        amount: {
          type: Number,
        },
        percentage: {
          type: Number,
        },
      },
    ],
    splitType: {
      type: String,
      enum: ["equal", "exact", "percentage"],
    },
  },
  { timestamps: true }
);

export const Expense = mongoose.model('Expense', ExpenseSchema);