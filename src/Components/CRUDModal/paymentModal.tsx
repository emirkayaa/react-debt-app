import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { url } from "../../api";
import moment from "moment";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';

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
  const token = localStorage.getItem("token");
  const [paymentData, setPaymentData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState(true); 

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
        if(response.data.data.paymentPlan.length === 0) {
          setHasData(false);
        } else {
          setHasData(true); 
        }
      })
      .catch((error) => {
        console.error("Error fetching payment data:", error);
      });
  };

  const handlePaymentUpdate = (paymentId: string, isPaid: boolean, paymentDate: string, paymentAmount: string) => {
    setLoading(true);
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
        fetchPaymentData(); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error updating payment:", error);
        toast.error("Error updating payment");
        setLoading(false); 
      });
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="p-1 rounded-lg bg-slate-200 hover:bg-slate-100"
      >
        <FontAwesomeIcon icon={faFileInvoiceDollar} width={32} />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Payment Modal"
      >
        {hasData ? ( 
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8 overflow-auto max-h-svh">
            {paymentData.map((payment: any, index: number) => (
              <div className="flex flex-col space-y-4" key={payment.id}>
                <div className="flex flex-col space-y-2">
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
                {payment.isPaid === false ? (
                  <div className="flex space-x-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Ödeme
                    </label>
                    {loading ? (
                      <ClipLoader size={30} color={"#00BFFF"} loading={loading} />
                    ) : (
                      <input
                        type="checkbox"
                        checked={payment.isPaid}
                        onChange={(e) =>
                          handlePaymentUpdate(payment.id, e.target.checked, payment.paymentDate, payment.paymentAmount)
                        }
                        className="rounded text-blue-500"
                      />
                    )}
                  </div>
                ) : (
                  <div className="bg-green-100 text-green-800 text-sm text-center font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    Ödendi
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-col justify-center w-full items-center">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 m-2"
              >
                Kapat
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-8">
            <p className="bg-red-100 text-red-800 text-sm text-center font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Veri yok</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 mt-4 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Kapat
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Payment;
