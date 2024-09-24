import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { IDetailProduct } from "../../models/product";
import { IProductDetailResponse } from "../../models/response";

export interface IProductState {
  isLoading: boolean;
  productDetail: IDetailProduct;
}

const initialState: IProductState = {
  isLoading: false,
  productDetail: {
    imgProduct: {
      img_1: '',
      img_2: '',
      img_3: '',
      img_4: '',
    },
    product: {
      uuid: '',
      count: 0,
      product_name: '',
      product_price: 0,
      discount_price: 0,
      product_description: '',
    }
  
  },
};

const productDetailThunk = createAsyncThunk<IDetailProduct,{ uuid: string; token: string },{ rejectValue: { error: Error; status?: number } }>("productThunk",async (params: { uuid: string; token: string }, { rejectWithValue }) => {
    try {
      const url = `http://localhost:8080/product/detail/${params.uuid}`;
      const result: AxiosResponse<IProductDetailResponse> = await axios(url, {
        method: "GET",
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
  }
);

/* 
const producDetailtSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    getProductDetail: (state, action) => {
      const existingProduct = state.productDetail.find(
        (product: {
          uuid?: string;
          size_id?: number;
          delivery_id?: number;
          payment_id?: number;
          ice_hot?: number;
        }) =>
          product.uuid === action.payload.uuid &&
          product.size_id === action.payload.size_id &&
          product.delivery_id === action.payload.delivery_id &&
          product.payment_id === action.payload.payment_id &&
          product.ice_hot === action.payload.ice_hot
      );
      if (existingProduct ) {
        existingProduct.count += 1;
      } else {
        state.productDetail.push(action.payload);
      }
      state.orderTotal = state.productDetail.reduce(
        (total, product) => total + product.product_price * product.count,
        0
      );
    },
    deleteProducts: (state, action: PayloadAction<number>) => {
      state.productDetail = state.productDetail.filter(
        (_, index) => index !== action.payload
      );
      state.orderTotal = state.productDetail.reduce(
        (total, product) => total + product.product_price * product.count,
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productDetailThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(productDetailThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(productDetailThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetail = action.payload;
      });
  },
});
 */

const producDetailtSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setProductDetail: (state, action: PayloadAction<IDetailProduct>) => {
      state.productDetail = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(productDetailThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(productDetailThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(productDetailThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetail = action.payload;
      });
  },
});

export const producDetailtAction = {
  ...producDetailtSlice.actions,
  productDetailThunk,
};
export type productDetailState = ReturnType<typeof producDetailtSlice.reducer>;
export const productDetailReducer = producDetailtSlice.reducer;
