import HomeTemplate from "../pages/HomeTemplate";
import HomePage from "../pages/HomeTemplate/HomePage";
import FormValidationPage from "../pages/HomeTemplate/FormValidationPage";
import AboutPage from "../pages/HomeTemplate/AboutPage";
import ListMoviePage from "../pages/HomeTemplate/ListMoviePage";
import MovieDetailPage from "../pages/HomeTemplate/MovieDetailPage";
import NewsPage from "../pages/HomeTemplate/NewsPage";
import LoginPage from "../pages/HomeTemplate/LoginPage";
import RegisterPage from "../pages/HomeTemplate/RegisterPage";

import AdminTemplate from "../pages/AdminTemplate";
import Dashboard from "../pages/AdminTemplate/Dashboard";
import AddUserPage from "../pages/AdminTemplate/AddUserPage";
import AuthPage from "../pages/AdminTemplate/AuthPage";
import MovieManagement from "../pages/AdminTemplate/MovieManagement";
import AddMovie from "../pages/AdminTemplate/AddMovie";

import { Form, Route } from "react-router-dom";

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
                path: "form-validation",
                element: FormValidationPage
            },
            {
                path: "list-movie",
                element: ListMoviePage
            },
            {
                path: "movie-detail/:movieId",
                element: MovieDetailPage
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
            },
            {
                path: "movies-management",
                element: MovieManagement
            },
            {
                path: "movies-management/add-movie",
                element: AddMovie
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