import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilterHistoryOrder, IHistoryOrderBody } from "../../models/historyOrder";
import axios, { AxiosError, AxiosResponse } from "axios";
import { IHistoryResponse } from "../../models/response";

export interface IHistoryOrderState {
  isLoading: boolean;
  history: IHistoryOrderBody[];
  filter: IFilterHistoryOrder[];
}

const initialState: IHistoryOrderState = {
  isLoading: false,
  history: [],
  filter: [],
};

const historyOrderThunk = createAsyncThunk<
  IHistoryOrderBody[],
  IFilterHistoryOrder,
  { rejectValue: { error: Error; status?: number } }
>(
  "historyOrder/fetchHistory",
  async (params: IFilterHistoryOrder, { rejectWithValue }) => {
    try {
      const url = `${import.meta.env.VITE_REACT_APP_API_URL}/transsction/history-order/${params.id}?status=${params.status}`;
      const result: AxiosResponse<IHistoryResponse> = await axios.get(url);
      return result.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          error: error.response?.data,
          status: error.response?.status,
        });
      }
      return rejectWithValue({ error: new Error("An unknown error occurred") });
    }
  }
);

const historySlice = createSlice({
  name: "historyOrder",
  initialState,
  reducers: {
    setHistory: (state, action: PayloadAction<IHistoryOrderBody[]>) => {
      state.history = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(historyOrderThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(historyOrderThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(historyOrderThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.history = action.payload;
      });
  },
});

export const historyOrderActions = {
  ...historySlice.actions,
  historyOrderThunk,
};

export type HistoryOrderState = ReturnType<typeof historySlice.reducer>;
export const historyOrderReducer = historySlice.reducer;
