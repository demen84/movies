import { useState, useEffect } from 'react';
// import axios from 'axios';
import Movie from "./Movie";
import { useSelector, useDispatch } from 'react-redux';
import { fetchListMovie } from "./slice";

export default function ListMoviePage() {

    // const [state, setState] = useState({
    //     loading: false,
    //     data: null,
    //     error: null
    // });
    const { data, loading } = useSelector(state => state.listMovieSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        // const fetchListMovie = async () => {
        //     try {
        //         //Loading
        //         setState({
        //             loading: true,
        //             data: null,
        //             error: null
        //         });
        //         const result = await axios({
        //             url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP02",
        //             method: "GET",
        //             headers: {
        //                 TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4MyIsIkhldEhhblN0cmluZyI6IjE4LzAxLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc2ODY5NDQwMDAwMCIsIm5iZiI6MTc0MTg4ODgwMCwiZXhwIjoxNzY4ODQ1NjAwfQ.rosAjjMuXSBmnsEQ7BQi1qmo6eVOf1g8zhTZZg6WSx4"
        //             }
        //         });

        //         // console.log(result);
        //         setState({
        //             loading: false,
        //             data: result.data.content,
        //             error: null
        //         });
        //     } catch (error) {
        //         // console.log(error);
        //         setState({
        //             loading: false,
        //             data: null,
        //             error: error
        //         });
        //     }
        // };
        // fetchListMovie();
        dispatch(fetchListMovie());
    }, []);

    // const { data, loading } = state;


    if (loading) return <p>Loading......</p>

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
