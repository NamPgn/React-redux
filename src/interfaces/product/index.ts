import { ObjectId } from 'bson';

export interface IProduct {
  _id?: ObjectId,
  name: string;
  seri: string;
  image?: string;
  descriptions?: string;
  category?: ObjectId;
  select?: boolean;
  uploadDate: Date;
  options: string;
  link: string;
  copyright: string;
  LinkCopyright: string;
  year: Date;
  country: string;
  comments: any;
  categorymain?: ObjectId;
  typeId?: ObjectId;
}

export interface isProductSlice {
  value: {
    product: string[];
    length: number;
  };
  isLoading: boolean;
  getOneProduct: {};
  getAllProductByCategory: string[];
  status: boolean;
}