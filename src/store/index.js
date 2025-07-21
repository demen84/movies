import { configureStore, createSlice } from "@reduxjs/toolkit";
import listMovieSlice from "../pages/HomeTemplate/ListMoviePage/slice";

const studentsSlice = createSlice({
    name: 'students',
    initialState: {
        list: [
            {
                id: 'SV001',
                name: 'Trần Huy Hoàng',
                phone: '0345181216',
                email: 'huyhoang@gmail.com',
            },
            {
                id: 'SV002',
                name: 'Huỳnh Tấn Phát',
                phone: '0908596789',
                email: 'huynhtanphat@gmail.com'
            },
            {
                id: 'SV003',
                name: 'Lương Trung Tín',
                phone: '0913289647',
                email: 'trungtin.luong@gmail.com'
            },
            {
                id: 'SV004',
                name: 'Lý Quốc Toàn',
                phone: '0387973119',
                email: 'ly.quoctoan90@yahoo.com.vn'
            },
            {
                id: 'SV005',
                name: 'Trần Quốc Tuấn',
                phone: '0903167269',
                email: 'quoctuan_tran@yahoo.com'
            }
        ],
    },
    reducers: {
        addStudent: (state, action) => {
            state.list.push(action.payload);
        },
        // Thêm reducer để cập nhật sinh viên
        updateStudent: (state, action) => {
            const { id, name, phone, email } = action.payload;
            const existingStudent = state.list.find(student => student.id === id);
            if (existingStudent) {
                existingStudent.name = name;
                existingStudent.phone = phone;
                existingStudent.email = email;
            }
        },
        // Có thể thêm reducer cho xóa nếu muốn
        deleteStudent: (state, action) => {
            state.list = state.list.filter(student => student.id !== action.payload);
        },
    },
});

export const { addStudent, updateStudent, deleteStudent } = studentsSlice.actions;

export const store = configureStore({
    reducer: {
        students: studentsSlice.reducer, //R thứ 1
        listMovieSlice, //R thứ 2
    }
});