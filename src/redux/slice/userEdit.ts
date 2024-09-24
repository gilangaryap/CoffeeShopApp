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

const userEditTunk = createAsyncThunk<
  IProfileBody[],
  IProfileBody,
  { rejectValue: { error: Error; status?: number } }
>("createUserTunk", async (params: IProfileBody, { rejectWithValue }) => {
  try {
    const url = `http://localhost:8080/user/update/${params.id}`;
    console.log(url)
    const result: AxiosResponse<IUserResponse> = await axios.patch(url, params);

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
      .addCase(userEditTunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userEditTunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(userEditTunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataUserEdit = action.payload;
      });
  },
});

export const userEditActions = {
  ...userEditSlice.actions,
  userEditTunk,
};

export type userEditState = ReturnType<typeof userEditSlice.reducer>;
export const userEditReducer = userEditSlice.reducer;
