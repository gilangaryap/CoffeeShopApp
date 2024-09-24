import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { IPromoBody } from "../../models/promo";
import { IPromoResponse } from "../../models/response";

export interface IPromoState {
  dataPromo: IPromoBody[];
  isLoading: boolean;
}

const initialState: IPromoState = {
  isLoading: false,
  dataPromo: [],
};

  
const getPromoTunk = createAsyncThunk<
  IPromoBody[],
  undefined,
  { rejectValue: { error: Error; status?: number } }
>("productThunk", async (_,  {rejectWithValue} ) => {
  try {
    const url = `http://localhost:8080/promo`;
    const result: AxiosResponse<IPromoResponse> = await axios.get(url);
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

const promoSlice = createSlice({
  name: "promo",
  initialState,
  reducers: {
    setDataPromo: (state, action: PayloadAction<IPromoBody[]>) => {
      state.dataPromo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPromoTunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPromoTunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getPromoTunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataPromo = action.payload;
      });
  },
});

export const promoActions = {
  ...promoSlice.actions,
  getPromoTunk,
};

export type promoState = ReturnType<typeof promoSlice.reducer>;
export const promoReducer = promoSlice.reducer;
