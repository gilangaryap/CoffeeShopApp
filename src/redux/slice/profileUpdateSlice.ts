import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { IProfileBody } from "../../models/profile";
import { IUserResponse } from "../../models/response";

export interface IUserState {
  dataUserEdit: IProfileBody[];
  isLoading: boolean;
}

const initialState: IUserState = {
  isLoading: false,
  dataUserEdit: [],
};


const profileUpdateTunk = createAsyncThunk<
  IProfileBody[],
  IProfileBody,
  { rejectValue: { error: Error; status?: number } }
>("createUserTunk", async (params: IProfileBody, { rejectWithValue }) => {
  try {
    const url = `${import.meta.env.VITE_REACT_APP_API_URL}/profile/setting/${params.id}`;
    const result: AxiosResponse<IUserResponse> = await axios.patch(url,{
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

const userEditSlice = createSlice({
  name: "userEdit",
  initialState,
  reducers: {
    submitDataUser: (state, action: PayloadAction<IProfileBody[]>) => {
      state.dataUserEdit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profileUpdateTunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(profileUpdateTunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(profileUpdateTunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataUserEdit = action.payload;
      });
  },
});

export const userEditActions = {
  ...userEditSlice.actions,
  profileUpdateTunk,
};

export type userEditState = ReturnType<typeof userEditSlice.reducer>;
export const userEditReducer = userEditSlice.reducer;
