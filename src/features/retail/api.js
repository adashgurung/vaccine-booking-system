/* export const validateUserLogin = () => {
  try {
    return {
      success: true,
      data: {
        name: "adash",
      },
    };
  } catch (error) {
    return Promise.reject(error);
  }
};
 */

import { v4 } from "uuid";
//REGISTER NEW USER API
export const registerNewUserAPI = async (payload) => {
  try {
    const { data } = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
      }),
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

//VALIDATE USER LOGIN API
export const validateUserLogin = async (payload) => {
  try {
    const response = await fetch(
      `http://localhost:3000/users?email=${payload.email}&password=${payload.password}`
    );
    const data = await response.json();
    if (data.length > 0) {
      return {
        success: true,
        data: data[0],
      };
    }
    return {
      success: false,
      data: null,
    };
  } catch (error) {
    console.error(error);
  }
};

//FETCH BOOKING BY USER ID
export const fetchBookingsByUserId = async (user_id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/bookings?user_id=${user_id}`
    );
    const data = await response.json();
    if (data.length > 0) {
      return {
        success: true,
        data,
      };
    }
    return {
      success: false,
      data: null,
    };
  } catch (error) {
    console.error(error);
  }
};

//NEW BOOKING API
export const newBookingAPI = async (payload) => {
  try {
    const { data } = await fetch(`http://localhost:3000/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: v4(),
        ...payload,
      }),
    });
    return {
      success: true,
      data,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

/* export const registerNewUserAPI = async (payload) => {
  try {
    const { data } = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
      }),
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}; */

//ADDED
//UPDATE USER PROFILE
export const updateUserProfile = async (payload) => {
  try {
    const { data } = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
      }),
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
