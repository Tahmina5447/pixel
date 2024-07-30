
import Image from "next/image";
import { useState } from "react";

const paymentData = [
  {
    paymentName: "Credit/Debit Card",
    paymentIcons: "https://i.ibb.co/frDLSyB/259552.png",
    paymentDetails: [
      {
        lbl: "Card number",
        type: "number",
        eMsg: "Please input right value!",
      },
      {
        lbl: "Name on card",
        type: "text",
        eMsg: "Please input right value!",
      },
      {
        lbl: "Expiration date",
        type: "number",
        eMsg: "Please input right value!",
      },
      {
        lbl: "CVV",
        type: "number",
        eMsg: "Please input right value!",
      },
    ],
  },
  {
    paymentName: "DBBL Nexus Card",
    paymentIcons:
      "https://i.ibb.co/80DwybS/dutch-bangla-bank-logo-9-AF0455399-seeklogo-com.pnghttps://ibb.co/PNZy2Mf",
    paymentDetails: [
      {
        lbl: "Card number",
        type: "number",
        eMsg: "Please input right value!",
      },
      {
        lbl: "Name on card",
        type: "text",
        eMsg: "Please input right value!",
      },
      {
        lbl: "Expiration date",
        type: "number",
        eMsg: "Please input right value!",
      },
      {
        lbl: "CVV",
        type: "number",
        eMsg: "Please input right value!",
      },
    ],
  },
  {
    paymentName: "Rocket",
    paymentIcons: "https://i.ibb.co/W2f9mN1/290-150-1.png",
    paymentDetails: [],
  },
  {
    paymentName: "Nagad",
    paymentIcons:
      "https://i.ibb.co/JRSjz8d/nagad-logo-7-A70-CCFEE0-seeklogo-com.png",
    paymentDetails: [],
  },
  {
    paymentName: "bKash",
    paymentIcons: "https://i.ibb.co/PZHYL8M/Bkash-logo.png",
    paymentDetails: [],
  },
];

const PaymentNav = () => {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  const showModal = (dt) => {
    let modalData = [dt];
    setModalData((item) => [1, ...modalData]);

    return setModal(true);
  };

  return (
    <>
      <div className="mid-container">
        <h1 className="py-10 text-2xl">Select Payment Method</h1>
        <div className="grid grid-cols-12 gap-4">
          {paymentData.map((dt) => {
            return (
              <>
                <button
                  onClick={() => {
                    showModal(dt);
                  }}
                  className="lg:col-span-2 md:col-span-6 sm:col-span-6 col-span-12 flex flex-col justify-center items-center border-4 cursor-pointer"
                >
                  <Image
                    src={dt.paymentIcons}
                    alt="payment Method"
                    // fill
                    width={100}
                    height={100}
                    className="object-contain h-34 w-10"
                  />
                  <h1>{dt.paymentName}</h1>
                </button>
              </>
            );
          })}
        </div>
      </div>

      {modal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex gap-5 items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {modalData[1].paymentName}
                  </h3>
                  <Image
                    src={modalData[1].paymentIcons}
                    alt="payment Method"
                    // fill
                    width={100}
                    height={100}
                    className="object-contain h-34 w-10"
                  />
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form className="flex flex-col gap-5 w-full">
                    {modalData.map((dt) =>
                      dt.paymentDetails?.map((item, index) => {
                        return (
                          <>
                            <div>
                              <label htmlFor="" className="text-left w-full">
                                * {item.lbl}
                              </label>
                              <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered input-success w-full max-w-xs"
                              />
                            </div>
                          </>
                        );
                      })
                    )}
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModal(false)}
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>{" "}
        </>
      ) : null}
    </>
  );
};

export default PaymentNav;
