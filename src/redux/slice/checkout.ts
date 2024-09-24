import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItransactionProduct } from "../../models/product";

export interface IProductState {
    checkout: ItransactionProduct[];
  }
  
  const initialState: IProductState = {
    checkout: [],
  };

const checkoutSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        checkoutProduct: (state , action: PayloadAction<ItransactionProduct> ) => 
          {
            const newCheckout = [...state.checkout];
            const index = newCheckout.findIndex(
              (product) =>
                product.product_id === action.payload.product_id &&
                product.size_id === action.payload.size_id &&
                product.ice_hot === action.payload.ice_hot
            );
            // findIndex return -1 kalo tidak ada yang sama diatas
            if (index > -1) {
              const selectedCheckout = {...newCheckout[index]}
              selectedCheckout.count += 1;
              newCheckout[index] = selectedCheckout;
              state.checkout = newCheckout
            } else {
              newCheckout.push (action.payload)
              state.checkout = newCheckout            
            }
        },
        removeProduct: (state, action: PayloadAction<number>) => {
          const newCheckout = state.checkout.filter((_, index) => index !== action.payload)
          state.checkout = newCheckout
        }
    },
    extraReducers: () => {},
  });

  export const checkoutAction = {
    ...checkoutSlice.actions,
  };
  export type checkoutState = ReturnType<typeof checkoutSlice.reducer>;
  export const checkoutReducer = checkoutSlice.reducer;
  