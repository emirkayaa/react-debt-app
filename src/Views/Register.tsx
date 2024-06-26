import React, { useState } from 'react';
import axios from 'axios';
import {  useDispatch } from 'react-redux';
import { url } from '../api';
import { setToken } from '../authSlice';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';



const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
    const dispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError('Boş Alan Bırakmayınız');
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError('Email Zorunludur');
      return;
    }

    if (password !== confirmPassword) {
      setError('Şifreler Uyuşmuyor');
      return;
    }

    setError('');
    
    axios.post(url + 'auth/register',{name,email,password}).then((res) => {
        localStorage.setItem('token', res.data.data);
        dispatch(setToken(res.data.data));
        navigate('/login');

    }).catch((err) => {
        setError(err);
    })
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Kayıt Ol</h2>
        {error && <div className="p-4 text-sm text-red-600 bg-red-100 border border-red-400 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">İsim</label>
            <input
              id="name"
              type="name"
              value={name.toLowerCase()}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Şifre</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Şifre Tekrar</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <button
            onClick={handleSubmit}
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Kayıt Ol
            </button>
            <span className='flex justify-center my-1 items-center text-sm text-center text-slate-600'>
              Zaten bir hesabınız var mı?{' '}
              <NavLink to="/login" className="block mx-1 text-sm font-medium text-indigo-600 border border-transparent rounded-md shadow-sm ">Giriş Yap</NavLink>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
