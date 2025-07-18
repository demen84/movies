import { useEffect, useState, useSyncExternalStore } from 'react';
import Movie from "./Movie";
import axios from 'axios';

export default function ListMoviePage() {
    const [state, setState] = useState({
        loading: false,
        data: null,
        error: null
    });

    useEffect(() => {
        //Call API
        const fetchListMovie = async () => {
            try {
                //loading
                setState({
                    loading: true,
                    data: null,
                    error: null
                });
                const result = await axios({
                    url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
                    method: "GET",
                    headers: {
                        TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4MyIsIkhldEhhblN0cmluZyI6IjE4LzAxLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc2ODY5NDQwMDAwMCIsIm5iZiI6MTc0MTg4ODgwMCwiZXhwIjoxNzY4ODQ1NjAwfQ.rosAjjMuXSBmnsEQ7BQi1qmo6eVOf1g8zhTZZg6WSx4"
                    }
                });

                console.log(result);
                setState({
                    loading: false,
                    data: result.data.content,
                    error: null
                });
            } catch (error) {
                setState({
                    loading: false,
                    data: null,
                    error: error
                });
            }
        };
        fetchListMovie();
    }, []);

    const { data, loading } = state;

    if (loading) return <p>Loading...</p>;

    const renderMovies = () => {
        if (data) {
            return data.map((movie) => {
                return <Movie key={movie.maPhim} movie={movie} />;
            });
        }
    }


    return (
        <div className="container mx-auto">
            <h1 className='text-3xl text-green-600 font-bold text-center'>List Movie Page</h1>
            <div className="grid grid-cols-4 gap-5 mt-10 mb-10">
                {renderMovies()}
            </div>
        </div>
    );
}
