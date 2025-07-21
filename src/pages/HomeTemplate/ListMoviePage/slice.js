import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from 'axios';
import api from "../../../services/api";

//Khởi tạo reducer
const initialState = {
    loading: false,
    data: null,
    error: null
}

export const fetchListMovie = createAsyncThunk("listMovie/fetchData", async (__dirname, { rejectWithValue }) => {
    try {
        // const result = await axios({
        //     url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP02",
        //     method: "GET",
        //     headers: {
        //         TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4MyIsIkhldEhhblN0cmluZyI6IjE4LzAxLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc2ODY5NDQwMDAwMCIsIm5iZiI6MTc0MTg4ODgwMCwiZXhwIjoxNzY4ODQ1NjAwfQ.rosAjjMuXSBmnsEQ7BQi1qmo6eVOf1g8zhTZZg6WSx4"
        //     }
        // });

        const result = await api.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP02");
        return result.data.content;
    } catch (error) {
        return rejectWithValue(error);
    }
});

//Phần thân của reducer
const listMovieSlice = createSlice({
    name: "listMovieSlice",
    initialState,
    reducer: {},
    extraReducers: (builder) => {
        builder.addCase(fetchListMovie.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchListMovie.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchListMovie.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});


export default listMovieSlice.reducer;