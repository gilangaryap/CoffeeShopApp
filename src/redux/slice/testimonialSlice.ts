import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ITestimonialBody } from "../../models/testimonial";
import { ITestimonialResponse } from "../../models/response";

export interface ITestimonialState {
  dataTesti: ITestimonialBody[];
  isLoading: boolean;
}

const initialState: ITestimonialState = {
  isLoading: false,
  dataTesti: [],
};

export const getTestimonialThunk = createAsyncThunk<
  ITestimonialBody[],
  undefined,
  { rejectValue: { error: Error; status?: number } }
>("testimonial/getTestimonial",
  async (_, { rejectWithValue }) => {
    try {
      const url = `http://localhost:8080/user/testimonial`;
      const response: AxiosResponse<ITestimonialResponse> = await axios.get(url);
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          error: error.response?.data ?? error.message,
          status: error.response?.status,
        });
      }
      throw error;
    }
  }
);

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTestimonialThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getTestimonialThunk.fulfilled,
        (state, action: PayloadAction<ITestimonialBody[]>) => {
          state.isLoading = false;
          state.dataTesti = action.payload;
        }
      )
      .addCase(getTestimonialThunk.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const testiActions = {
  ...testimonialSlice.actions,
  getTestimonialThunk,
};

export type TestimonialState = ReturnType<typeof testimonialSlice.reducer>;
export const testimonialReducer = testimonialSlice.reducer;