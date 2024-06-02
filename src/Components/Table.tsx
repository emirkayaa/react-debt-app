import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';
import UpdateModal from './CRUDModal/updateModal';
import { fetchData } from '../store/reducers/tableReducer';
import { RootState, AppDispatch } from '../store';
import { url } from '../api';
import Payment from './CRUDModal/paymentModal';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import ClipLoader from "react-spinners/ClipLoader";

const Table: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.table.data);
  const isLoading = useSelector((state: RootState) => state.table.loading);
  const token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const deleteInstallement = async (id: number) => {
    try {
      await axios.delete(url + `finance/debt/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Borç başarıyla silindi');
      dispatch(fetchData());
    } catch (error) {
      console.error(error);
      toast.error('Borç silinirken bir hata oluştu');
    }
  };

  return (
    <div className="max-h-screen overflow-auto">
      <div className="table-responsive">
        {isLoading ? ( 
          <div className="flex justify-center items-center h-64">
            <ClipLoader size={35} color={"#00BFFF"} loading={isLoading} />
          </div>
        ) : (
          <table className="w-full my-2 border text-center border-gray-200 shadow-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 md:px-4 py-2 text-gray-800">Borç Adı</th>
                <th className="px-2 md:px-4 py-2 text-gray-800">Borç Veren</th>
                <th className="px-2 md:px-4 py-2 text-gray-800">Borç Miktarı</th>
                <th className="px-2 md:px-4 py-2 text-gray-800">Faiz Oranı</th>
                <th className="px-2 md:px-4 py-2 text-gray-800">Toplam</th>
                <th className="px-2 md:px-4 py-2 text-gray-800">Başlangıç Tarihi</th>
                <th className="px-2 md:px-4 py-2 text-gray-800">Taksit Sayısı</th>
                <th className="px-2 md:px-4 py-2 text-gray-800">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any) => (
                <tr key={item.id} className="bg-gray-50">
                  <td className="border px-2 md:px-4 py-2">{item.debtName}</td>
                  <td className="border px-2 md:px-4 py-2">{item.lenderName}</td>
                  <td className="border px-2 md:px-4 py-2">{item.debtAmount}</td>
                  <td className="border px-2 md:px-4 py-2">{item.interestRate}%</td>
                  <td className="border px-2 md:px-4 py-2">{item.amount}</td>
                  <td className="border px-2 md:px-4 py-2">
                    {moment(item.paymentStart).format('DD MM YYYY')}
                  </td>
                  <td className="border px-2 md:px-4 py-2">{item.installment}</td>
                  <td className="border px-2 md:px-4 py-2">
                    <div className="flex justify-around items-center">
                      <Payment data={item} />
                      <UpdateModal data={item} />
                      <button
                        onClick={() => deleteInstallement(item.id)}
                        className="p-1 rounded-lg bg-slate-200 hover:bg-slate-100"
                      >
                        <FontAwesomeIcon height={34} width={32} icon={faTrashCan} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Table;
