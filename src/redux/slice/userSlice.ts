import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { IProfileBody, IUsersParams } from "../../models/profile";
import { IUserResponse } from "../../models/response";

export interface IProfileState {
  dataProfile: IProfileBody[];
  isLoading: boolean;
}

const initialState: IProfileState = {
  isLoading: false,
  dataProfile: [],
};

const getDetailUser = createAsyncThunk<
  IProfileBody[],
  IUsersParams,
  { rejectValue: { error: Error; status?: number } }
>("productThunk", async (params: IUsersParams, { rejectWithValue }) => {
  try {
    const url = `http://localhost:8080/user/account/${params.uuid}`;
    const result: AxiosResponse<IUserResponse> = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    });
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
    setDataProfile: (state, action: PayloadAction<IProfileBody[]>) => {
      state.dataProfile = action.payload;
    },
    resetDataProfile: (state) => {
      state.dataProfile = initialState.dataProfile;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDetailUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDetailUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getDetailUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataProfile = action.payload;
      });
  },
});


export const profileActions = {
  ...userSlice.actions,
  getDetailUser,
};

export type userState = ReturnType<typeof userSlice.reducer>;
export const userReducer = userSlice.reducer;
