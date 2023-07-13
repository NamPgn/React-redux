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