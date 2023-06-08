export interface IProduct {
  _id?: string;
  name: string;
  seri: number;
  image?: string;
  descriptions?: string;
  category?: string;
  select?: boolean;
  uploadDate: Date;
  options: string;
  link: string;
  copyright: string;
  LinkCopyright: string;
  year: Date;
  country: string;
  comments: any;
  categorymain?: string;
  typeId?: string;
}