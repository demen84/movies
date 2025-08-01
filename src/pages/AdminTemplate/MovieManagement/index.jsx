import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';

export default function MovieManagement() {

    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const response = await api.get("/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP02&soTrang=1&soPhanTuTrenTrang=100");
                console.log(response);

                setMovies(response.data.content.items || []);
            } catch (error) {
                console.log(error);
            }
        }
        getMovies();
    }, []);

    const handleAddMovie = () => {
        navigate("/admin/movies-management/add-movie");
    }


    return (
        <div className='container mx-auto'>

            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            Quản trị viên
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                            </svg>
                            <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Quản lý phim</a>
                        </div>
                    </li>
                </ol>
            </nav>

            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-semibold text-gray-900 dark:text-white'>Movie Management</h1>

                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={handleAddMovie}>
                    Thêm phim
                </button>
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-sm text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Tên phim
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Hình ảnh
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Mô tả
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ngày chiếu
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Trạng thái
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            movies.map((movie, index) => {
                                return (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {movie.tenPhim}
                                        </th>
                                        <td className="px-6 py-4">
                                            <img src={movie.hinhAnh} alt={movie.tenPhim} className='w-24 h-15 object-cover' />
                                        </td>
                                        <td className="px-6 py-4">
                                            {movie.moTa}
                                        </td>
                                        <td className="px-6 py-4">
                                            {movie.ngayKhoiChieu}
                                        </td>
                                        <td className="px-6 py-4">
                                            {movie.sapChieu ? 'Sắp chiếu' : 'Đang chiếu'}
                                        </td>
                                    </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>


        </div>
    )
}
