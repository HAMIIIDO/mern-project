import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";
const initialState = {
  goals: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

// create new goal
export const createGoal = createAsyncThunk(
  "goals/create",
  async (goalData, thankAPI) => {
    try {
      const token = thankAPI.getState().auth.user.token;
      return await goalService.createGoal(goalData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.resonse.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
});

export const reset = goalSlice.actions;
export default goalSlice.reducer;
