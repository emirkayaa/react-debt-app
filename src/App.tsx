import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { routes } from './Routes';
import Navbar from './Components/Navbar';
import PrivateRoute from './privateRoute';

function App() {
  return (
    <>
        <Router>
          <div className="w-full"> 
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.id}
                  path={route.path}
                  element={
                    route.auth ? (
                      <PrivateRoute>
                        <Navbar />
                        <route.component />
                      </PrivateRoute>
                    ) : (
                      <route.component />
                    )
                  }
                />
              ))}
            </Routes>
          </div>
        </Router>
    </>
  );
}

export default App;
