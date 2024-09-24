import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import {
  IFilters,
  IPagination,
  IProductBody,
  IProductResponse,
} from "../../models/product";

export interface IProductState {
  filter: IFilters;
  uuid: string;
  isLoading: boolean;
  product: IProductBody[];
  orderTotal: number;
  pagination: IPagination;
}

const initialState: IProductState = {
  filter: {
    category: "",
    sortBy: "",
    max_price: 0,
    min_price: 0,
    searchText: "",
  },
  uuid: "",
  isLoading: false,
  product: [],
  orderTotal: 0,
  pagination: {
    prevLink: null,
    nextLink: null,
    currentPage: 1,
    totalPages: 1,
  },
};

export const productThunk = createAsyncThunk<{
  products: IProductBody[];
  pagination: IPagination;
}, { filters: IFilters; currentPage: number; productsPerPage: number }, { rejectValue: { error: Error; status?: number } }>(
  "product/fetch",
  async ({ filters, currentPage, productsPerPage }, { rejectWithValue }) => {
    try {
      const url = `http://localhost:8080/product`;
      const result: AxiosResponse<IProductResponse> = await axios.get(url, {
        params: { ...filters, page: currentPage, limit: productsPerPage },
      });
      return {
        products: result.data.data,
        pagination: {
          totalData: result.data.meta?.totalData || 0,
          totalPages: result.data.meta?.totalPage || 1,
          prevLink: result.data.meta?.prevLink || null,
          nextLink: result.data.meta?.nextLink || null,
          currentPage,
        },
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          error: error.response?.data,
          status: error.response?.status,
        });
      }
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setFilter: (state, { payload }: PayloadAction<IFilters>) => {
      state.filter = payload;
    },
    setProduct: (state, { payload }: PayloadAction<IProductState>) => {
      state.product = payload.product;
    },
    setPagination: (state, { payload }: PayloadAction<IPagination>) => {
      state.pagination = payload;
    },
    deleteProducts: (state) => {
      state.product = initialState.product;
    },
    resetFilter(state) {
      state.filter = initialState.filter;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(productThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(productThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.uuid = action.meta.requestId; // Use requestId for unique identifier
        state.product = action.payload.products;
        state.pagination = action.payload.pagination;
      });
  },
});

export const productAction = {
  ...productSlice.actions,
  productThunk,
};
export type productState = ReturnType<typeof productSlice.reducer>;
export const productReducer = productSlice.reducer;
