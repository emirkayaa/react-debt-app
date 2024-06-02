import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import 'tailwindcss/tailwind.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { fetchData } from '../../store/reducers/tableReducer';


ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
        const dispatch = useDispatch<AppDispatch>();
        const debt = useSelector((state: any) => state.table.data);
        useEffect(() => {
          dispatch(fetchData());
        }, [dispatch]);
    
    const data = {
        labels: debt.map((item: any) => item.debtName),
        datasets: [
          {
            label: '# of Votes',
            data: debt.map((item: any) => item.amount),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          tooltip: {
            enabled: true,
          },
        },
      };

    return (
        <div className='w-full flex flex-col items-center mt-4 space-y-8'>
            <div className='shadow-lg p-6 bg-white rounded-lg w-full max-w-4xl'>
                <h2 className='text-3xl font-bold text-gray-800 mb-6'>Dashboard</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center'>
                    <div className='p-4 bg-blue-50 rounded-lg shadow-md'>
                        <div className='text-xl font-medium text-blue-700'>
                            Toplam Borç Miktarı
                        </div>
                          <div className='text-2xl font-medium text-blue-700'>
                          {
                                
                                debt.reduce((acc: number, item: any) => acc + item.debtAmount, 0)
                            }
                          </div>
                    </div>
                    <div className='p-4 bg-green-50 rounded-lg shadow-md'>
                        <div className='text-xl font-medium text-green-700'>
                            Ödenen Borç Miktarı
                        </div>
                        <div className='text-2xl font-bold text-green-900'>
                            *****
                        </div>
                    </div>
                    <div className='p-4 bg-yellow-50 rounded-lg shadow-md'>
                        <div className='text-xl font-medium text-yellow-700'>
                            Toplam Taksit Miktarı
                        </div>
                        <div className='text-2xl font-bold text-yellow-900'>
                            {
                                debt.reduce((acc: number, item: any) => acc + item.installment, 0)
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full max-w-lg shadow-lg rounded-lg bg-white p-6'>
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
}

export default Dashboard;
