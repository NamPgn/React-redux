export interface Iusers {
  _id?: string;
  username: string;
  password: string | undefined;
  cart?: any;
  role?: number | string | undefined;
}