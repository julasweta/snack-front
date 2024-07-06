import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { gameService, IUser } from "../../services/GameServices";
import { AxiosError } from "axios";

export interface SnackState {
  value: number;
  users: IUser[];
  isGameOver: boolean;
}

const initialState: SnackState = {
  value: 0,
  users: [],
  isGameOver: true,
};

//
const getAllUsers = createAsyncThunk<IUser[], void>(
  "SnackSlice/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await gameService.getAllUsers();
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err);
    }
  }
);

const createUser = createAsyncThunk<IUser, IUser, { rejectValue: AxiosError }>(
  "usersSlice/createUser",
  async (data, { rejectWithValue }) => {
    try {
      console.log("slice", data);
      const response = await gameService.setUser(data);
      return response.data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err);
    }
  }
);

export const SnackSlice = createSlice({
  name: "snack",
  initialState,
  reducers: {
    setIsGameOver: (state) => {
      state.isGameOver = !state.isGameOver;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    }),
});

const { reducer: snackReducer, actions } = SnackSlice;

const snackActions = {
  ...actions,
  getAllUsers,
  createUser,
};

export { snackActions, snackReducer };
