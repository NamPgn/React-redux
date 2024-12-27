import { createAsyncThunk } from "@reduxjs/toolkit";
import intances from "../../../sevices/instances";

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (
    { key, id, page }: { key: string; id?: string; page?: number },
    { rejectWithValue }
  ) => {
    try {
      const url = id
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${key}/${id}?page=${
            page || 1
          }`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${key}?page=${page || 1}`;

      const response = await intances.get(url);
      return response.data.data;    
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
