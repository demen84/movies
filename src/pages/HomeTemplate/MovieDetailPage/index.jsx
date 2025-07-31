import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import api from "../../../services/api";

export default function MovieDetailPage() {
    const { movieId } = useParams();

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        //Call api chi tiết phim
        const getMovieDetail = async () => {
            try {
                const response = await api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`);
                setMovie(response.data.content);
            } catch (error) {
                console.log(error);
            }
        };
        getMovieDetail();
    }, []);

    // const nam = new Date(movie?.ngayKhoiChieu)?.getFullYear();
    // const thang = new Date(movie?.ngayKhoiChieu)?.getMonth() + 1;
    // const ngay = new Date(movie?.ngayKhoiChieu)?.getDay();

    return (
        <div className="container mx-auto">
            <h1 className="text-center text-3xl">Movie Detail Page</h1>
            <div className="grid grid-cols-6 gap-5">
                <div className="col-span-1">
                    <img src={movie?.hinhAnh} alt={movie?.biDanh}
                        className="w-full h-70 object-cover rounded-md shadow-2xl" />
                </div>
                <div className="col-span-5 space-y-4">
                    <h2 className="text-xl font-bold">Tên phim: {movie?.tenPhim}</h2>
                    <p className="text-lg"><strong>Mô tả:</strong> <i>{movie?.moTa}</i></p>
                    {/* <p className="text-lg"><strong>Ngày chiếu:</strong> {`${ngay}-${thang}-${nam}`}</p> */}
                    <p className="text-lg"><strong>Ngày chiếu:</strong> {movie?.ngayKhoiChieu ? format(movie.ngayKhoiChieu, "dd/MM/yyyy") : ""}</p>
                </div>
            </div>
        </div>
    )
}
