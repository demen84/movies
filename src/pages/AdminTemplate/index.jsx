import { Outlet } from "react-router-dom";

export default function AdminTemplate() {
    return (
        <div>
            <h1 className='text-3xl text-orange-600 font-bold'>Admin Template</h1>
            <Outlet />
        </div>
    )
}
