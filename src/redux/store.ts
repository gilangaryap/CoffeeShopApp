import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { PersistConfig } from "redux-persist/lib/types";
import storage from "redux-persist/lib/storage";

import authReducer, { AuthState } from "./slice/authSlice";
import { productReducer, productState } from "./slice/productSlice";
import { ProfileState, userReducer } from "./slice/profileSlice";
import { promoReducer } from "./slice/promoSlice";
import { registerReducer } from "./slice/createUserSlice";
import { userEditReducer } from "./slice/profileUpdateSlice";
import { productDetailReducer } from "./slice/productDetailSlice";
import { checkoutReducer, checkoutState } from "./slice/checkout";
import { testimonialReducer } from "./slice/testimonialSlice";

const authPersistConfig: PersistConfig<AuthState> = {
  key: "token",
  storage,
  whitelist: ["token"  , "id" ],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const profilePersistConfig: PersistConfig<ProfileState> = {
  key: "profile",
  storage,
  whitelist: ["token","id"]
}

const persistedProfileReducer = persistReducer(profilePersistConfig, userReducer);

const productPersistConfig: PersistConfig<productState> = {
  key: "product:coffee",
  storage,
  whitelist: [ "id" , "uuid" ],
};

const persistedProductReducer = persistReducer(productPersistConfig, productReducer);

const checkoutPersistConfig: PersistConfig<checkoutState> = {
  key: "root",
  storage
};

const persistedCheckoutReducer = persistReducer(checkoutPersistConfig , checkoutReducer)

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    register: registerReducer,
    product: persistedProductReducer,
    productDetail: productDetailReducer,
    profile: persistedProfileReducer,
    promo: promoReducer,
    userEdit: userEditReducer,
    checkout: persistedCheckoutReducer,
    testi: testimonialReducer,
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware({
    serializeableCheck: false,
    immutableCheck: false
  })
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
