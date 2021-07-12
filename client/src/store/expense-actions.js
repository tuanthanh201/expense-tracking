import axios from "axios";

import { expenseActions } from "./expense-slice";

// Fetch expenses
export const fetchExpenses = () => {
  return async (dispatch) => {
    dispatch(expenseActions.setLoading(true));
    try {
      const config = {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      };
      const response = await axios.get("/api/expenses", config);
      const expenses = response.data.expenses;
      console.log(expenses);
      dispatch(expenseActions.loadExpense(expenses));
    } catch (error) {
      console.log(error.response.data.msg);
    }
    dispatch(expenseActions.setLoading(false));
  };
};

// Add expense
export const addExpense = (formData) => {
  return async (dispatch) => {
    dispatch(expenseActions.setLoading(true));
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      };
      const body = JSON.stringify(formData);

      const response = await axios.post("/api/expenses", body, config);
      const expenses = response.data.expenses;
      console.log(expenses);
      dispatch(expenseActions.loadExpense(expenses));
    } catch (error) {
      console.log(error);
    }
    dispatch(expenseActions.setLoading(false));
  };
};

// Delete expense
export const deleteExpense = (expenseId) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      };
      const response = await axios.delete(`/api/expenses/${expenseId}`, config);
      const expenses = response.data.expenses;
      dispatch(expenseActions.loadExpense(expenses));
    } catch (error) {
      console.log(error);
    }
  };
};
