import { useEffect, useState } from "react";
import Modal from "react-modal";
import file from "../../svg/file.svg";
import axios from "axios";
import { url } from "../../api";
import { useSelector } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";
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

function UpdateModal({ data }: { data: any }) {
  const [debt, setDebt] = useState([]);
  const [debtName, setDebtName] = useState("");
  const [lender, setLender] = useState("");
  const [debtAmount, setDebtAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [amount, setAmount] = useState(0);
  const [paymentStart, setPaymentStart] = useState("");
  const [installment, setInstallment] = useState(0);
  const [desc, setDesc] = useState("");
  const token = useSelector((state: any) => state.auth.token);
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
    getDebt();
  }

  function closeModal() {
    setIsOpen(false);
  }

  const getDebt = () =>{
    axios.get(url + 'finance/payment-plans/' + data.id, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then(res =>{
        setDebt(res.data.data)
    }).catch(err => {
        toast.error(err.response.data.message)
    })
  }
  const updateData = (e: React.FormEvent) => {
    axios.put(
      url + "finance/debt/" + data?.id,
      {
        debtName: debtName,
        lenderName: lender,
        debtAmount: debtAmount,
        interestRate: interestRate,
        amount: debtAmount + (debtAmount * interestRate) / 100,
        paymentStart: paymentStart,
        installment: installment,
        description: desc,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  };
  return (
    <div>
      <button
        onClick={openModal}
        className="px-2 py-2 rounded-lg bg-slate-200 hover:bg-slate-100"
      >
        <img src={file} alt="dosya" />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8 overflow-auto max-h-svh"
          onSubmit={updateData}
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
              value={data.debtName}
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
              value={data?.lenderName}
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
              value={data?.debtAmount}
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
              value={data?.interestRate}
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
              value={data?.amount}
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
              value={moment(data?.paymentStart).format("YYYY-MM-DD")}
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
              value={data?.installment}
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
              value={data?.description}
              onChange={(e) => setDesc(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></textarea>
          </div>

          <div className="flex justify-between w-full items-center">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 m-2"
            >
              Güncelle
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

export default UpdateModal;
