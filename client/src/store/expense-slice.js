import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  loading: false,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialState,
  reducers: {
    loadExpense(state, action) {
      state.expenses = action.payload;
    },
    resetExpense(state) {
      state.expenses = [];
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
