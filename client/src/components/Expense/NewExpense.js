import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

function NewExpense(props) {
  const onSaveExpenseData = (expenseData) => {
    props.addExpenseHandler(expenseData);
  };

  return (
    <div className="new-expense">
      <ExpenseForm onSaveExpenseData={onSaveExpenseData}></ExpenseForm>
    </div>
  );
}

export default NewExpense;
