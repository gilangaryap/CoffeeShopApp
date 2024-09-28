import { IHistoryOrderBody } from "./historyOrder";
import { IDetailProduct, IProductBody } from "./product";
import { IProfileBody } from "./profile";
import { IPromoBody } from "./promo";
import { ITestimonialBody } from "./testimonial";
import { IUserBody } from "./user";

interface IPaginationMeta {
  totalData?: number;
  totalPage?: number;
  page: number;
  prevLink: string | null;
  nextLink: string | null;
}

export interface IBasicResponse {
  msg: string;
  data: unknown;
  err?: string;
  meta?: IPaginationMeta;
}

export interface IAuthResponse extends IBasicResponse {
  data: Array<{
    token: string;
    id: string;
  }>;
}

export interface IUserResponse extends IBasicResponse {
  data: IProfileBody[];
}

export interface IPromoResponse extends IBasicResponse {
  data: IPromoBody[];
}

export interface IRegisterResponse extends IBasicResponse {
  data: IUserBody[];
}

export interface IProductDetailResponse extends IBasicResponse {
  data: IDetailProduct;
}

export interface ITestimonialResponse extends IBasicResponse {
  data: ITestimonialBody[];
}

export interface IHistoryResponse extends IBasicResponse{
  data: IHistoryOrderBody[];
  prevLink: string | null;
  nextLink: string | null;
  currentPage: number;
  totalPages: number;
}

export interface IProductResponse extends IBasicResponse {
  data: IProductBody[];
  prevLink: string | null;
  nextLink: string | null;
  currentPage: number;
  totalPages: number;
}