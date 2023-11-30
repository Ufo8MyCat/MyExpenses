import { createSelector } from "reselect";
import { AppState } from "store/reducers";

export const getExpenseState = (state: AppState) => state.expenses;

export const getExpenses = createSelector([getExpenseState], (state) => {
  return state.expenses?.sort(
    (objA, objB) => Number(objA.date) - Number(objB.date),
  );
});

export const getTotalItem = createSelector([getExpenseState], (state) => {
  return state.expenses?.length;
});

export const getTotalExpenses = createSelector([getExpenseState], (state) => {
  let totalExpense = 0;
  if (state.expenses?.length) {
    state.expenses.forEach((item) => {
      totalExpense += Number(item.amount);
    });
    return totalExpense;
  }
  return totalExpense;
});
