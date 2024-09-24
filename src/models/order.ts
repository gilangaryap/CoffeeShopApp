export interface IOrderBody {
  id: string;
  uuid: string;
  image: string;
  size: string;
  product_name: string;
  qty: number;
  price: number;
  full_name: string;
  address?: string;
  phone?: string;
  payment_method: string;
  delivery_method: string;
  status: string;
  grand_total: string;
}
