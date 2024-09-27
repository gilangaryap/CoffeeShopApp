import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { IAuthResponse } from "../../models/response";

export interface IAuthState {
  token: string | null;
  id: string | null;
  isLoading: boolean;
  isRejected: boolean;
  isFulfilled: boolean;
}

const initialState: IAuthState = {
  token: null,
  id: "",
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
};

const loginThunk = createAsyncThunk<
  { token: string; id: string },
  { user_email: string; user_pass: string },
  { rejectValue: { error: Error; status?: number } }
>(
  "auth/login",
  async (
    params: { user_email: string; user_pass: string },
    { rejectWithValue }
  ) => {
    try {
      const url = `${import.meta.env.VITE_REACT_APP_API_URL}/user/login`;
      const result: AxiosResponse<IAuthResponse> = await axios.post(
        url,
        params
      );
      const { token, id } = result.data.data[0];
      return { token, id };
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue({
          error: error.response?.data,
          status: error.status,
        });
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    setId: (state, action: PayloadAction<{ id: string }>) => {
      state.id = action.payload.id;
    },
    removeToken: (state) => {
      state.token = null;
    },
    removeId: (state) => {
      state.id = null; 
    },
    logout: (state) => {
      state.token = null;
      state.id = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.isFulfilled = false;
        state.isRejected = false;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.isLoading = false;
        state.isRejected = true;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.id = payload.id;
        state.isLoading = false;
        state.isFulfilled = true;
      });
  },
});

export const authAction = {
  ...authSlice.actions,
  loginThunk,
};

export type AuthState = ReturnType<typeof authSlice.reducer>;
export default authSlice.reducer;
