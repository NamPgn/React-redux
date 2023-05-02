import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { editTrailer } from "../../api/trailer";

export const editTrailerSlice = createAsyncThunk(
  'trailer/Trailing',
  async (dataEdit) => {
    const { data } = await editTrailer(dataEdit);
    return data
  }
)
const postSlice = createSlice({
  name: "post",
  initialState: {
    value: [],
    trailerValues: [],
  },
  extraReducers: (builder) => {
    builder.addCase(editTrailerSlice.fulfilled, (state, action) => {
      state.trailerValues.push(action.payload);
    })
  }
})

export default postSlice.reducer