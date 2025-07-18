import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, updateStudent, deleteStudent } from '../../../store';

export default function FormValidationPage() {
    const [inputState, setInputState] = useState({
        values: {
            maSV: '',
            hoTen: '',
            soDT: '',
            email: ''
        },
        errors: {
            maSV: '',
            hoTen: '',
            soDT: '',
            email: ''
        }
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);

        setInputState({
            ...inputState,
            values: {
                ...inputState.values,
                [name]: value
            }
        });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault(); //Ngăn chặn việc load lại trang
    }

    const handleError = (e) => {
        const { name, value } = e.target; // Lấy ID của input

        let message = value.trim() === "" ? `${e.target.placeholder} không được để trống` : "";

        //Nếu input không rỗng thì kiểm tra định dạng (email & phone)
        if (value.trim()) {
            switch (name) {
                case 'email':
                    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Biểu thức chính quy cho email
                    if (!value.match(regexEmail)) {
                        message = 'Email không hợp lệ. Vd: example@gmail.com';
                    }
                    break;

                case 'soDT':
                    const regexPhone = /^[0-9.-]{1,12}$/;
                    if (!value.match(regexPhone)) {
                        message = 'Số điện thoại không hợp lệ. Vd: 091.999.1538 (không được quá 12 ký tự)';
                    }
                    break;

                case 'maSV':
                    const regexMaSV = /^[a-zA-Z0-9_-]{1,6}$/;
                    if (!value.match(regexMaSV)) {
                        message = 'Mã sinh viên tối đa 6 ký tự, không chứa ký tự đặc biệt';
                    }
                    break;

                case 'hoTen':
                    const regexHoTen = /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]{1,50}$/;
                    if (!value.match(regexHoTen)) {
                        message = 'Họ tên sinh viên tối đa 50 ký tự. Không chứa ký tự đặc biệt';
                    }
                    break;

                default:
                    break;
            }
        }
        setInputState({
            ...inputState, //Giữ nguyên các giá trị khác trong State
            errors: {
                ...inputState.errors, //Giữ nguyên các giá trị khác trong errors
                [name]: message
            }
        });
    };

    const dispatch = useDispatch();
    const students = useSelector((state) => state.students.list);

    // State cho Form
    const [studentId, setStudentId] = useState('');
    const [studentName, setStudentName] = useState('');
    const [studentPhone, setStudentPhone] = useState('');
    const [studentEmail, setStudentEmail] = useState('');

    // State cho Tìm kiếm
    const [searchTerm, setSearchTerm] = useState('');

    // State để theo dõi sinh viên đang được chỉnh sửa
    const [editingStudentId, setEditingStudentId] = useState(null);

    // --- LIFECYCLE HOOK: useEffect cho chức năng Chỉnh sửa ---
    // Khi editingStudentId thay đổi (người dùng click Edit), điền dữ liệu vào form
    useEffect(() => {
        if (editingStudentId) {
            const studentToEdit = students.find(student => student.id === editingStudentId);
            if (studentToEdit) {
                setStudentId(studentToEdit.id);
                setStudentName(studentToEdit.name);
                setStudentPhone(studentToEdit.phone);
                setStudentEmail(studentToEdit.email);
            }
        } else {
            // Reset form khi không có sinh viên nào đang được chỉnh sửa
            setStudentId('');
            setStudentName('');
            setStudentPhone('');
            setStudentEmail('');
        }
    }, [editingStudentId, students]); // Dependencies: chạy lại khi editingStudentId hoặc students thay đổi

    // Lọc danh sách sinh viên dựa trên searchTerm
    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phone.includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddOrUpdateStudent = () => {
        if (studentId && studentName && studentPhone && studentEmail) {
            const studentData = {
                id: studentId,
                name: studentName,
                phone: studentPhone,
                email: studentEmail,
            };

            if (editingStudentId) {
                // Cập nhật sinh viên hiện có
                dispatch(updateStudent(studentData));
                setEditingStudentId(null); // Kết thúc chế độ chỉnh sửa
                alert('Cập nhật sinh viên thành công!');
            } else {
                // Thêm sinh viên mới (kiểm tra trùng mã SV)
                if (students.some(s => s.id === studentId)) {
                    alert('Mã sinh viên đã tồn tại. Vui lòng nhập mã khác hoặc chỉnh sửa sinh viên hiện có.');
                    return;
                }
                dispatch(addStudent(studentData));
                alert('Thêm sinh viên thành công!');
            }

            // Reset form sau khi thêm/cập nhật
            setStudentId('');
            setStudentName('');
            setStudentPhone('');
            setStudentEmail('');

        } else {
            alert('Vui lòng nhập đầy đủ thông tin sinh viên!');
        }
    };

    const handleEdit = (studentIdToEdit) => {
        setEditingStudentId(studentIdToEdit);
    };

    const handleDelete = (studentIdToDelete) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa sinh viên ${studentIdToDelete} không?`)) {
            dispatch(deleteStudent(studentIdToDelete));
            // Nếu sinh viên đang được chỉnh sửa bị xóa, hãy reset form
            if (editingStudentId === studentIdToDelete) {
                setEditingStudentId(null);
            }
            alert('Xóa sinh viên thành công!');
        }
    };

    return (
        <div className="container mx-auto mt-5 mb-10">
            <h1 className="text-center text-4xl font-bold text-violet-700 mb-5">
                Form Validation Page
            </h1>

            <form onSubmit={(e) => { e.preventDefault(); handleOnSubmit }}>
                <div className="mb-5 font-bold text-xl text-white dark:text-white bg-gray-600 p-3 rounded-lg">
                    <h2>Thông tin sinh viên</h2>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="student_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã sinh viên</label>
                        <input
                            type="text"
                            id="student_id" name='maSV' placeholder='Mã sinh viên'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={studentId}
                            onChange={(e) => {
                                setStudentId(e.target.value);
                                handleOnChange(e)
                            }}
                            onBlur={handleError}
                            disabled={!!editingStudentId} // Disable Mã SV khi chỉnh sửa
                            required
                        />
                        {
                            inputState.errors.maSV && (
                                <div className="p-3 mb-3 text-sm italic text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    {inputState.errors.maSV}
                                </div>
                            )
                        }
                    </div>
                    <div>
                        <label htmlFor="student_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ tên sinh viên</label>
                        <input
                            type="text"
                            id="student_name" name='hoTen' placeholder='Họ tên sinh viên'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={studentName}
                            onChange={(e) => { setStudentName(e.target.value); handleOnChange }}
                            onBlur={handleError}
                            required
                        />
                        {
                            inputState.errors.hoTen && (
                                <div className="p-3 mb-3 text-sm italic text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    {inputState.errors.hoTen}
                                </div>
                            )
                        }
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                        <input
                            type="tel"
                            id="phone" name='soDT'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Số điện thoại"
                            value={studentPhone}
                            onChange={(e) => { setStudentPhone(e.target.value); handleOnChange(e) }}
                            onBlur={handleError}
                            required
                        />
                        {
                            inputState.errors.soDT && (
                                <div className="p-3 mb-3 text-sm italic text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    {inputState.errors.soDT}
                                </div>
                            )
                        }
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input
                            type="email"
                            id="email" name='email'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Email"
                            value={studentEmail}
                            onChange={(e) => {
                                setStudentEmail(e.target.value);
                                handleOnChange
                            }}
                            onBlur={handleError}
                            required
                        />
                        {
                            inputState.errors.email && (
                                <div className="p-3 mb-3 text-sm italic text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    {inputState.errors.email}
                                </div>
                            )
                        }
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleAddOrUpdateStudent}
                    className={`text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${editingStudentId ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-800' : 'bg-green-700 hover:bg-green-800 focus:ring-green-300'
                        }`}
                >
                    {editingStudentId ? 'Cập nhật sinh viên' : 'Thêm sinh viên'}
                </button>
                {editingStudentId && (
                    <button
                        type="button"
                        onClick={() => setEditingStudentId(null)} // Hủy chỉnh sửa
                        className="ml-3 text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    >
                        Hủy chỉnh sửa
                    </button>
                )}
            </form>

            {/* --- Thanh tìm kiếm --- */}
            <div className="mt-10 mb-5">
                <label htmlFor="search" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Tìm kiếm sinh viên:</label>
                <input
                    type="text"
                    id="search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nhập Mã sinh viên, Họ tên, SĐT hoặc Email để tìm kiếm ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <h2 className="text-2xl font-bold text-gray-700 mb-3">Danh sách sinh viên</h2>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="mb-5 font-bold text-sm text-white dark:text-white bg-gray-600 p-3 rounded-lg">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Mã SV
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Họ tên
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Số điện thoại
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student) => (
                                <tr key={student.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {student.id}
                                    </th>
                                    <td className="px-6 py-3">
                                        {student.name}
                                    </td>
                                    <td className="px-6 py-3">
                                        {student.phone}
                                    </td>
                                    <td className="px-6 py-3">
                                        {student.email}
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        <button type="button"
                                            onClick={() => handleEdit(student.id)}
                                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                            Sửa
                                        </button>

                                        <button type="button"
                                            onClick={() => handleDelete(student.id)}
                                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                            Xóa
                                        </button>
                                        <button type="button"
                                            onClick={() => alert('Chức năng chưa hoàn thiện')}
                                            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                                            Chi tiết
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-3 text-center text-2xl text-red-500 dark:text-red-400">
                                    Không tìm thấy sinh viên nào!
                                </td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        {/* Chưa có phần tfooter */}
                    </tfoot>
                </table>
            </div>
        </div>
    );
}