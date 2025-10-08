import { Icategory } from "../../interfaces/category";
import intances from "../instances";

export const getAllCategoryAdmin = async (page: number): Promise<Icategory[]> => {
  let url = `/v2/categories?page=${page}`;
  return await intances.get(url); 
};
