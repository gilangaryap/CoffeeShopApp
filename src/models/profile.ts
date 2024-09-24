export interface IProfileBody {
  id: number;
  avatar?: string;
  username?: string;
  full_name?: string;
  user_phone?: string;
  user_email?: string;
  created_at?: string;
  address?: string;
} 

export interface IUsersParams {
  uuid: string;
  token: string;
}