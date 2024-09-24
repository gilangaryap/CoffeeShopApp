import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { IAuthResponse } from "../../models/response";

export interface IAuthState {
  token: string | null;
  uuid: string | null;
  id: number | null;
  isLoading: boolean;
  isRejected: boolean;
  isFulfilled: boolean;
}

const initialState: IAuthState = {
  token: null,
  uuid: null,
  id: null ,
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
};

const loginThunk = createAsyncThunk<
  { token: string; uuid: string; id: number },
  { user_email: string; user_pass: string },
  { rejectValue: { error: Error; status?: number } }
>("auth/login", async (form, { rejectWithValue }) => {
  try {
    const url = "http://localhost:8080/user/login";
    const result: AxiosResponse<IAuthResponse> = await axios.post(url, form);
    const { token, id , uuid } = result.data.data[0];
    console.log({ token, id , uuid });
    return { token, id , uuid };
  } catch (error) {
    if (error instanceof AxiosError)
      return rejectWithValue({
        error: error.response?.data,
        status: error.status,
      });
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    setId: (state, action: PayloadAction<{ id: number }>) => {
      state.id = action.payload.id;
    },
    setUuid: (state, action: PayloadAction<{ uuid: string }>) => {
      state.uuid = action.payload.uuid;
    },
    removeToken: (state) => {
      state.token = null;
    },
    removeUuid: (state) => {
      state.uuid = null;
    },
    removeId: (state) => {
      state.id = null;
    },
    logout: (state) => {
      state.token = null;
      state.uuid = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.isFulfilled = false;
        state.isRejected = false;
      })
      .addCase(loginThunk.rejected, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.isRejected = true;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.uuid = payload.uuid;
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
