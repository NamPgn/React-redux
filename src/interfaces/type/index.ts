import { ObjectId } from "bson";

export interface Itypes {
  _id?: ObjectId;
  name: string;
  categorymain: any;
  path: string;
  back?: string;
  icon?: string;
  products: any;
}