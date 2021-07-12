const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const Expense = require("../../models/Expense");

// @route    GET api/expense
// @desc     Get current user's expense
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const expense = await Expense.findOne({ user: req.user.id });

    if (!expense) {
      return res
        .status(400)
        .json({ msg: "This user doesn't have any expenses" });
    }

    expense.expenses = expense.expenses.sort((a, b) => a.date - b.date);
    res.json(expense);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/expense/date
// @desc     Get expenses year
// @access   Private
router.get("/date", auth, async (req, res) => {
  try {
    const expense = await Expense.findOne({ user: req.user.id });

    if (!expense) {
      return res.json([]);
    }

    const years = [
      ...new Set(expense.expenses.map((expense) => expense.date.getFullYear())),
    ].sort((a, b) => b - a);
    res.json(years);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/expense/:year
// @desc     Get expenses by year
// @access   Private
router.get("/:year", auth, async (req, res) => {
  try {
    const expense = await Expense.findOne({ user: req.user.id });

    if (!expense) {
      return res.status(400).json({ msg: "Invalid year" });
    }

    const selectedExpense = expense.expenses
      .filter((expense) => expense.date.getFullYear() == req.params.year)
      .sort((a, b) => b.date - a.date);
    res.json(selectedExpense);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/expense
// @desc     Add expense
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required!").not().isEmpty(),
      check("amount", "Amount is required!").isNumeric(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let expense = await Expense.findOne({ user: req.user.id });

      if (!expense) {
        // If user doesn't have any expenses
        expense = new Expense({
          user: req.user.id,
          expenses: [{ ...req.body }],
        });
      } else {
        // If user already has expenses
        expense.expenses.unshift({ ...req.body });
      }
      
      await expense.save();
      expense.expenses = expense.expenses.sort((a, b) => a.date - b.date);
      res.json(expense);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/expense/:expense_id
// @desc     Delete expense
// @access   Private
router.delete("/:expense_id", auth, async (req, res) => {
  try {
    const expense = await Expense.findOne({ user: req.user.id });
    if (!expense) {
      return res.status(400).json({ msg: "Expense not found" });
    }

    expense.expenses = expense.expenses.filter(
      (expense) => expense._id.toString() !== req.params.expense_id
    );
    await expense.save();
    res.json(expense);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
