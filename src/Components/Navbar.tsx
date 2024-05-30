import React from 'react';
import {  NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearToken } from '../authSlice';
const Sidebar: React.FC = () => {
   const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(clearToken())
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="bg-gray-900 text-gray-100 h-screen w-64 flex flex-col">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>
      <div className="border-t border-gray-800">
        <ul className="p-2">
          <li>
            <NavLink to="/home" className="block py-2 text-gray-300 hover:text-white">
              Ana Sayfa
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className="block py-2 text-gray-300 hover:text-white">
              Profil
            </NavLink>
          </li>
          <li>
            <button onClick={handleSubmit} className="block py-2 text-gray-300 hover:text-white">
              Çıkış Yap
            </button>
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;