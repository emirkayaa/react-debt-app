import { Navigate, Route, BrowserRouter as Router, Routes, } from "react-router-dom";
import "./App.css";
import { Provider, useSelector } from "react-redux";
import  {routes}  from "./Routes";
import Navbar from "./Components/Navbar";
import { store } from "./store";


function App() {
  const token = useSelector((state :any) => state.auth.token);
  const  isAuth = token ? true : false;
  return (
   <div className="w-full">
   <Provider store={store}>
   <Router>
      <div className={token ? 'flex' : ''}>
       {token && <Navbar />}
       <Routes>    
        {routes.map((route) => {
          return (
            <Route
              key={route.id}
              path={route.path}
              element={route.auth && !isAuth ? <Navigate to="/login" /> : <route.component />} 
            />
          );
        })}
       </Routes>
      </div>
      </Router>
   </Provider>
   </div>
   
  );
}

export default App;
