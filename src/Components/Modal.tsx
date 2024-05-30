import Modal from "react-modal";
import React, { useState } from "react";
import axios from "axios";
import { url } from "../api";

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

function Modals() {
  const [debtName, setDebtName] = useState('');
  const [lender, setLender] = useState('');
  const [debtAmount, setDebtAmout] = useState(0);
  const [interesRate, setInteresRate] = useState(0);
  const [amount, setAmout] = useState(0);
  const [paymentStart, setPaymentStart] = useState('');
  const [installment, setInstallment] = useState(0);
  const [desc, setdesc] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);

  const AddData = (e : any) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('User not logged in');
      return;
    }

    axios.post(url + "finance/debt", {
        debtName,
        lenderName: lender,
        debtAmount,
        interestRate: interesRate,
        amount,
        paymentStart,
        installment,
        description: desc
    }, {
        headers: {
            Authorization: 'Bearer ' + token
        },
    }).then(res => {
        console.log('eklendi', res);
        closeModal();
    }).catch(err => {
        console.log(err);
    });
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button
        onClick={openModal}
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Ekle
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8" onSubmit={AddData}>
          <div>
            <label
              htmlFor="debtName"
              className="block text-sm font-medium text-gray-700"
            >
              Borç Adı
            </label>
            <input
              id="debtName"
              type="text"
              value={debtName}
              onChange={(e) => setDebtName(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="debtPerson"
              className="block text-sm font-medium text-gray-700"
            >
              Borç Veren
            </label>
            <input
              id="debtPerson"
              type="text"
              value={lender}
              onChange={(e) => setLender(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="debtPayment"
              className="block text-sm font-medium text-gray-700"
            >
              Borç Miktarı
            </label>
            <input
              id="debtPayment"
              type="text"
              value={debtAmount}
              onChange={(e) => setDebtAmout(Number(e.target.value))}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="interest"
              className="block text-sm font-medium text-gray-700"
            >
              Faiz Oranı
            </label>
            <input
              id="interest"
              value={interesRate}
              onChange={(e) => setInteresRate(Number(e.target.value))}
              type="text"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="total"
              className="block text-sm font-medium text-gray-700"
            >
              Toplam
            </label>
            <input
              id="total"
              type="text"
              value={amount}
              onChange={(e) => setAmout(Number(e.target.value))}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Başlangıç Tarihi
            </label>
            <input
              id="startDate"
              type="date"
              value={paymentStart}
              onChange={(e) => setPaymentStart(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="installments"
              className="block text-sm font-medium text-gray-700"
            >
              Taksit Sayısı
            </label>
            <input
              id="installments"
              type="text"
              value={installment}
              onChange={(e) => setInstallment(Number(e.target.value))}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="desc"
              className="block text-sm font-medium text-gray-700"
            >
              Açıklama
            </label>
            <textarea
              id="desc"
              value={desc}
              onChange={(e) => setdesc(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></textarea>
          </div>
          <div className="flex justify-between w-full items-center">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 m-2"
            >
              Ödeme Planı Oluştur
            </button>
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

export default Modals;
