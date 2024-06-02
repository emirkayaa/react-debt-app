
import Dashboard from "./Views/Dashboard";
import Home from "./Views/Home";
import Login from "./Views/Login";
import Register from "./Views/Register";

export const routes = [
    {
        id: 1,
        path: '/dashboard',
        component: Dashboard,
        auth: true
    },
    {
        id: 2,
        path: '/register',
        component: Register,
        auth: false
    },
    {
        id: 3,
        path: '/',
        component: Home,
        auth: true
    },
    {

        id: 4,
        path: '/login',
        component: Login,
        auth: false
    },
]