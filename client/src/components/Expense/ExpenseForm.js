import { useState } from "react";

import "./ExpenseForm.css";

function ExpenseForm(props) {
  /* can also use just one state by using object, so like 
    {
      enteredTitle: "",
      enteredAmount: "",
      enteredDate: "",
    }
  and then update it using the spread operator, i.e. 
    setUserInput({
      ...userInput,
      enteredTitle: event.target.value,
    })
  then again, that might cause problems since it depends on the 
  previous state, so a better way is to do it like this
    setUserInput((prevState) => {
      return { ...prevState, enteredTitle: event.target.value };
    })
  */

  // Initalize some variables
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  // Managing the state of the dropdown
  const [isAdding, setIsAdding] = useState(false);

  const addClickedHandler = (event) => {
    event.preventDefault();
    setIsAdding(true);
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    setIsAdding(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
    };

    // Reset the input using two-way binding
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
    props.onSaveExpenseData(expenseData);
    setIsAdding(false);
  };

  // Managing what is returned
  if (!isAdding) {
    return (
      <form onSubmit={addClickedHandler}>
        <div>
          <button type="submit">Add New Expense</button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            required
            onChange={titleChangeHandler}
          ></input>
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            required
            onChange={amountChangeHandler}
          ></input>
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2025-12-31"
            value={enteredDate}
            required
            onChange={dateChangeHandler}
          ></input>
        </div>
      </div>
      <div className="new-expense__actions">
        <button onClick={cancelHandler}>Cancel</button>
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
}

export default ExpenseForm;
