import { configureStore } from "@reduxjs/toolkit";
import { snackReducer } from "./slices/SnackSlice";

// Перейменуємо `GameState` на `GameSliceState`, щоб уникнути конфлікту з іншим ім'ям
export const store = configureStore({
  reducer: {
   snack: snackReducer,
  },
});

// Типізація всіх states
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
