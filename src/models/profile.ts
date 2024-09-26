export interface IProfileBody {
  id: string;
  token?: string;
  profile_image?: string;
  full_name?: string;
  phone_number?: string;
  address?: string;
  user_email?: string;
  role?: string;
  created_at?:string;
} 

export interface IProfileParams {
  id: string;
  token: string;
}