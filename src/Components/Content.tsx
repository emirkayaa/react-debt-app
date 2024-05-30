
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
    function Content() {
        return (
            <div className='flex'>
               
                <div>
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </div>
            </div>
        );
    }

    export default Content;