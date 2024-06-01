import { useEffect, useState } from "react";
import Modal from "react-modal";
import page from "../../svg/page.svg";
import axios from "axios";
import { url } from "../../api";
import { useSelector } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement('#root');
function Payment({ data }: { data: any }) {
  const token = useSelector((state: any) => state.auth.token);
  const [paymentData, setPaymentData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (modalIsOpen) {
      fetchPaymentData();
    }
  }, [modalIsOpen]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const fetchPaymentData = () => {
    axios
      .get(url + `finance/debt/${data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPaymentData(response.data.data.paymentPlan);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching payment data:", error);
      });
  };

  const handlePaymentUpdate = (paymentId: string,isPaid:boolean, paymentDate: string , paymentAmount: string) => {
    axios
      .put(
        url + `finance/payment-plans/${paymentId}`,
        { 
            isPaid,
            paymentDate,
            paymentAmount 

        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Payment updated successfully:", response.data);
        toast.success("Payment updated successfully");
        fetchPaymentData(); // Refresh payment data after update
      })
      .catch((error) => {
        console.error("Error updating payment:", error);
        toast.error("Error updating payment");
      });
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="p-1 rounded-lg bg-slate-200 hover:bg-slate-100"
      >
        <img src={page} width={30} alt="dosya" />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Payment Modal"
      >
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8 overflow-auto max-h-svh">
          {paymentData.map((payment: any, index:number) => (
            <div  className="flex flex-col space-y-4" key={payment.id}>
              <div className=" flex flex-col space-y-2 ">
              <label className="block text-sm font-medium text-gray-700">
                Taksit {index + 1} Tutarı
              </label>
              <input
                type="text"
                value={payment.paymentAmount}
                readOnly
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <label className="block text-sm font-medium text-gray-700">
                Taksit {index + 1} Tarihi
              </label>
              <input
                type="text"
                value={moment(payment.paymentStart).format("DD MM YYYY")}
                readOnly
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              </div>
             {
                 payment.isPaid == false ? <div  className="flex space-x-4">
                 <label className="block text-sm font-medium text-gray-700">
                   Ödeme
                 </label>
                 <input
                   type="checkbox"
                   checked={payment.isPaid}
                   onChange={(e) =>
                     handlePaymentUpdate(payment.id, e.target.checked, payment.paymentDate, payment.paymentAmount)
                   }
                   className="rounded text-blue-500"
                 />
                 </div> : <div className="bg-green-100 text-green-800 text-sm text-center font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Ödendi</div>
             }
            </div>
          ))}
          <div className="flex flex-col justify-center w-full items-center">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 m-2"
            >
              Close
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Payment;
