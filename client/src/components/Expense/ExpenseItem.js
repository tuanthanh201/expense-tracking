import { useDispatch } from "react-redux";

import Card from "../Layout/Card";
import ExpenseDate from "./ExpenseDate";
import { deleteExpense } from "../../store/expense-actions";
import "./ExpenseItem.css";

function ExpenseItem(props) {
  const dispatch = useDispatch();

  const deleteExpenseHandler = () => {
    dispatch(deleteExpense(props.id));
  };

  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.date}></ExpenseDate>
        <div className="expense-item__description">
          <h2>{props.title}</h2>
          <div className="expense-item__price">${props.amount}</div>
          <button className="delete-button" onClick={deleteExpenseHandler}>
            Delete
          </button>
        </div>
      </Card>
    </li>
  );
}

export default ExpenseItem;
