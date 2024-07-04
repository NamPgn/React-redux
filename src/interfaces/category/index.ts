import { ObjectId } from "bson";

export interface Icategory {
  _id?: ObjectId;
  name: string;
  linkImg?: string;
  des: string;
  sumSeri: string | number;
  products: any;
  type: string;
}

export interface isCategorysSlice {
  category: {
    data: string[];
    length: number;
  };
  isError: boolean;
  isLoading: boolean;
  categoryNotReqId: string[];
  details: {};
}
