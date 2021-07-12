import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ExpenseList from "../components/Expense/ExpenseList";
import NewExpense from "../components/Expense/NewExpense";
import Spinner from "../components/Layout/Spinner";
import { fetchExpenses, addExpense } from "../store/expense-actions";

function ExpenseMain() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expense.expenses);
  const loading = useSelector((state) => state.expense.loading);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const addExpenseHandler = (expense) => {
    dispatch(addExpense(expense));
  };

  return (
    <div>
      <NewExpense addExpenseHandler={addExpenseHandler}></NewExpense>
      {loading && <Spinner />}
      {!loading && <ExpenseList expenses={expenses}></ExpenseList>}
    </div>
  );
}

export default ExpenseMain;
