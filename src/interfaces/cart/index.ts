import { ObjectId } from 'bson';

export interface Icart {
  _id?: ObjectId;
  user: any;
  product: any;
}