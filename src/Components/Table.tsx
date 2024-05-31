import  { useEffect, useState } from 'react';
import axios from 'axios';
import {url} from '../api';
import { useSelector } from 'react-redux';
import moment from 'moment';
import trash from '../svg/trash.svg'
import { toast } from "react-toastify";
import UpdateModal from './CRUDModal/updateModal';



function Table() {

    const token = useSelector((state :any) => state.auth.token);
    const [data, setData] = useState([])


    const deleteInstallement = (id:number) =>{
      axios.delete(url + 'finance/debt/' + id,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }

      ).then((res) => {
        toast.success("Borç başarıyla silindi")
        getData()
      }).catch((err) => {
        toast.error(err.response.data.message)
      })
    }


   const  getData = () =>{
      axios.get(url + 'finance/debt', {
        headers: {
            Authorization: 'Bearer ' + token 
        }
    }).then((res) => {
       setData(res.data.data)
    }).catch((err) => {
        console.log(err);
    });
    }
    useEffect(() => {
        getData()
    }, [setData])
  return (
    <div className=" max-h-screen overflow-auto">
     <table className="w-full my-2 border text-center border-gray-200 shadow-lg">
  <thead className="bg-gray-100">
    <tr>
      <th className="px-4 py-2 text-gray-800">Borç Adı</th>
      <th className="px-4 py-2 text-gray-800">Borç Veren</th>
      <th className="px-4 py-2 text-gray-800">Borç Miktarı</th>
      <th className="px-4 py-2 text-gray-800">Faiz Oranı</th>
      <th className="px-4 py-2 text-gray-800">Toplam</th>
      <th className="px-4 py-2 text-gray-800">Başlangıç Tarihi</th>
      <th className="px-4 py-2 text-gray-800">Taksit Sayısı</th>
      <th className="px-4 py-2 text-gray-800">İncele</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item:any) => (
      <tr key={item.id} className="bg-gray-50">
        <td className="border px-4 py-2">{item.debtName}</td>
        <td className="border px-4 py-2">{item.lenderName}</td>
        <td className="border px-4 py-2">{item.debtAmount}</td>
        <td className="border px-4 py-2">{item.interestRate}%</td>
        <td className="border px-4 py-2">{item.amount}</td>
        <td className="border px-4 py-2">{moment(item.paymentStart).format('DD MM YYYY')}</td>
        <td className="border px-4 py-2">{item.installment}</td>
        <td className="border px-4 py-2">
          <div className='flex justify-between items-center'>
            <UpdateModal data={item} />
            <button onClick={() => deleteInstallement(item.id)} className="px-4 py-2 rounded-lg bg-slate-300 hover:bg-slate-200">
              <img src={trash} alt="dosya" />
            </button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}

export default Table;