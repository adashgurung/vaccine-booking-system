import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//API CALLS
import {
  fetchBookingsByUserId,
  newBookingAPI,
  registerNewUserAPI,
  validateUserLogin,
  updateUserProfile,
} from "./api";

//Initial STATE
const initialState = {
  info: {},
  activity: {
    loggedIn: false,
  },
  bookings: [],

  snack: {
    open: false,
    duration: 5000,
    severity: "success",
    message: "default message",
    vertical: "top",
    horizontal: "center",
  },
};

//REGISTER NEW USER THUNK
export const registerNewUserThunk = createAsyncThunk(
  "retail/signup",
  async (payload, { rejectWithValue }) => {
    try {
      await registerNewUserAPI(payload);
      // The value we return becomes the `fulfilled` action payload
      return payload;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//USER LOGIN VALIDATE THUNK
export const userLoginThunk = createAsyncThunk(
  "retail/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await validateUserLogin(payload);
      if (response.success) {
        return Promise.resolve(response.data);
      }
      return rejectWithValue("error!!");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//FETCH BOOKING BY USER ID THUNK
export const fetchBookingsOfUserByIdThunk = createAsyncThunk(
  "retail/fetchBookingsByUserId",
  async (user_id, { rejectWithValue }) => {
    try {
      const response = await fetchBookingsByUserId(user_id);
      if (response.success) {
        return Promise.resolve(response.data);
      }
      return rejectWithValue("Fetching bookings failed");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//ADDED
//UPDATE USER PROFILE THUNK
export const updateUserProfileThunk = createAsyncThunk(
  "retail/update-profile",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await updateUserProfile(payload);
      if (response.success) {
        return payload;
      } else return;
      Promise.reject("failed");
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

//NEW BOOKING API THUNK
export const newBookingThunk = createAsyncThunk(
  "retail/new-booking",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await newBookingAPI(payload);
      if (response.success) {
        return payload;
      } else return Promise.reject("Booking Failed");
    } catch (error) {
      // rejectWithValue(error.message);
      return Promise.reject(error);
    }
  }
);

//SELECTORS
export const selectUserInfo = (state) => state.retail.info;
export const selectUserActivity = (state) => state.retail.activity;
export const selectUserBookings = (state) => state.retail.bookings;
export const selectRetailSnackOptions = (state) => state.retail.snack;

//SLICE
const retailSlice = createSlice({
  name: "retail",
  initialState,
  reducers: {
    logout(state) {
      state.info = {};
      state.activity = {
        loggedIn: false,
      };
    },
    retailSnackClose(state) {
      state.snack.open = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerNewUserThunk.fulfilled, (state, action) => {
        state.info = action.payload;
        state.activity.loggedIn = true;
        state.snack = {
          ...state.snack,
          open: true,
          message: "Your Registration was Succesfull",
          severity: "success",
        };
      })
      .addCase(registerNewUserThunk.rejected, (state) => {
        state.activity = {
          loggedIn: false,
        };
        state.snack = {
          ...state.snack,
          open: true,
          message: "Registration Failed!!!",
          severity: "error",
        };
      })

      .addCase(updateUserProfileThunk.fulfilled, (state, action) => {
        console.log("user profile updated");
        state.info = action.payload;
        state.activity.loggedIn = true;
        state.snack = {
          ...state.snack,
          open: true,
          message: "Update Successful",
          severity: "success",
        };
      })
      .addCase(updateUserProfileThunk.rejected, (state, action) => {
        console.log("user profile update failed");
        state.snack = {
          ...state.snack,
          open: true,
          message: "Failed to update",
          severity: "error",
        };

        state.snack = {
          ...state.snack,
          open: true,
          message: "Invalid Creds!!!",
          severity: "error",
        };
      })

      .addCase(userLoginThunk.fulfilled, (state, action) => {
        state.activity = {
          loggedIn: true,
        };
        state.info = action.payload;
        state.snack = {
          ...state.snack,
          open: true,
          //shows user email and login successfull message
          message: `${state.info.email} Login Succesfull.`,
          severity: "success",
        };
      })
      .addCase(userLoginThunk.rejected, (state, action) => {
        state.activity.loggedIn = false;
        state.snack = {
          ...state.snack,
          open: true,
          message: "Invalid Creds!!!",
          severity: "error",
        };
      })
      .addCase(fetchBookingsOfUserByIdThunk.fulfilled, (state, action) => {
        state.bookings = action.payload;
      })

      .addCase(newBookingThunk.fulfilled, (state, action) => {
        console.log("newbooking success");
        state.snack = {
          ...state.snack,
          open: true,
          message: "New Booking is Successful",
          severity: "success",
        };
      })
      .addCase(newBookingThunk.rejected, (state, action) => {
        state.snack = {
          ...state.snack,
          open: true,
          message: "Error in new booking",
          severity: "error",
        };
      });
  },
});

export const { logout, retailSnackClose } = retailSlice.actions;
export default retailSlice.reducer;
