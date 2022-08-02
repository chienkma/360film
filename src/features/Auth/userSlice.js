import userApi from "../../api/userApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const register = createAsyncThunk("user/register", async (payload) => {
  const data = await userApi.register(payload);
  console.log(data);

  localStorage.setItem(data.jwt);
  localStorage.setItem(JSON.stringify(data.user));
  return data.user;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: {},
    setting: {},
  },
  reducers: {},
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
