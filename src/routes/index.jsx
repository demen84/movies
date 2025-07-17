import HomeTemplate from "../pages/HomeTemplate";
import HomePage from "../pages/HomeTemplate/HomePage";
import AboutPage from "../pages/HomeTemplate/AboutPage";
import ListMoviePage from "../pages/HomeTemplate/ListMoviePage";
import NewsPage from "../pages/HomeTemplate/NewsPage";
import LoginPage from "../pages/HomeTemplate/LoginPage";
import RegisterPage from "../pages/HomeTemplate/RegisterPage";

import AdminTemplate from "../pages/AdminTemplate";
import Dashboard from "../pages/AdminTemplate/Dashboard";
import AddUserPage from "../pages/AdminTemplate/AddUserPage";
import AuthPage from "../pages/AdminTemplate/AuthPage";

import { Route } from "react-router-dom";

const routes = [
    {
        path: "",
        element: HomeTemplate,
        nested: [
            {
                path: "",
                element: HomePage
            },
            {
                path: "list-movie",
                element: ListMoviePage
            },
            {
                path: "about",
                element: AboutPage
            },
            {
                path: "news",
                element: NewsPage
            },
            {
                path: "login",
                element: LoginPage
            },
            {
                path: "register",
                element: RegisterPage
            }
        ]
    },
    {
        path: "admin",
        element: AdminTemplate,
        nested: [
            {
                path: "dashboard",
                element: Dashboard
            },
            {
                path: "add-user",
                element: AddUserPage
            }
        ]
    },
    {
        path: "auth",
        element: AuthPage
    }
];

export const generateRoutes = () => {
    return routes.map((route) => {
        if (route.nested) {
            return (
                <Route key={route.path} path={route.path} element={<route.element />}>
                    {route.nested.map((sub_route) => (
                        <Route key={sub_route.path} path={sub_route.path} element={<sub_route.element />} />
                    ))}
                </Route>
            );
        } else {
            return (
                <Route key={route.path} path={route.path} element={<route.element />} />
            );
        }
    });
};