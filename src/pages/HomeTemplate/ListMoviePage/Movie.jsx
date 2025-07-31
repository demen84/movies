import { useNavigate } from "react-router-dom";

export default function Movie(props) {

    const { movie } = props;

    const navigate = useNavigate();

    const handleMovieDetail = () => {
        if (!movie.maPhim) return;

        navigate(`/movie-detail/${movie.maPhim}`);
    };

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 cursor-pointer" onClick={handleMovieDetail}>
            <img
                className="rounded-t-lg"
                src={movie.hinhAnh}
                alt={movie.tenPhim} />
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {movie.tenPhim}
                    </h5>
                </a>
            </div>
        </div>
    )
}
