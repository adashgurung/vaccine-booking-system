import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { validateUserLogin } from "./api";

const initialState = {
  activity: {
    loggedIn: false,
  },

  info: {},
};

//Redux-Thunk
export const userLoginThunk = createAsyncThunk(
  "retail/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await validateUserLogin(payload);

      if (response.success) {
        return response.data;
      } else {
        rejectWithValue("no no no!!");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Selectors
//select only some part of state rather than selecting all the state
export const selectUserInfo = (state) => state.retail.info;
export const selectUserActivity = (state) => state.retail.activity;

export const retailSlice = createSlice({
  name: "retail",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(userLoginThunk.fulfilled, (state, action) => {
      state.activity.loggedIn = true;
      state.info.name = action.payload.name;
    });
  },
});

//export default retailSlice.reducer;

const RetailReducer = retailSlice.reducer;
export default RetailReducer;
