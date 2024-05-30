import Content from "./Components/Content";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";


export const routes = [
    {
        id: 1,
        path: '/dashboard',
        component: Dashboard,
        exact: true,
        auth: true
    },
    {
        id: 2,
        path: '/register',
        component: Register,
        exact: true,
        auth: false
    },
    {
        id: 3,
        path: '/',
        component: Home,
        exact: true,
        auth: true
    },
    {

        id: 4,
        path: '/login',
        component: Login,
        exact: true,
        auth: false
    },
]