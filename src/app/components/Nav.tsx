"use client";
import Image from "next/image";
import { useRef, RefObject, useState, useEffect } from "react";
import { useOnboardingContext } from "../context/MyContext";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Nav() {
  const { cartFunctions, cartItems, status, name, userImgURL } =
    useOnboardingContext();

  const [checkPay, setCheckingPay] = useState(false);
  const [selectedOption, setSelectedOption] = useState("pix");
  const [loadingPay, setLoadingPay] = useState(false);

  function toggleInvisibleClass() {
    setCheckingPay(false);
    const cartList = document.getElementById("cart-list");

    if (cartList) {
      cartList.classList.toggle("show-cart-list");
    }
  }
  function toggleClass(id: string, classToggle: string, method: string): void {
    const cartList = document.getElementById(id);

    if (cartList) {
      if (method === "add") {
        cartList.classList.add(classToggle);
      } else if (method === "remove") {
        cartList.classList.remove(classToggle);
      } else if (method === "toggle") {
        cartList.classList.toggle(classToggle);
      }
    }
  }
  const totalPrice: number =
    Math.round(
      (cartItems.reduce(
        (accumulator: number, currentValue: any) =>
          accumulator + currentValue.price * currentValue.quantity,
        0
      ) +
        Number.EPSILON) *
        100
    ) / 100;

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  return (
    <>
      <div
        onClick={() => toggleClass("complete-order", "none", "add")}
        id="complete-order"
        className="none cursor-pointer order-complete fixed text-[.95rem] z-[4] text-[#808080] rounded-lg top-4 bg-white p-4 font-[500] flex flex-row hover:bg-[#deffdb]"
      >
        <div className="bg-green-400 rounded-[50%] flex items-center justify-center h-[2rem] min-w-[2rem] mr-4 my-auto">
          <Image src={"/img/ready.png"} height={18} width={18} alt="logo" />
        </div>
        <p className="w-[14.5rem]">
          Order complete successfuly with payment. Thank you for your patronage.
        </p>
        <div className="relative ml-4">
          <div className="absolute font-[600] text-[1.5rem] right-[-.4rem] top-[-.85rem]">
            x
          </div>
        </div>
      </div>
      <div
        id="cart-list"
        className="opacity-0 invisible bg-white fixed top-0 h-[100vh] w-[25%] z-[3] right-[-20%] p-6 px-0"
      >
        {checkPay ? (
          <>
            <div className="flex justify-between mx-6 mb-6">
              <svg
                onClick={() => setCheckingPay(false)}
                className="cursor-pointer"
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g
                    id="Arrow"
                    transform="translate(-480.000000, 0.000000)"
                    fillRule="nonzero"
                  >
                    <g
                      id="back_2_line"
                      transform="translate(480.000000, 0.000000)"
                    >
                      <path
                        d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
                        id="MingCute"
                        fillRule="nonzero"
                      ></path>
                      <path
                        d="M6.04599,11.6767 C7.35323,9.47493 9.75524,8 12.5,8 C16.6421,8 20,11.3579 20,15.5 C20,16.0523 20.4477,16.5 21,16.5 C21.5523,16.5 22,16.0523 22,15.5 C22,10.2533 17.7467,6 12.5,6 C9.31864,6 6.50386,7.56337 4.78,9.96279 L4.24303,6.91751 C4.14713,6.37361 3.62847,6.01044 3.08458,6.10635 C2.54068,6.20225 2.17751,6.72091 2.27342,7.2648 L3.31531,13.1736 C3.36136,13.4348 3.50928,13.667 3.72654,13.8192 C4.0104,14.0179 4.38776,14.0542 4.70227,13.9445 L10.3826,12.9429 C10.9265,12.847 11.2897,12.3284 11.1938,11.7845 C11.0979,11.2406 10.5792,10.8774 10.0353,10.9733 L6.04599,11.6767 Z"
                        id="路径"
                        fill="#09244B"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
              <div className="flex justify-between items-center gap-2 cursor-pointer">
                <p className="font-[500]">Secured Payment</p>
              </div>
              <div
                className="flex items-center justify-center gap-1"
                title="Secured"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  className="text-xl cursor-pointer fill-red-500"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"></path>
                  <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z"></path>
                </svg>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="text-xl cursor-pointer fill-red-500"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fillRule="nonzero"
                      d="M11 2l7.298 2.28a1 1 0 0 1 .702.955V7h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1l-3.22.001c-.387.51-.857.96-1.4 1.33L11 22l-5.38-3.668A6 6 0 0 1 3 13.374V5.235a1 1 0 0 1 .702-.954L11 2zm0 2.094L5 5.97v7.404a4 4 0 0 0 1.558 3.169l.189.136L11 19.58 14.782 17H10a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h7V5.97l-6-1.876zM11 12v3h9v-3h-9zm0-2h9V9h-9v1z"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="bg-[#292c28] h-full rounded-t-[2rem] flex flex-col justify-between">
              <div className="flex flex-col px-4 ">
                <div className="flex flex-row justify-between py-6 ">
                  <label
                    htmlFor="pix"
                    className={`cursor-pointer w-[45%] flex flex-row items-center gap-4 rounded-full px-2 py-[.2rem] ${
                      selectedOption === "pix" ? "bg-[#e3e3e3]" : null
                    }`}
                  >
                    <input
                      disabled={loadingPay}
                      className="h-5 w-5"
                      type="radio"
                      id="pix"
                      name="pay method"
                      value="pix"
                      checked={selectedOption === "pix"}
                      onChange={handleOptionChange}
                    />
                    <div className="flex items-center justify-center w-[50%]">
                      <Image
                        src={"/img/pix.webp"}
                        height={32}
                        width={40}
                        alt="logo"
                      />
                    </div>
                  </label>
                  <label
                    htmlFor="card"
                    className={`cursor-pointer w-[45%] flex flex-row items-center gap-2 rounded-full p-2 ${
                      selectedOption === "card" ? "bg-[#e3e3e3]" : null
                    }`}
                  >
                    <input
                      disabled={loadingPay}
                      className="h-5 w-5"
                      type="radio"
                      id="card"
                      name="pay method"
                      value="card"
                      checked={selectedOption === "card"}
                      onChange={handleOptionChange}
                    />
                    <Image
                      src={"/img/visa.webp"}
                      height={30}
                      width={40}
                      alt="logo"
                    />
                    <Image
                      src={"/img/mastercard.webp"}
                      height={30}
                      width={40}
                      alt="logo"
                    />
                  </label>
                </div>
                {selectedOption === "card" ? (
                  <>
                    <div className="w-full p-1 px-2 rounded-lg flex flex-col">
                      <div className="w-full flex flex-col mb-2">
                        <label
                          htmlFor="name"
                          className="font-bold text-sm mb-1 text-gray-100"
                        >
                          Name on Card
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-[#323631] transition-colors"
                          placeholder="Enter your name"
                          autoComplete="off"
                        />
                      </div>
                      <div className="w-full flex flex-col mb-2">
                        <label
                          htmlFor="number"
                          className="font-bold text-sm mb-1 text-gray-100"
                        >
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="number"
                          className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-[#323631] transition-colors"
                          placeholder="Enter your number"
                          autoComplete="off"
                        />
                      </div>
                      <div className="w-full flex justify-between gap-1 mb-2">
                        <div className="flex flex-col ">
                          <label
                            htmlFor="number"
                            className="font-bold text-sm mb-1 text-gray-100"
                          >
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="text"
                            className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-[#323631]"
                            placeholder="MM/YY"
                            autoComplete="off"
                          />
                        </div>
                        <div className="flex flex-col ">
                          <label
                            htmlFor="number"
                            className="font-bold text-sm mb-1 text-gray-100"
                          >
                            CVV
                          </label>
                          <input
                            type="text"
                            id="password"
                            className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-[#323631] transition-colors"
                            placeholder="CVV"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                <p className="mt-4 w-full text-gray-300 font-[600] text-center">
                  Amount Due:{" "}
                  <span className="font-bold text-white">${totalPrice}</span>
                </p>
                <button
                  disabled={loadingPay}
                  onClick={() => {
                    setLoadingPay(true);

                    setTimeout(function () {
                      setCheckingPay(false);
                      toggleInvisibleClass();
                      toggleClass("complete-order", "none", "remove");
                      setLoadingPay(false);
                      cartFunctions("clear");
                    }, 1000);
                  }}
                  className="w-full p-2 rounded-full bg-gradient-to-tr from-green-400 to-green-600 text-gray-50 text-lg my-2 hover:shadow-lg font-[600]
          flex flex-row items-center justify-center gap-2"
                >
                  {loadingPay ? (
                    <div className="loader"></div>
                  ) : (
                    <>
                      <svg
                        width="1.4rem"
                        height="1.4rem"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      PAY NOW
                    </>
                  )}
                </button>
              </div>
              <div className="bg-[#323631] grow px-6 rounded-t-[2rem] flex flex-col py-8 gap-5 mt-8 ">
                <div className="flex flex-row w-full text-white items-center justify-center font-[600] gap-2">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    className="text-xl cursor-pointer fill-red-500"
                    height="1.5rem"
                    width="1.5rem"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"></path>
                    <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z"></path>
                  </svg>
                  <p>
                    Secured by
                    <span className="text-green-500 text-[.95rem] font-[800]">
                      {" "}
                      ZONESTACK
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between mx-6 mb-6">
              <svg
                onClick={toggleInvisibleClass}
                className="cursor-pointer"
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g
                    id="Arrow"
                    transform="translate(-480.000000, 0.000000)"
                    fillRule="nonzero"
                  >
                    <g
                      id="back_2_line"
                      transform="translate(480.000000, 0.000000)"
                    >
                      <path
                        d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
                        id="MingCute"
                        fillRule="nonzero"
                      ></path>
                      <path
                        d="M6.04599,11.6767 C7.35323,9.47493 9.75524,8 12.5,8 C16.6421,8 20,11.3579 20,15.5 C20,16.0523 20.4477,16.5 21,16.5 C21.5523,16.5 22,16.0523 22,15.5 C22,10.2533 17.7467,6 12.5,6 C9.31864,6 6.50386,7.56337 4.78,9.96279 L4.24303,6.91751 C4.14713,6.37361 3.62847,6.01044 3.08458,6.10635 C2.54068,6.20225 2.17751,6.72091 2.27342,7.2648 L3.31531,13.1736 C3.36136,13.4348 3.50928,13.667 3.72654,13.8192 C4.0104,14.0179 4.38776,14.0542 4.70227,13.9445 L10.3826,12.9429 C10.9265,12.847 11.2897,12.3284 11.1938,11.7845 C11.0979,11.2406 10.5792,10.8774 10.0353,10.9733 L6.04599,11.6767 Z"
                        id="路径"
                        fill="#09244B"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
              <div className="flex justify-between items-center gap-2 cursor-pointer">
                <p className="font-[500]">Cart</p>
                <svg
                  className="fill-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.25rem"
                  viewBox="0 0 448 512"
                >
                  <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
                </svg>
              </div>
              <div
                onClick={() => cartFunctions("clear")}
                className="select-none flex justify-between items-center gap-2 cursor-pointer"
              >
                <p className="font-[500]">clear</p>
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 9a1 1 0 01-1-1c0-.551-.448-1-1-1H5.414l1.293 1.293a.999.999 0 11-1.414 1.414l-3-3a.999.999 0 010-1.414l3-3a.997.997 0 011.414 0 .999.999 0 010 1.414L5.414 5H15c1.654 0 3 1.346 3 3a1 1 0 01-1 1zM3 11a1 1 0 011 1c0 .551.448 1 1 1h9.586l-1.293-1.293a.999.999 0 111.414-1.414l3 3a.999.999 0 010 1.414l-3 3a.999.999 0 11-1.414-1.414L14.586 15H5c-1.654 0-3-1.346-3-3a1 1 0 011-1z"
                    className="fill-red-500"
                  />
                </svg>
              </div>
            </div>
            {cartItems.length > 0 ? (
              <div className="bg-[#292c28] h-full rounded-t-[2rem] flex flex-col justify-between">
                <div className="px-3 py-5 w-full h-[19rem]">
                  <div className="w-full flex flex-col gap-3 overflow-scroll overflow-x-hidden scrollbar-hidden scroll-smooth h-full">
                    {cartItems.map((item: any) => {
                      return (
                        <div
                          key={item.name}
                          className="bg-[#323631] rounded-lg px-2 py-2 min-h-[5.5rem] w-full flex items-center justify-between"
                        >
                          <div className="flex flex-row gap-1">
                            <Image
                              className="w-20 h-20 max-w-[60px] rounded-full object-contain"
                              src={item.imgSrc}
                              width={108}
                              height={108}
                              alt="empty cart"
                            />
                            <div className="flex flex-col font-[600] justify-center">
                              <p className="text-white flex flex-wrap text-[.95rem]">
                                {item.name}
                              </p>
                              <p className="text-[#c4c4c4] text-[.9rem]">
                                <span className="text-red-600">$</span>{" "}
                                {item.price}
                              </p>
                            </div>
                          </div>
                          <div className="select-none flex flex-row gap-2">
                            <div className="flex flex-row gap-[.2rem] items-center">
                              <svg
                                onClick={() =>
                                  cartFunctions("update", {
                                    operation: "minus",
                                    item: item.name,
                                  })
                                }
                                className="cursor-pointer"
                                width="25px"
                                height="25px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15 12H9"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                              <p className="bg-[#292c28] text-[.875rem] text-white w-5 h-5 font-[600] text-center">
                                {item.quantity}
                              </p>
                              <svg
                                onClick={() =>
                                  cartFunctions("update", {
                                    operation: "plus",
                                    item: item.name,
                                  })
                                }
                                className="cursor-pointer"
                                width="25px"
                                height="25px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </div>
                            <div
                              onClick={() =>
                                cartFunctions("remove", {
                                  item: item.name,
                                })
                              }
                              className="cursor-pointer text-sm text-gray-50 w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center p-[.1rem]"
                            >
                              <svg
                                className="text-center fill-white flex justify-center items-center pr-[2px]"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                              >
                                <path d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-[#323631] h-[50%] px-6 rounded-t-[2rem] flex flex-col py-8 gap-5">
                  <div className="flex flex-row justify-between text-[1.1rem] font-[550] text-[#adadad]">
                    <p className="w-24">Sub Total</p>
                    <div>-</div>
                    <p className="w-24 text-right">
                      <span className="text-red-600">$</span> {totalPrice}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between text-[1.1rem] font-[550] text-[#adadad]">
                    <p className="w-24">Delivery</p>
                    <div>-</div>
                    <p className="w-24 text-right">
                      <span className="text-red-600">$</span> 0
                    </p>
                  </div>
                  <hr className="border-[#808080]"></hr>
                  <div className="flex flex-row justify-between text-[1.25rem] font-[550] text-white">
                    <p className="w-24">TOTAL</p>
                    <div>-</div>
                    <p className="w-24 text-right">
                      <span className="text-red-600">$</span> {totalPrice}
                    </p>
                  </div>
                  <button
                    onClick={() => setCheckingPay(true)}
                    className="w-full p-2 rounded-full bg-gradient-to-tr from-green-400 to-green-600 text-gray-50 text-lg my-2 hover:shadow-lg font-[600]"
                  >
                    Checkout ${totalPrice}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-40 flex flex-col justify-center items-center">
                <Image
                  src={"/img/empty-cart.png"}
                  width={500}
                  height={500}
                  alt="empty cart"
                />
                <p className="font-[600] text-[#5e5e5e] text-[1.2rem]">
                  Cart is empty
                </p>
              </div>
            )}
          </>
        )}
      </div>
      <div
        id="contact-us"
        className="w-full py-6 h-screen md:w-[350px] bg-white md:backdrop-blur-sm flex flex-col z-[101] drop-shadow-xl fixed top-0 left-0"
      >
        <div className="flex justify-between mx-6 mb-6">
          <div className="flex items-center justify-center gap-x-2 px-2">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="text-xl cursor-pointer text-orange-600"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M4 4h16v12H5.17L4 17.17V4m0-2c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4zm2 10h12v2H6v-2zm0-3h12v2H6V9zm0-3h12v2H6V6z"></path>
            </svg>
            <span className="font-[500]">CONTACT US</span>
          </div>
          <div>
            <svg
              onClick={() => toggleClass("contact-us", "none", "toggle")}
              className="cursor-pointer scale-x-[-1]"
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g stroke="none" strokeWidth="-1" fill="none" fillRule="evenodd">
                <g
                  id="Arrow"
                  transform="translate(-480.000000, 0.000000)"
                  fillRule="nonzero"
                >
                  <g
                    id="back_2_line"
                    transform="translate(480.000000, 0.000000)"
                  >
                    <path
                      d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
                      id="MingCute"
                      fillRule="nonzero"
                    ></path>
                    <path
                      d="M6.04599,11.6767 C7.35323,9.47493 9.75524,8 12.5,8 C16.6421,8 20,11.3579 20,15.5 C20,16.0523 20.4477,16.5 21,16.5 C21.5523,16.5 22,16.0523 22,15.5 C22,10.2533 17.7467,6 12.5,6 C9.31864,6 6.50386,7.56337 4.78,9.96279 L4.24303,6.91751 C4.14713,6.37361 3.62847,6.01044 3.08458,6.10635 C2.54068,6.20225 2.17751,6.72091 2.27342,7.2648 L3.31531,13.1736 C3.36136,13.4348 3.50928,13.667 3.72654,13.8192 C4.0104,14.0179 4.38776,14.0542 4.70227,13.9445 L10.3826,12.9429 C10.9265,12.847 11.2897,12.3284 11.1938,11.7845 C11.0979,11.2406 10.5792,10.8774 10.0353,10.9733 L6.04599,11.6767 Z"
                      id="路径"
                      fill="#09244B"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div className="h-full w-full flex items-center flex-col justify-center px-4 bg-primary">
          <div className="mb-6 w-full flex itemx-center justify-center gap-y-3 flex-col">
            <div className="mb-6">
              <input
                type="text"
                className="form-control block w-full px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-6">
              <input
                type="text"
                className="form-control block w-full px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                placeholder="Email ID"
              />
            </div>
            <div className="mb-6">
              <input
                type="text"
                className="form-control block w-full px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                placeholder="Subject"
              />
            </div>
            <div className="mb-6">
              <textarea
                className="form-control block w-full min-h-[25vh] px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                placeholder="Message"
              ></textarea>
            </div>
            <button className="w-full p-2 rounded-full bg-gradient-to-tr from-green-400 to-green-600 text-gray-50 text-lg my-2 hover:shadow-lg font-[600]">
              Send Message
            </button>
          </div>
          <p className="mb-2 cursor-pointer text-sm text-gray-500 dark:text-gray-400">
            <a
              href="mailto:angelocraft551@gmail.com"
              className="hover:underline"
            >
              angelocraft551@gmail.com
            </a>
          </p>
        </div>
      </div>
      <nav className="top-0 white-transparent backdrop-blur px-[6rem] py-[1.5rem] pt-[1.2rem] w-full fixed flex flex-row justify-between z-[2]">
        <div className="gap-2 font-[700] text-[1.4rem] flex flex-row h-[2.2rem] cursor-pointer">
          <Image
            className="object-contain w-auto"
            src={"/img/logo.png"}
            height={40}
            width={40}
            alt="logo"
          />
          <p className="text-center items-center flex pt-[0.6rem] select-none	">
            Zoné
          </p>
        </div>
        <ul className="flex flex-row gap-[3rem] text-[.9rem] text-[#808080] font-[500] text-center items-center flex pt-[0.5rem] select-none	">
          <li className="cursor-pointer">
            <Link href="/">Home </Link>
          </li>
          <li className="cursor-pointer">
            <Link href="/menu">Menu </Link>
          </li>
          <li
            onClick={() => toggleClass("contact-us", "none", "toggle")}
            className="cursor-pointer"
          >
            Contact us
          </li>
        </ul>
        <ul className="flex flex-row mt-[.5rem] gap-[2rem]">
          {status === "authenticated" ? (
            <>
              <div
                className="cursor-pointer relative mt-[.3rem]"
                onClick={toggleInvisibleClass}
              >
                <ShopBagSvg />
                <div className="absolute top-[-.7rem] right-[-.9rem] bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {cartItems.length}
                </div>
              </div>
              <div className="profile-box flex flex-row items-center cursor-pointer relative">
                <div className="z-[3] profile-list top-[2.5rem] flex flex-col absolute w-[20rem] rounded-md bg-[#e0f5ff] right-[-5rem] font-[480] shadow-xl">
                  <div className="px-10 py-[.4rem] cursor-text rounded-t-md">
                    <p>{name}</p>
                  </div>
                  <Link
                    href={"/dashboard"}
                    className="flex flex-row gap-2 px-10 py-[.4rem] hover:bg-white"
                  >
                    <p>Profile</p>
                    <svg
                      className="mt-[.1rem] flex items-center justify-center"
                      width="1rem"
                      height="1rem"
                      viewBox="0 0 20 20"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        id="Page-1"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g
                          id="Dribbble-Light-Preview"
                          transform="translate(-380.000000, -2119.000000)"
                          fill="#000000"
                        >
                          <g
                            id="icons"
                            transform="translate(56.000000, 160.000000)"
                          >
                            <path
                              d="M338.083123,1964.99998 C338.083123,1962.79398 336.251842,1960.99998 334,1960.99998 C331.748158,1960.99998 329.916877,1962.79398 329.916877,1964.99998 C329.916877,1967.20599 331.748158,1968.99999 334,1968.99999 C336.251842,1968.99999 338.083123,1967.20599 338.083123,1964.99998 M341.945758,1979 L340.124685,1979 C339.561214,1979 339.103904,1978.552 339.103904,1978 C339.103904,1977.448 339.561214,1977 340.124685,1977 L340.5626,1977 C341.26898,1977 341.790599,1976.303 341.523154,1975.662 C340.286989,1972.69799 337.383888,1970.99999 334,1970.99999 C330.616112,1970.99999 327.713011,1972.69799 326.476846,1975.662 C326.209401,1976.303 326.73102,1977 327.4374,1977 L327.875315,1977 C328.438786,1977 328.896096,1977.448 328.896096,1978 C328.896096,1978.552 328.438786,1979 327.875315,1979 L326.054242,1979 C324.778266,1979 323.773818,1977.857 324.044325,1976.636 C324.787453,1973.27699 327.107688,1970.79799 330.163906,1969.67299 C328.769519,1968.57399 327.875315,1966.88999 327.875315,1964.99998 C327.875315,1961.44898 331.023403,1958.61898 334.733941,1959.04198 C337.422678,1959.34798 339.650022,1961.44698 340.05323,1964.06998 C340.400296,1966.33099 339.456073,1968.39599 337.836094,1969.67299 C340.892312,1970.79799 343.212547,1973.27699 343.955675,1976.636 C344.226182,1977.857 343.221734,1979 341.945758,1979 M337.062342,1978 C337.062342,1978.552 336.605033,1979 336.041562,1979 L331.958438,1979 C331.394967,1979 330.937658,1978.552 330.937658,1978 C330.937658,1977.448 331.394967,1977 331.958438,1977 L336.041562,1977 C336.605033,1977 337.062342,1977.448 337.062342,1978"
                              id="profile_round-[#1346]"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </Link>
                  <div
                    onClick={() => signOut()}
                    className="flex flex-row gap-2 px-10 py-[.4rem] hover:bg-white rounded-b-md"
                  >
                    <p>Logout</p>
                    <svg
                      className="pt-[.3rem] flex items-center justify-center"
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.1rem"
                      viewBox="0 0 512 512"
                    >
                      <path d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"></path>
                    </svg>
                  </div>
                </div>
                <div
                  className={`pb-0 bg-[#3bc416] w-10 h-10 rounded-[50%] relative overflow-hidden ${
                    userImgURL ? "p-0" : "p-1"
                  }`}
                >
                  {userImgURL ? (
                    <Image
                      className="w-full min-h-[40px] absolute bg-white"
                      src={userImgURL}
                      width={56}
                      height={56}
                      alt="Picture of the author"
                    />
                  ) : null}

                  <svg
                    className="w-full h-full fill-[#d9ffd9]"
                    version="1.1"
                    id="_x32_"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path
                        d="M256,265.308c73.252,0,132.644-59.391,132.644-132.654C388.644,59.412,329.252,0,256,0
  c-73.262,0-132.643,59.412-132.643,132.654C123.357,205.917,182.738,265.308,256,265.308z"
                      />
                      <path
                        d="M425.874,393.104c-5.922-35.474-36-84.509-57.552-107.465c-5.829-6.212-15.948-3.628-19.504-1.427
  c-27.04,16.672-58.782,26.399-92.819,26.399c-34.036,0-65.778-9.727-92.818-26.399c-3.555-2.201-13.675-4.785-19.505,1.427
  c-21.55,22.956-51.628,71.991-57.551,107.465C71.573,480.444,164.877,512,256,512C347.123,512,440.427,480.444,425.874,393.104z"
                      />
                    </g>
                  </svg>
                </div>
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 10L12 15L17 10"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </>
          ) : (
            <div className="flex  gap-2">
              <Link href="/sign-in">
                <div className="select-none cursor-pointer px-[1rem] text-center py-[.25rem] gap-[.5rem] font-[500] flex flex-row border-[1px] rounded-md  ">
                  <LoginSvg />
                  Sign In
                </div>
              </Link>
              <Link href="/sign-up">
                <div className="register-button border-[#46CC21] select-none cursor-pointer px-[1rem] text-center py-[.25rem] gap-[.5rem] font-[500] flex flex-row border-[1px] rounded-md  ">
                  <RegisterSvg />
                  Sign Up
                </div>
              </Link>
            </div>
          )}
        </ul>
      </nav>
    </>
  );
}

function ShopBagSvg() {
  return (
    <svg
      className="fill-[#4a4a4a]"
      xmlns="http://www.w3.org/2000/svg"
      height="1.5rem"
      viewBox="0 0 448 512"
    >
      <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
    </svg>
  );
}
function LoginSvg() {
  return (
    <svg
      className="pt-[.3rem]"
      xmlns="http://www.w3.org/2000/svg"
      height="1.1rem"
      viewBox="0 0 512 512"
    >
      <path d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
    </svg>
  );
}
function RegisterSvg() {
  return (
    <svg
      className="flex justify-center items-center h-full"
      width="1.1rem"
      height="1.1rem"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 9H4V8h14zm-5 3H4v1h9zm8-8v9h-1V5H2v13h9v1H1V4zm2.07 11.637l-.707-.707-5.863 5.863-2.863-2.863-.707.707 3.57 3.57z" />
      <path fill="none" d="M0 0h24v24H0z" />
    </svg>
  );
}
