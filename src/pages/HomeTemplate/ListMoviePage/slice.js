//Tạo ra reducer
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Khởi tạo reducer
const initialState = {
    loading: false,
    data: null,
    error: null
};

//Tạo phần thân reducer
const listMovieSlice = createSlice({
    name: "listMovieSlice",
    initialState,
    reducer: {},
});

//export
export default listMovieSlice.reducer;

