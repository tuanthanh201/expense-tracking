import { useState } from "react";

import Card from "../Layout/Card";
import ExpensesFilter from "./ExpenseFilter";
import Expenses from "./Expenses"
import ExpensesChart from "./ExpensesChart";
import "./ExpenseList.css";

function ExpenseList(props) {
  const [year, setYear] = useState("2021");

  const onFilter = (year) => {
    console.log(year);
    setYear(year);
  };

  const filteredExpenses = props.expenses.filter(
    (expense) => new Date(expense.date).getFullYear().toString() === year
  );

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter year={year} onFilter={onFilter}></ExpensesFilter>
        <ExpensesChart expenses={filteredExpenses}></ExpensesChart>
        <Expenses items={filteredExpenses}></Expenses>
      </Card>
    </div>
  );
}

export default ExpenseList;
