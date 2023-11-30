import {
  Expenses,
  ExpensesActionType,
  ExpensesActions,
  // eslint-disable-next-line import/extensions
} from "store/actions/expenses.actions";
import { findIndexById } from "utils";

export interface ExpensesState {
  expenses: Array<Expenses>;
}

const initState = {
  expenses: [],
};

export const expensesReducer = (
  state: ExpensesState = initState,
  action: ExpensesActions,
): ExpensesState => {
  switch (action.type) {
    case ExpensesActionType.SetExpenses:
      // eslint-disable-next-line no-case-declarations
      const currentExpenses = state.expenses;
      currentExpenses.push(action.payload);
      return {
        ...initState,
        expenses: currentExpenses,
      };
    case ExpensesActionType.RemoveExpenseById:
      // eslint-disable-next-line no-case-declarations
      const indexToRemove = findIndexById(state.expenses, action.payload);
      // eslint-disable-next-line no-case-declarations
      const newExpenses: Array<Expenses> = [];

      state.expenses.forEach((item, index) => {
        if (index !== indexToRemove) {
          newExpenses.push(item);
        }
      });
      return {
        ...initState,
        expenses: newExpenses,
      };
    case ExpensesActionType.RemoveAllExpenses:
      return {
        ...initState,
        expenses: [],
      };
    default:
      return state;
  }
};
