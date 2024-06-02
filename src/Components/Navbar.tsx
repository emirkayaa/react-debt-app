import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearToken } from '../authSlice';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const handleSubmit = () => {
    localStorage.removeItem('token');
    dispatch(clearToken())
    window.location.href = '/login';
  };

  return (
    <nav className="bg-gray-900 text-gray-100 flex justify-between items-center p-4">
      <h2 className="text-2xl font-bold">Finance</h2>
      <ul className="flex space-x-4">
        <li>
          <NavLink to="/" className="text-gray-300 hover:text-white">
            Ana Sayfa
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" className="text-gray-300 hover:text-white">
            İstatistik
          </NavLink>
        </li>
      <button onClick={handleSubmit} className="text-gray-300 hover:text-white">
        Çıkış Yap
      </button>
      </ul>
    </nav>
  );
};

export default Navbar;
