import { ObjectId } from "bson";

export interface IcategoryM {
  _id?: ObjectId;
  name: string;
  des: string;
  products: any;
  type: string;
  typeId?: any;
}