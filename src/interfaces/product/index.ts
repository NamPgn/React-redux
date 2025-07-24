import { ObjectId } from 'bson';

export interface IProduct {
  _id?: string;
  name?: string;
  slug?: string;
  image?: string;
  link?: string;
  descriptions?: string;
  category?: string;
  categorymain?: string;
  typeId?: string;
  seri?: string;
  options?: string;
  copyright?: string;
  LinkCopyright?: string;
  trailer?: string;
  country?: string;
  year?: string;
  dailyMotionServer?: string;
  video2?: string;
  voiceOverLink?: string;
  voiceOverLink2?: string;
  view?: number;
  uploadDate?: Date;
  isApproved?: boolean;
}

export interface isProductSlice {
  value: {
    data: IProduct[];
    totalCount: number;
    totalPages: number;
  };
  isLoading: boolean;
  getOneProduct: IProduct | {};
  getAllProductByCategory: IProduct[];
  status: boolean;
  voiceOver: {
    voiceOverLink: string;
    voiceOverLink2: string;
    loading: boolean;
    error: string | null;
  };
}