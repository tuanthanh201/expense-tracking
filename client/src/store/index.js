import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import expenseSlice from "./expense-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice,
    expense: expenseSlice,
  },
});

export default store;
