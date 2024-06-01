import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../api";
import { useDispatch } from "react-redux";
import { fetchData } from "../store/reducers/tableReducer";
import { AppDispatch } from "../store";
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

function Modals() {
  const [debtName, setDebtName] = useState("");
  const [lender, setLender] = useState("");
  const [debtAmount, setDebtAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [amount, setAmount] = useState(0);
  const [paymentStart, setPaymentStart] = useState("");
  const [installment, setInstallment] = useState(0);
  const [desc, setDesc] = useState("");
  const [tableRefresh,setTableRefresh] = useState(false)
  const [installments, setInstallments] = useState<
    { paymentAmount: number; paymentDate: string }[]
  >([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    setInstallments(
      Array.from({ length: installment }, () => ({
        paymentAmount: 0,
        paymentDate: "",
      }))
    );
  }, [installment]);

  type Installment = { paymentAmount: number; paymentDate: string };

  const handleInstallmentChange = (
    index: number,
    field: keyof Installment,
    value: string | number
  ) => {
    const newInstallments = [...installments];
    newInstallments[index] = { ...newInstallments[index], [field]: value };
    setInstallments(newInstallments);
  };
 
  const AddData = (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("User not logged in");
      return;
    }

    axios
      .post(
        url + "finance/debt",
        {
          debtName: debtName,
          lenderName: lender,
          debtAmount: debtAmount,
          interestRate: interestRate,
          amount: debtAmount + (debtAmount * interestRate) / 100,
          paymentStart: paymentStart,
          installment: installment,
          description: desc,
          paymentPlan: installments,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log("eklendi", res);
        closeModal();
        dispatch(fetchData());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setDebtName("");
    setLender("");
    setDebtAmount(0);
    setInterestRate(0);
    setAmount(0);
    setPaymentStart("");
    setInstallment(0);
    setDesc("");
    setInstallments([]);
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
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8 overflow-auto max-h-svh"
          onSubmit={AddData}
        >
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
              type="number"
              value={debtAmount}
              onChange={(e) => setDebtAmount(Number(e.target.value))}
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
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              type="number"
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
              type="number"
              value={debtAmount + (debtAmount * interestRate) / 100}
              onChange={(e) => setAmount(Number(e.target.value))}
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
              type="number"
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
              onChange={(e) => setDesc(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></textarea>
          </div>

          {installments.map((inst, index) => (
            <div key={index} className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Taksit {index + 1} Tutarı ve Tarihi
              </label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  value={inst.paymentAmount}
                  onChange={(e) =>
                    handleInstallmentChange(
                      index,
                      "paymentAmount",
                      Number(e.target.value)
                    )
                  }
                  className="block w-1/2 px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Tutar"
                  required
                />
                <input
                  type="date"
                  value={inst.paymentDate}
                  onChange={(e) =>
                    handleInstallmentChange(
                      index,
                      "paymentDate",
                      e.target.value
                    )
                  }
                  className="block w-1/2 px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </div>
          ))}

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
