import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { IFilters, IProductBody, IProductResponse } from "../../models/product";

export interface IProductState {
  filter: IFilters;
  uuid: string;
  isLoading: boolean;
  product: IProductBody[];
  orderTotal: number;
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
};

const productThunk = createAsyncThunk<
  IProductBody[],
  IFilters,
  { rejectValue: { error: Error; status?: number } }
>("productThunk", async (params: IFilters, { rejectWithValue }) => {
  try {
    const url = `http://localhost:8080/product`;
    const result: AxiosResponse<IProductResponse> = await axios(url, {
      method: "GET",
      params: params,
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

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload
    },
    deleteProducts: (state) => {
      state.product = initialState.product
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
        state.product = action.payload;
        state.uuid = action.type;
      });
  },
});

export const productAction = {
  ...productSlice.actions,
  productThunk,
};
export type productState = ReturnType<typeof productSlice.reducer>;
export const productReducer = productSlice.reducer;
