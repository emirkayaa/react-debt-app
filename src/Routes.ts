
import Dashboard from "./Components/Views/Dashboard";
import Home from "./Components/Views/Home";
import Login from "./Components/Views/Login";
import Register from "./Components/Views/Register";


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