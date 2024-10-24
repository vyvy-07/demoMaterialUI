export interface User {
  _id: string;
  email: string;
  fullName: string;
  password: string;
  phone: string;
  token: string;
  refreshToken: string;
  isAdmin: boolean;
}
export interface PayloadLogin {
  fullName?: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
export interface PayloadCreateProduct {
  name?: string;
  slug?: string;

  image?: string;
  type?: string;

  price?: number;
  rating?: number;

  quantity?: number;
  description?: string;
}
export interface dataRespone {
  status?: string;
  message?: string;
}
