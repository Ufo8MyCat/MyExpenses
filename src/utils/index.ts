/* eslint-disable import/extensions */
import uuid from "react-native-uuid";
import { Expenses } from "store/actions/expenses.actions";
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getUUID = () => {
  return uuid.v4().toString();
};

export const findIndexById = (arr: Array<Expenses>, id: string) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return i; // Return the index if the ID matches
    }
  }
  return -1; // Return -1 if the ID is not found in the array
};
