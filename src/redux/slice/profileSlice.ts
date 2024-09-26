import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { IProfileBody, IProfileParams } from "../../models/profile";
import { IUserResponse } from "../../models/response";

export interface IProfileState {
  dataProfile: IProfileBody[];
  isLoading: boolean;
}

const initialState: IProfileState = {
  isLoading: false,
  dataProfile: [],
};

const getDetailUser = createAsyncThunk<IProfileBody[],IProfileParams,{ rejectValue: { error: Error; status?: number } }>("productThunk", async (params: IProfileParams, { rejectWithValue }) => {
  try {
    const url = `${import.meta.env.VITE_REACT_APP_API_URL}/profile/${params.id}`;
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

const profileSlice = createSlice({
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
  ...profileSlice.actions,
  getDetailUser,
};

export type ProfileState = ReturnType<typeof profileSlice.reducer>;
export const userReducer = profileSlice.reducer;
