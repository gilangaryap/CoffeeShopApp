import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { IUserBody } from "../../models/user";
import { IRegisterResponse } from "../../models/response";

export interface IUserState {
  dataUser: IUserBody[];
  isLoading: boolean;
}

const initialState: IUserState = {
  isLoading: false,
  dataUser: [],
};

const createUserTunk = createAsyncThunk<
  IUserBody[],
  IUserBody,
  { rejectValue: { error: Error; status?: number } }
>("createUserTunk", async (params:IUserBody, { rejectWithValue }) => {
  try {
    const url = `http://localhost:8080/user/register`;
    const result: AxiosResponse<IRegisterResponse> = await axios.post(url,params);

    return result.data.data;
  } catch (error) {
    if (error instanceof AxiosError)
      return rejectWithValue({
        error: error.response?.data,
        status: error.status,
      });
    throw error;
  }
});

const userSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<IUserBody[]>) => {
      state.dataUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserTunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUserTunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createUserTunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataUser = action.payload;
      });
  },
});


export const userActions = {
  ...userSlice.actions,
  createUserTunk,
};

export type registerState = ReturnType<typeof userSlice.reducer>;
export const registerReducer = userSlice.reducer;
