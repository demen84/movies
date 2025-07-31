import { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import api from "../../../services/api";

export default function LoginPage() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        taiKhoan: "",
        matKhau: ""
    });

    const handleOnChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); //ngăn chặn load lại trang
        console.log("VALUES:", values);

        try {
            const response = await api.post("/QuanLyNguoiDung/DangNhap", values);
            console.log(response);
            const user = response.data.content;

            if (user) { //Nếu có user thì lưu xuống localStorage
                localStorage.setItem("user", JSON.stringify(user));
                if (user.maLoaiNguoiDung === 'QuanTri') {
                    navigate('/admin/dashboard');
                } else {
                    navigate("/");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem("user"));

    //     if (user && user.maLoaiNguoiDung === 'QuanTri') {
    //         return <Navigate to="/admin/dashboard" />;
    //     }

    //     if (user && user.maLoaiNguoiDung != 'QuanTri') {
    //         return <Navigate to="/" />;
    //     }
    // }, []);

    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.maLoaiNguoiDung === 'QuanTri') {
        return <Navigate to="/admin/dashboard" />;
    }

    if (user && user.maLoaiNguoiDung != 'QuanTri') {
        return <Navigate to="/" />;
    }

    return (
        <div className="container mx-auto mb-10" onSubmit={handleSubmit}>
            <h1 className='text-2xl text-center text-gray-600 mt-4 mb-5'>This is the Login Page</h1>

            <form className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email của bạn</label>
                    <input onChange={handleOnChange} value={values.taiKhoan} type="text" id="email" name="taiKhoan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@gmail.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu của bạn</label>
                    <input onChange={handleOnChange} value={values.matKhau} type="password" id="password" name="matKhau" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                {/* <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" defaultValue className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ghi nhớ tui</label>
                </div> */}
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đăng nhập</button>
            </form>


        </div>
    )
}
