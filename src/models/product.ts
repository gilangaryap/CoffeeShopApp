import { IBasicResponse } from "./response";

export interface IProductBody {
  uuid: string;
  product_name: string;
  product_price: number;
  product_description: string;
  discount_price: number;
  categorie_name: string;
  img_product: string;
}

export interface IDetailProduct {
  imgProduct: {
    img_1?: string;
    img_2?: string;
    img_3?: string;
    img_4?: string;
  };
  product: {
    uuid?: string;
    count: number;
    product_name?: string;
    product_price: number;
    discount_price: number;
    product_description?: string;
  }

}

export interface ItransactionProduct {
  product_id?: string;
  count: number;
  size_id?: number;
  ice_hot: number;
  delivery_id?: string;
  payment_id?: string;
}

export interface IFilters {
  category?: string;
  sortBy?: string 
  searchText: string;
  min_price: number;
  max_price: number;
}

export interface IProductBody {
  uuid: string;
  image: string;
  product_name: string;
  category: string;
  created_at: string;
  description: string;
  price: number;
}

export interface IProductResponse extends IBasicResponse {
  data: IProductBody[];
}
