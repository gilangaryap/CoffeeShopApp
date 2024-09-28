import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilterHistoryOrder, IHistoryOrderBody } from "../../models/historyOrder";
import axios, { AxiosError, AxiosResponse } from "axios";
import { IHistoryResponse } from "../../models/response";
import { IPagination } from "../../models/pagination";

export interface IHistoryOrderState {
  isLoading: boolean;
  history: IHistoryOrderBody[];
  filter: IFilterHistoryOrder[];
  pagination: IPagination;
}

const initialState: IHistoryOrderState = {
  isLoading: false,
  history: [],
  filter: [],
  pagination: {
    prevLink: null,
    nextLink: null,
    currentPage: 1,
    totalPages: 1,
  },
};

const historyOrderThunk = createAsyncThunk<
  { history: IHistoryOrderBody[]; pagination: IPagination },
  { filters: IFilterHistoryOrder; currentPage: number; productsPerPage: number },
  { rejectValue: { error: Error; status?: number } }
>(
  "historyOrder/fetchHistory",
  async (params, { rejectWithValue }) => {
    try {
      const { filters, currentPage, productsPerPage } = params;
      const url = `${import.meta.env.VITE_REACT_APP_API_URL}/transsction/history-order/${filters.id}?status=${filters.status}&limit=${productsPerPage}&page=${currentPage}`;
      
      const result: AxiosResponse<IHistoryResponse> = await axios.get(url);

      return {
        history: result.data.data,
        pagination: {
          totalData: result.data.meta?.totalData || 0,
          totalPages: result.data.meta?.totalPage || 1,
          prevLink: result.data.meta?.prevLink || null,
          nextLink: result.data.meta?.nextLink || null,
          currentPage,
        },
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          error: error.response?.data || new Error("An error occurred"),
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
        state.history = action.payload.history;
        state.pagination = action.payload.pagination;
      });
  },
});

export const historyOrderActions = {
  ...historySlice.actions,
  historyOrderThunk,
};

export type HistoryOrderState = ReturnType<typeof historySlice.reducer>;
export const historyOrderReducer = historySlice.reducer;
