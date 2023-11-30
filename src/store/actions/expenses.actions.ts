import { ActionsUnion, createAction } from "@martin_hotell/rex-tils";

export enum ExpensesActionType {
  SetExpenses = "[expenses] SetExpenses",
  RemoveExpenseById = "[expenses] RemoveExpenseById",
  RemoveAllExpenses = "[expenses] RemoveAllExpenses",
}

export type Expenses = {
  id: string;
  description: string;
  date: Date;
  amount: string;
};

export const ExpensesActions = {
  setExpenses: (expense: Expenses) => {
    return createAction(ExpensesActionType.SetExpenses, expense);
  },
  removeExpenseById: (id: string) => {
    return createAction(ExpensesActionType.RemoveExpenseById, id);
  },
  removeAllExpenses: () => {
    return createAction(ExpensesActionType.RemoveAllExpenses);
  },
};

export type ExpensesActions = ActionsUnion<typeof ExpensesActions>;
