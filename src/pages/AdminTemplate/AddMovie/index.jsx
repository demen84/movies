// import React from 'react';
import { useForm } from "react-hook-form";
import { isDate, format } from "date-fns";
import { parse, isValid } from "date-fns";
import api from "../../../services/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    tenPhim: z.string().nonempty("Vui lòng nhập tên phim"),
    trailer: z.string().nonempty("Hãy nhập đường dẫn youtube").regex(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&=]*)/gi, "Hãy nhập đúng định dạng"),
    moTa: z.string().nonempty("Vui lòng nhập mô tả phim").max(200, "Nội dung mô tả không vượt quá 200 ký tự"),
    ngayKhoiChieu: z.string().nonempty("Vui lòng chọn ngày khởi chiếu"),
    ngayKhoiChieu: z
        .string()
        .nonempty("Vui lòng chọn ngày khởi chiếu")
        .refine(
            (value) => {
                const date = parse(value, "dd/MM/yyyy", new Date());
                return isValid(date);
            },
            {
                message: "Giá trị ngày không hợp lệ. Vui lòng nhập đúng định dạng dd/MM/yyyy"
            }
        ),
    trangThai: z.string().optional(),
    Hot: z.boolean().optional(),
    maNhom: z.string().optional("GP01"),
    danhGia: z.string().nonempty("Bạn chưa nhập đánh gái").regex(/^(?:[0-9](?:\.\d+)?|10(?:\.0+)?)$/gm, "Vui lòng nhập từ 0 -> 10"),
    hinhAnh: z.any(),
});

export default function AddMovie() {
    const { register, setValue, handleSubmit, watch, formState } = useForm({ //or: // const methods = useForm({
        defaultValues: {
            tenPhim: "",
            trailer: "",
            moTa: "",
            maNhom: "GP02",
            ngayKhoiChieu: "",
            trangThai: false,
            // SapChieu: false,
            // DangChieu: false,
            Hot: false,
            danhGia: "",
            hinhAnh: null,
        },

        resolver: zodResolver(schema),
    });

    const errors = formState.errors;
    console.log(errors);


    const hinhAnh = watch("hinhAnh");

    const previewImage = (file) => {
        if (!file) return "";

        const url = URL.createObjectURL(file);
        // console.log(url);
        return url;
    };

    // previewImage(hinhAnh); //Chỉ gọi ra để Test

    const onSubmit = async (values) => {
        // console.log(values);
        const { trangThai, Hot, ...rest } = values;
        console.log("Trạng Thái", trangThai);
        // console.log("REST", rest);

        const newValues = {
            ...rest,
            DangChieu: trangThai === "true",
            SapChieu: trangThai === "false",
            Hot: Hot === "true",
        };

        const formData = new FormData();

        formData.append("tenPhim", newValues.tenPhim);
        formData.append("moTa", newValues.moTa);
        formData.append("trailer", newValues.trailer);
        formData.append("danhGia", newValues.danhGia);
        formData.append("DangChieu", newValues.DangChieu);
        formData.append("SapChieu", newValues.SapChieu);
        formData.append("ngayKhoiChieu", newValues.ngayKhoiChieu);
        // formData.append("ngayKhoiChieu", format(newValues.ngayKhoiChieu, "dd/MM/yyyy"));
        formData.append("hinhAnh", newValues.hinhAnh);
        formData.append("maNhom", newValues.maNhom);

        console.log("New Values:", newValues);


        try {
            const response = await api.post("/QuanLyPhim/ThemPhimUploadHinh", formData);
        } catch (error) {
            console.log("Thêm phim thất bại");
        }
    };

    return (
        <div className='container mx-auto space-y-4'>
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            Quản trị
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                            </svg>
                            <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Quản lý phim</a>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                            </svg>
                            <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Thêm danh sách phim</a>
                        </div>
                    </li>
                </ol>
            </nav>

            <h1 className='text-xl font-bold text-blue-600 mt-5'>Thêm danh sách phim</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="tenPhim" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên phim</label>
                        <input type="text" id="tenPhim" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập Tên phim"
                            {...register("tenPhim")} />
                        {errors?.tenPhim?.message && <span className="text-xs text-red-500">{errors.tenPhim.message}</span>}

                    </div>
                    <div>
                        <label htmlFor="moTa" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
                        <input type="text" id="moTa" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập Mô tả"
                            {...register("moTa")} />
                        {errors?.moTa?.message && <span className="text-xs text-red-500">{errors.moTa.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="trailer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trailer</label>
                        <input type="url" id="trailer" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập đường dẫn URL youtube" {...register("trailer")} />
                        {errors?.trailer?.message && <span className="text-xs text-red-500">{errors.trailer.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rating</label>
                        <input type="number" id="rating" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập từ 0 -> 10" pattern="^(10(?:\.0+)?|[0-9](?:\.[0-9]+)?)$" {...register("danhGia")} />
                        {errors?.danhGia?.message && <span className="text-xs text-red-500">{errors.danhGia.message}</span>}
                    </div>
                    <div className='flex items-center gap-10'>
                        <div className="relative max-w-sm">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div>
                            <input datepicker id="default-datepicker" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"
                                {...register("ngayKhoiChieu")} />
                            {errors?.ngayKhoiChieu?.message && <span className="text-xs text-red-500">{errors.ngayKhoiChieu.message}</span>}
                        </div>

                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="hotMovie" type="checkbox" defaultValue className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" {...register("Hot")} />
                            </div>
                            <label htmlFor="hotMovie" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hot movie</label>
                        </div>

                    </div>
                    {/* Chọn file hình ảnh */}
                    <div className="flex items-start">
                        {
                            !hinhAnh &&
                            <div className="flex items-center h-5">
                                <input id="image" type="file" accept=".png,jpeg,.jpg"
                                    onChange={((e) => {
                                        const hinhAnh = e.target.files[0];
                                        setValue("hinhAnh", hinhAnh);
                                    })} />
                            </div>
                        }
                        {
                            hinhAnh &&
                            <div>
                                <img src={previewImage(hinhAnh)} className="w-[320px] h-[24rem] object-cover rounded-2xl" />
                                <button className="p-2 rounded-lg text-red-500 border border-red-500"
                                    onClick={() => setValue("hinhAnh", null)}>
                                    Xóa hình
                                </button>
                            </div>
                        }
                    </div>

                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tình trạng</label>

                    <div className='flex items-center gap-10'>
                        <div className="flex items-center">
                            <input id="default-radio-1" type="radio" defaultValue name="trangThai" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                {...register("trangThai")} />
                            <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Đang chiếu</label>
                        </div>
                        <div className="flex items-center">
                            <input defaultChecked id="default-radio-2" type="radio" defaultValue name="trangThai" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                {...register("trangThai")} />
                            <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sắp chiếu</label>
                        </div>
                    </div>
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Lưu</button>
            </form>

        </div>
    );
}
