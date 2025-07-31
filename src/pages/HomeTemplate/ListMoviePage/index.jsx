import { useState, useEffect } from 'react';
// import axios from 'axios';
import Movie from "./movie";
import { useSelector, useDispatch } from 'react-redux';
import { fetchListMovie } from "./slice";

export default function ListMoviePage() {
    const { data, loading } = useSelector(state => state.listMovieSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchListMovie());
    }, []);

    if (loading) return <p className='text-center text-blue-500'>Đang tải dữ liệu......</p>

    const renderMovies = () => {
        if (data) {
            return data.map((movie) => {
                return <Movie key={movie.maPhim} movie={movie} />;
            });
        }
    };

    return (
        <div className="container mx-auto mb-10 mt-10">
            <h1 className='text-3xl text-green-600 font-bold text-center mb-10'>List Movie Page</h1>
            <div className="grid grid-cols-4 gap-5">
                {renderMovies()}
            </div>

        </div>
    )
}
