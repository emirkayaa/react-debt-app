import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {url} from '../api';
import { useSelector } from 'react-redux';


function Table() {

    const token = useSelector((state :any) => state.auth.token);
    const [data, setData] = useState([])
   const  getData = () =>{
      axios.get(url + 'finance/debt', {
        headers: {
            Authorization: 'Bearer ' + token 
        }
    }).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.log(err);
    });
    }
    useEffect(() => {
        getData()
    }, [data])
  return (
    <div className="overflow-x-auto w-full">
      <table className="table-auto border-collapse border border-gray-800">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-gray-800 text-white">Name</th>
            <th className="px-4 py-2 bg-gray-800 text-white">Age</th>
            <th className="px-4 py-2 bg-gray-800 text-white">Country</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">John Doe</td>
            <td className="border px-4 py-2">30</td>
            <td className="border px-4 py-2">USA</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Jane Smith</td>
            <td className="border px-4 py-2">25</td>
            <td className="border px-4 py-2">Canada</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Alice Johnson</td>
            <td className="border px-4 py-2">40</td>
            <td className="border px-4 py-2">UK</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;