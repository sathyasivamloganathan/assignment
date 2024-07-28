import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateBalanceSheet = (expenses, userId, res) => {
  const doc = new PDFDocument();
  const filePath = path.join(__dirname, "../tmp", "balance_sheet.pdf");

  let totalAmount = 0;
  let individualExpenses = [];

  // Calculate the total amount and individual expenses
  expenses.forEach((expense) => {
    expense.participants.forEach((participant) => {
      if (participant.user._id.toString() === userId.toString()) {
        individualExpenses.push({
          description: expense.description,
          paidBy: expense.paidBy.name,
          totalAmount: expense.amount,
          myShare: participant.amount,
        });
        totalAmount += participant.amount;
      }
    });
  });

  // Ensure the directory exists
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Pipe the PDF into a file
  doc.pipe(fs.createWriteStream(filePath));

  // Add title
  doc.fontSize(20).text("Balance Sheet", { align: "center" });
  doc.moveDown();

  // Add overall expenses
  doc
    .fontSize(16)
    .text(`Total Amount Spent: ${totalAmount.toFixed(2)}`, { align: "left" });
  doc.moveDown();

  // Add individual expenses
  individualExpenses.forEach((expense, index) => {
    doc.fontSize(14).text(`Expense ${index + 1}`, { underline: true });
    doc.fontSize(12).text(`Description: ${expense.description}`);
    doc.text(`Paid By: ${expense.paidBy}`);
    doc.text(`Total Amount: ${expense.totalAmount}`);
    doc.text(`My Share: ${expense.myShare}`);
    doc.moveDown();
  });

  // Finalize the PDF and end the stream
  doc.end();

  // Send the PDF file in response
  doc.on("finish", () => {
    res.download(filePath, (err) => {
      if (err) {
        console.error(err);
      }
      // Optionally delete the file after sending it
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  });
};

export default generateBalanceSheet;
