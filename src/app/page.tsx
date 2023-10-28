"use client";
import Image from "next/image";
import { useRef, RefObject, useState, useEffect } from "react";
import products from "@/app/utils/MenuData";
import Link from "next/link";

export default function Home() {
  const [categorySelected, setCategorySelected] = useState("Menu");
  const [reorderedProducts, setReorderedProducts] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [checkPay, setCheckingPay] = useState(false);
  const addToCart = (item: string) => {
    if (logged) {
      const itemIndex = cartItems.findIndex(
        (cartItem) => cartItem.name === item
      );

      if (itemIndex !== -1) {
        const updatedCart = [...cartItems];
        updatedCart[itemIndex].quantity += 1;
        setCartItems(updatedCart);
      } else {
        const itemSelect = products.filter(
          (productItem) => productItem.name === item
        );
        const { imgSrc, name, price } = itemSelect[0];

        const updatedCart = [
          ...cartItems,
          { imgSrc, name, price, quantity: 1 },
        ];
        setCartItems(updatedCart);
      }
    }
  };

  const removeFromCart = (item: string) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.name !== item);
    setCartItems(updatedCart);
  };

  const updateQuantity = (item: string, operation: string) => {
    const updatedCart = cartItems.map((cartItemOld) => {
      if (cartItemOld.name === item) {
        if (operation === "plus") {
          return { ...cartItemOld, quantity: cartItemOld.quantity + 1 };
        } else if (cartItemOld.quantity > 1) {
          return { ...cartItemOld, quantity: cartItemOld.quantity - 1 };
        }
      }
      return cartItemOld;
    });
    setCartItems(updatedCart);
  };
  useEffect(() => {
    // Función para desordenar el array
    function desordenarArray<T>(array: T[]): T[] {
      const arrayDesordenado = [...array];
      for (let i = arrayDesordenado.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayDesordenado[i], arrayDesordenado[j]] = [
          arrayDesordenado[j],
          arrayDesordenado[i],
        ];
      }
      return arrayDesordenado;
    }

    // Llama a desordenarArray() y establece reorderedProducts al cargar la página
    setReorderedProducts(desordenarArray(products));
  }, [products]);

  const containerRef: RefObject<HTMLDivElement> = useRef(null);

  const scrollRight = (right: boolean) => {
    const container = containerRef.current;
    const dir = right ? 208 * 6 : -208 * 6;
    if (container) {
      container.scrollLeft += dir; // Ajusta el valor según tu preferencia
    }
  };
  const logged = true;
  function toggleInvisibleClass() {
    setCheckingPay(false);
    const cartList = document.getElementById("cart-list");

    if (cartList) {
      cartList.classList.toggle("show-cart-list");
    }
  }
  const totalPrice: number =
    Math.round(
      (cartItems.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.price * currentValue.quantity,
        0
      ) +
        Number.EPSILON) *
        100
    ) / 100;
  return (
    <main>
      <div
        id="cart-list"
        className="opacity-0 invisible bg-white fixed h-[100vh] w-[25%] z-[3] right-[-20%] p-6 px-0"
      >
        {checkPay ? (
          <div></div>
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
                onClick={() => setCartItems([])}
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
                    {cartItems.map((item) => {
                      return (
                        <div
                          key={item.name}
                          className="bg-[#323631] rounded-lg px-2 py-4 min-h-[5.5rem] w-full flex items-center justify-between"
                        >
                          <div className="flex flex-row gap-1">
                            <div className="min-w-[3.5rem] min-h-[3.5rem] flex justify-center items-center">
                              <Image
                                className="h-auto"
                                src={item.imgSrc}
                                width={48}
                                height={48}
                                alt="empty cart"
                              />
                            </div>
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
                                  updateQuantity(item.name, "minus")
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
                                  updateQuantity(item.name, "plus")
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
                              onClick={() => removeFromCart(item.name)}
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
      <nav className="white-transparent backdrop-blur px-[6rem] py-[1.5rem] pt-[1.2rem] w-full fixed flex flex-row justify-between z-[2]">
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
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Menu</li>
          <li className="cursor-pointer">Contact us</li>
        </ul>
        <ul className="flex flex-row mt-[.5rem] gap-[2rem]">
          {logged ? (
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
              <div className="profile-box flex flex-row items-center cursor-pointer">
                <div className="p-1 pb-0 bg-[#3bc416] w-10 h-10 rounded-[50%] relative">
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
                  <div className="profile-list flex flex-col absolute w-[20rem] rounded-md bg-[#e0f5ff] right-[-5rem] font-[480] shadow-xl">
                    <div className="px-10 py-[.4rem] hover:bg-white rounded-t-md">
                      <p>Angelocraft551@gmail.com</p>
                    </div>
                    <div className="px-10 py-[.4rem] hover:bg-white">
                      <p>Profile</p>
                    </div>
                    <div className="px-10 py-[.4rem] hover:bg-white rounded-b-md">
                      <p>Logout</p>
                    </div>
                  </div>
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
            <div className="select-none cursor-pointer px-[1rem] text-center py-[.25rem] gap-[.5rem] font-[500] flex flex-row border-[1px] rounded-md  ">
              <LoginSvg />
              Login
            </div>
          )}
        </ul>
      </nav>
      <section className="pt-[6.5rem] px-[2rem]">
        <div className="flex flex-row gap-[0.65rem]">
          <div className="w-[50%] flex flex-col gap-3 justify-center">
            <div className="w-[11.30rem] gap-[.5rem] h-[2.5rem] bg-[#cdfac0] rounded-full flex items-center px-[.80rem]">
              <p className="text-[#46cc21] font-[700]">Bike Delivery</p>
              <div className="bg-white rounded-[50%] w-[2rem] h-[2rem] flex justify-center items-center">
                <Image
                  src={"/img/motorcycle-delivery.png"}
                  height={20}
                  width={20}
                  alt="motorcycle delivery"
                />
              </div>
            </div>
            <h1 className="text-[4rem] font-[700]">
              The Fastest Food Delivery in
              <span className="text-[#3bc416] text-[4.6rem]"> Manaus</span>
            </h1>
            <p className="font-[480]  text-[#808080] w-[90%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              nam delectus sed, vel quaerat, libero nesciunt debitis, architecto
              repudiandae accusamus aut exercitationem nisi non doloribus!
              Temporibus officia architecto reiciendis blanditiis.
            </p>
            <div className="select-none cursor-pointer mt-[1rem] bg-[#46cc21] block p-[.8rem] py-[.6rem] rounded-md w-[7.25rem]">
              Order Now
            </div>
          </div>
          <div className="w-[50%] relative">
            <Image
              priority
              className="rounded-[20px]  z-[-1]  ml-auto lg:h-[550px] h-[420px] w-full lg:w-auto right-0"
              src={"/img/hero.jpg"}
              height={736}
              width={460}
              alt="motorcycle delivery"
            />
            <div className="w-[344px] z-[1] absolute gradient-transparent rounded-[20px] ml-auto lg:h-[550px] h-[420px] top-0 right-0"></div>
            <div className="absolute z-[1] w-full h-full flex flex-wrap justify-center items-center gap-hero top-0">
              {products ? (
                <>
                  <ItemsToBuy
                    addToCart={addToCart}
                    name={products[9].name}
                    imgSrc={products[9].imgSrc}
                    description={products[9].description}
                    price={products[9].price}
                  />
                  <ItemsToBuy
                    addToCart={addToCart}
                    name={products[1].name}
                    imgSrc={products[1].imgSrc}
                    description={products[1].description}
                    price={products[1].price}
                  />
                  <ItemsToBuy
                    addToCart={addToCart}
                    name={products[29].name}
                    imgSrc={products[29].imgSrc}
                    description={products[29].description}
                    price={products[29].price}
                  />
                  <ItemsToBuy
                    addToCart={addToCart}
                    name={products[25].name}
                    imgSrc={products[25].imgSrc}
                    description={products[25].description}
                    price={products[25].price}
                  />
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      <section className="mt-20 px-[2rem]">
        <div className="flex flex-row justify-between">
          <h2 className="text-[1.5rem] font-[400] relative before:absolute before:rounded before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-[#46cc21]">
            Our Fresh & Healthy Fruits
          </h2>
          <div className="flex flex-row gap-3">
            <div className="cursor-pointer" onClick={() => scrollRight(false)}>
              <ArrowSvg right={false} />
            </div>
            <div className="cursor-pointer" onClick={() => scrollRight(true)}>
              <ArrowSvg right={true} />
            </div>
          </div>
        </div>
        <div
          ref={containerRef}
          className="mt-8 px-4 flex items-center w-full overflow-x-scroll min-h-[18rem] gap-x-4 bg-[#d9ffd9] scrollbar-hidden scroll-smooth"
        >
          {products
            ? products
                .filter(
                  (item: {
                    name: string;
                    price: number;
                    imgSrc: string;
                    description: string;
                    category: string;
                  }) => item.category === "Fruits"
                )
                .map(
                  (item: {
                    name: string;
                    price: number;
                    imgSrc: string;
                    description: string;
                    category: string;
                  }) => {
                    return (
                      <ItemsToBuy
                        addToCart={addToCart}
                        key={item.name}
                        imgSrc={item.imgSrc}
                        name={item.name}
                        price={item.price}
                        description={item.description}
                      />
                    );
                  }
                )
            : null}
        </div>
      </section>
      <section className="mt-20 px-[2rem]">
        <div className="w-full flex items-center justify-center">
          <h2 className="text-[1.5rem] font-[400] relative before:absolute before:rounded before:content before:w-32 before:h-1 before:-bottom-2 before:left-12 before:bg-[#46cc21] before:items-center		 text-center">
            Our Sizzling Dishes
          </h2>
        </div>
        <div className="mt-10 flex flex-row mb-12 justify-center gap-8">
          <CategoryButton
            setCategorySelected={setCategorySelected}
            selected={categorySelected}
            name="Menu"
          >
            <svg
              stroke="white"
              fill="white"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1.25rem"
              width="1.25rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 10h-2V3H8v7H6V3H4v8c0 1.654 1.346 3 3 3h1v7h2v-7h1c1.654 0 3-1.346 3-3V3h-2v7zm7-7h-1c-1.159 0-2 1.262-2 3v8h2v7h2V4a1 1 0 0 0-1-1z"></path>
            </svg>
          </CategoryButton>
          <CategoryButton
            setCategorySelected={setCategorySelected}
            selected={categorySelected}
            name="Chicken"
          >
            <svg
              stroke="white"
              fill="white"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1.25rem"
              width="1.25rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M187.8 45.5s-12.6 6.61-25.3 16.33c-6.3 4.86-12.8 10.5-18 16.94-5.2 6.44-9.5 13.89-9.5 22.73 0 8.6 4.6 15.7 10 20.6 5.3 4.8 11.5 8.2 17.3 11.4 5.8 3.2 11.3 6.3 15 9.3 3.7 3 5.4 5.4 5.8 8.1 1.1 6.6-5.2 22.1-13.2 34.5-8.1 12.4-16.6 22.1-16.6 22.1l13.4 12s9.4-10.6 18.3-24.3c8.9-13.7 18.6-30.2 15.9-47.1-1.4-8.5-6.6-14.8-12.3-19.3-5.6-4.6-11.9-7.9-17.6-11.1-5.7-3.1-10.9-6.2-14-9-3.1-2.8-4-4.5-4-7.2 0-2.49 1.7-6.72 5.5-11.41 3.8-4.7 9.3-9.64 15-13.96 11.3-8.63 22.7-14.71 22.7-14.71zm90 32.43s-12.4 4.66-25.1 11.56c-6.3 3.45-12.8 7.42-18.1 12.11-5.4 4.7-10.6 10.4-10.6 18.9 0 8.2 5.7 14 11.1 17.5 5.4 3.4 11.4 5.8 17.3 8.1 5.8 2.2 11.4 4.5 15.1 6.6 3.7 2.2 4.7 3.9 4.7 4 .2.6-.2 3.7-2.5 7.8-2.2 4-6 8.8-9.9 13.1-7.9 8.7-16.4 15.6-16.4 15.6l11.2 14s9.4-7.5 18.5-17.4c4.5-5 9-10.5 12.4-16.6 3.3-6 6-12.8 4.3-20.5-1.8-7.8-7.7-12.3-13.3-15.6-5.6-3.2-11.8-5.5-17.6-7.8-5.7-2.3-11-4.5-14-6.5-2.3-1.4-2.8-2.1-2.9-2.3.2 0 1.1-2.4 4.4-5.4 3.7-3.2 9.2-6.7 14.9-9.8 11.3-6.16 22.9-10.53 22.9-10.53zm67.5 12.82c-3.7.69-7.8 4.37-10.9 10.65-3.1 6.3-4.6 14.5-4.1 20.2.1 1.1 4.1 8.2 9 13.3 5 5.1 9.9 8.9 9.9 8.9l4.5 3.4-10.6 51.3 14.3 4.4 22.1-42.2c-5.1-5.5-10.2-11.9-10.9-21-.5-7.6.6-15.7 3.4-23.4-6.3-1.7-7.8-5-10.1-8-2.5-3-4.9-6.4-7.3-9.37-2.4-3.01-4.9-5.62-6.8-6.96-1.8-1.33-2.3-1.21-2.5-1.21zm56.3 16.65c-3.7.7-7.8 4.3-10.9 10.6-3 6.3-4.6 14.5-4.1 20.3.1 1.1 4.1 8.2 9 13.3 5 5.1 9.9 8.9 9.9 8.9l4.5 3.4-10.7 51.4 14.3 4.5 25.8-49.3 3.7-1s9.4-2.8 19.2-7.4c4.9-2.3 9.8-5.1 13.3-7.9 3.6-2.9 5.5-5.6 5.8-6.9v-.1c1.5-5.2.4-13.5-3-20.6-3.5-7-9-12.3-13.8-13.8-.2-.1-.7-.2-2.8 1-2.1 1.2-5 3.6-8 6.4-3 2.9-6.1 6-9.8 8.7-3.6 2.7-8.7 5.8-15.3 4.1-6.6-1.6-8.1-5.1-10.5-8.1-2.5-3-4.9-6.4-7.3-9.4-2.4-3-4.9-5.6-6.8-6.9-1.8-1.4-2.3-1.2-2.5-1.2zM92.36 119.9s-12.5 5.4-25.21 13.5c-6.36 4.1-12.83 8.7-18.13 14.2-5.3 5.5-10.04 12-10.04 20.5 0 8.2 5.22 14.7 10.59 18.7 5.38 4 11.48 6.8 17.3 9.5 5.82 2.6 11.35 5.2 15.06 7.7 3.7 2.5 4.96 4.4 5.21 5.7.35 1.8-.3 6-2.69 11-2.38 4.9-6.16 10.6-10.15 15.7-7.97 10.2-16.5 18.2-16.5 18.2l12.34 13.2s9.37-8.8 18.35-20.4c4.49-5.7 8.94-12.2 12.21-19 3.3-6.8 5.7-14.2 4.1-22.1-1.5-8-7.18-13.4-12.81-17.2-5.64-3.8-11.88-6.6-17.61-9.2-5.73-2.6-10.95-5.2-14.02-7.5-3.06-2.3-3.39-3.2-3.39-4.3 0-.9 1.26-4.1 4.96-8 3.7-3.8 9.23-7.9 14.87-11.5 11.29-7.2 22.79-12.3 22.79-12.3zm238.54 93.6c-2.3 1.6-7.7 5.5-15.2 11.2 12 2.5 24.3 5.8 36.7 9.8 1.6-1.3 3-2.4 4.5-3.6-.5-4.2-1-7.5-1.3-9.7zm56.4 16.8c-4.5 3.2-19.6 14.2-39.2 31.3-22.8 19.8-48.2 45.6-58.3 66.1-7.6 15.4-16.3 34.2-20.6 52-4.3 17.8-4.1 33.7 3.3 44.8 4.2 6.3 10.7 8.3 20.4 8.1 9.7-.1 21.3-3.2 30.9-6.2 33.7-11 69-35.1 85-69.8 7.2-15.6 8.6-47.5 7.2-74.5-1.1-22-3.3-37.7-4.2-44zm-111.9 8.1c-1.1 0-2.3 0-3.4.1-38.3 2-82.1 9.5-119.7 25-37.7 15.4-68.95 38.5-84.12 71.2-5.49 11.8-5.15 27.7-.16 41.1 4.99 13.4 14.28 23.3 24.06 25.9 42.92 11.2 101.22 16 158.32 17-3.5-13.2-2.3-27.6.9-41.4-31.1 11.8-76.5 14.6-133.8-3.5l-8.5-2.7 2.6-8.5c7.4-25 30-57.7 66.8-74.6l7.6 16.4c-26.9 12.3-45.6 36.2-53.9 54.9 59.5 16.7 102.7 8 126.3-5.3 4.6-12.5 10.2-24.2 15.2-34.3 12.5-25.2 38.7-50.8 62.1-71.1-20.7-6-40.6-10-57-10.2zm158.9 49.3c1.1 26.4.3 55.9-9.1 76.5-9.4 20.3-23.9 37-40.8 50.3 7.9-.7 15.4-1.4 22.1-2.2 12.4-1.3 22.6-2.8 29.8-4.2 3.6-.8 6.5-1.5 8.4-2 .7-.3 1.1-.5 1.4-.7 12.1-15.1 23.8-29.4 31.6-44.2 7.3-14.2 11.3-28.6 9.4-46-4.1-2.4-24-13.7-52.8-27.5zM53.14 386.9c-5.4 2.4-10.12 4.8-14.04 7.3-10.89 6.9-14.66 13-14.66 17.3 0 4.3 3.77 10.4 14.66 17.3s27.79 13.6 48.95 19.3c42.35 11.2 101.85 18.4 167.45 18.4s125.1-7.2 167.4-18.4c21.2-5.7 38-12.4 48.9-19.3 10.9-6.9 14.7-13 14.7-17.3 0-3.7-2.9-8.8-10.7-14.6-5.5 7.2-11.2 14.2-16.8 21.2l-.3.5-.5.4c-3.2 3-5.3 3.3-8.2 4.2-2.8.9-6.2 1.7-10.2 2.5-8 1.6-18.6 3.1-31.3 4.5-16.1 1.8-35.6 3.4-57.1 4.6-7.4 3.5-14.8 6.4-22.1 8.8h-.1c-10.1 3.2-23 6.8-36 7-12 .3-25.4-3.1-33.9-13.7-60.6-.6-123.8-5.3-171.76-17.8-15.92-4.2-27.55-17-34.4-32.2z"></path>
            </svg>
          </CategoryButton>
          <CategoryButton
            setCategorySelected={setCategorySelected}
            selected={categorySelected}
            name="Fruits"
          >
            <svg
              stroke="white"
              fill="white"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1.25rem"
              width="1.25rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M217.537 82.248c-83.48-65.134-156.926-5.426-144.25 50.762-38.206 16.67-51.368 51.76-29.385 81.955-33.68 24.46-12.156 49.732 14.856 60.953C1.6 332.255 70.709 373.023 117.7 338.574c26.845 5.103 75.488-1.674 81.824-21.213 16.834-1.017 32.532-11.609 43.323-19.595 6.894 11.698 17.905 22.49 29.39 25.771 18.052 1.544 23.516-2.62 33.987-13.332 20.72 19.632 72.721 18.672 96.748 12.547 99.54 64.093 108.761-75.666 46.605-101.842 23.675-34.319 4.32-85.713-25.242-110.465 23.25-50.096-32.86-65.016-60.719-60.836-52.552-46.651-122.894-1.897-146.08 32.639zm100.356-32.295c8.836 0 16 7.164 16 16 0 8.837-7.164 16-16 16-8.837 0-16-7.163-16-16 0-8.836 7.163-16 16-16zm76.488 27.238c8.836 0 16 7.164 16 16 0 8.837-7.164 16-16 16-8.837 0-16-7.163-16-16 0-8.836 7.163-16 16-16zM144 80c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16zm182.781 28.334c8.837 0 16 7.163 16 16s-7.163 16-16 16c-8.836 0-16-7.163-16-16s7.164-16 16-16zM208 112c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16zm56.273 27.523c8.837 0 16 7.164 16 16 0 8.837-7.163 16-16 16-8.836 0-16-7.163-16-16 0-8.836 7.164-16 16-16zM400 144c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16zm-298.488 26.38c8.836 0 16 7.164 16 16 0 8.837-7.164 16-16 16-8.837 0-16-7.163-16-16 0-8.836 7.163-16 16-16zm201.478 25.286c8.837 0 16 7.163 16 16s-7.163 16-16 16c-8.836 0-16-7.163-16-16s7.164-16 16-16zm-82.883 18.654c8.837 0 16 7.164 16 16 0 8.837-7.163 16-16 16-8.836 0-16-7.163-16-16 0-8.836 7.164-16 16-16zM388 208c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16zM81.518 218.578c8.836 0 16 7.164 16 16 0 8.837-7.164 16-16 16-8.837 0-16-7.163-16-16 0-8.836 7.163-16 16-16zM160 256c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16zm215.666 9.832c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16zM288 272c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16zm163.145 11.62c8.836 0 16 7.163 16 16 0 8.836-7.164 16-16 16-8.837 0-16-7.164-16-16 0-8.837 7.163-16 16-16zM69.477 302.51c8.836 0 16 7.163 16 16 0 8.836-7.164 16-16 16-8.837 0-16-7.164-16-16 0-8.837 7.163-16 16-16zm169.132 20.365a95.897 95.897 0 0 1-8.998 5.145c3.227 45.323 7.804 94.725-4.27 141.579-43.714 9.777-62.016 11.311-96.121 25.81l255.266-.305c-26.615-14.755-55.638-20.352-101.285-27.251-11.433-39.645-10.039-84.572-6.59-125.457-14.453-1.194-29.356-10.074-38.002-19.521z"></path>
            </svg>
          </CategoryButton>
          <CategoryButton
            setCategorySelected={setCategorySelected}
            selected={categorySelected}
            name="Soft Drinks"
          >
            <svg
              stroke="white"
              fill="white"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1.25rem"
              width="1.25rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M200 23v18h21.895l-14.31 123.303c-14.473 8.144-25.962 16.414-34.18 25.265-9.02 9.712-14.405 20.57-14.405 31.97V445.54c0 11.4 5.042 21.877 12.348 29.794 7.305 7.917 17.208 13.666 28.35 13.666H312c11.23 0 21.24-5.72 28.596-13.645C347.953 467.432 353 456.94 353 445.54v-224c0-11.402-5.386-22.26-14.404-31.972-8.22-8.85-19.708-17.12-34.18-25.265L290.106 41H312V23H200zm40.016 18h31.968l8.094 69.727c-2.328-.97-4.98-1.573-8.078-1.573-10.342 0-17.062 6.425-22.15 10.772-5.09 4.346-5.982 7.135-9.85 6.46-4.685-.82-6.447-6.444-8.57-11.41L240.016 41zm31.25 86.113c.235.003.48.016.734.04 5.087.508 7.665 5.963 11.2 10.476l1.212 10.438a9.6 10.338 0 0 0-9.213-7.453 9.6 10.338 0 0 0-9.6 10.338 9.6 10.338 0 0 0 9.6 10.338 9.6 10.338 0 0 0 9.585-10.01l2.817 24.265 4.13 2.225c15.45 8.318 26.69 16.527 33.672 24.046 6.982 7.52 9.596 13.893 9.596 19.723v42.69h-25.568A64 94.77 0 0 0 256 221.54a64 94.77 0 0 0-53.416 42.69H177v-42.69c0-5.83 2.614-12.204 9.596-19.724s18.223-15.728 33.672-24.046l4.13-2.225 4.047-34.856c3.09 2.163 6.88 3.695 11.555 3.695 10.237 0 16.543-6.503 21.54-10.772 4.686-4.002 6.196-6.534 9.726-6.5zM256 166.4a9.6 10.338 0 0 0-9.6 10.338 9.6 10.338 0 0 0 9.6 10.338 9.6 10.338 0 0 0 9.6-10.338A9.6 10.338 0 0 0 256 166.4zm19.2 15.57a9.6 10.338 0 0 0-9.6 10.337 9.6 10.338 0 0 0 9.6 10.338 9.6 10.338 0 0 0 9.6-10.338 9.6 10.338 0 0 0-9.6-10.338zM256 247c13.42 0 23.9 9.857 30.578 22.445 1.962 3.698 3.663 7.726 5.098 12.016H336v18h-40.156c.757 5.4 1.156 11.038 1.156 16.85 0 12.354-1.775 23.944-5.06 34.075H336v18h-52.535c-6.64 9.987-15.97 17.23-27.465 17.23-11.496 0-20.825-7.243-27.465-17.23H176v-18h44.06c-3.285-10.13-5.06-21.72-5.06-34.076 0-5.812.4-11.45 1.156-16.85H176v-18h44.324c1.435-4.29 3.136-8.317 5.098-12.015C232.102 256.857 242.58 247 256 247zm0 18c-4.253 0-9.775 3.644-14.678 12.883-4.902 9.24-8.322 23.063-8.322 38.426 0 15.362 3.42 29.183 8.322 38.422 4.903 9.24 10.425 12.883 14.678 12.883s9.775-3.643 14.678-12.883c4.902-9.24 8.322-23.06 8.322-38.423 0-15.364-3.42-29.188-8.322-38.427C265.775 268.643 260.253 265 256 265zm-79 120.615h35.47a64 94.77 0 0 0 43.53 25.46 64 94.77 0 0 0 43.572-25.46H335v59.924c0 5.83-2.953 12.567-7.596 17.567-4.643 5-10.635 7.893-15.404 7.893H199.697c-4.555 0-10.502-2.867-15.12-7.873-4.62-5.006-7.577-11.758-7.577-17.588v-59.925z"></path>
            </svg>
          </CategoryButton>
          <CategoryButton
            setCategorySelected={setCategorySelected}
            selected={categorySelected}
            name="Desserts"
          >
            <svg
              stroke="white"
              fill="white"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1.25rem"
              width="1.25rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M1 21.98c0 .56.45 1.01 1.01 1.01H15c.56 0 1.01-.45 1.01-1.01V21H1v.98zM8.5 8.99C4.75 8.99 1 11 1 15h15c0-4-3.75-6.01-7.5-6.01zM3.62 13c1.11-1.55 3.47-2.01 4.88-2.01s3.77.46 4.88 2.01H3.62zM1 17h15v2H1zM18 5V1h-2v4h-5l.23 2h9.56l-1.4 14H18v2h1.72c.84 0 1.53-.65 1.63-1.47L23 5h-5z"></path>
            </svg>
          </CategoryButton>
          <CategoryButton
            setCategorySelected={setCategorySelected}
            selected={categorySelected}
            name="Icecreams"
          >
            <svg
              stroke="white"
              fill="white"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1.25rem"
              width="1.25rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M18.38 6.24C17.79 3.24 15.14 1 12 1S6.21 3.24 5.62 6.24A4.014 4.014 0 003 10c0 2.21 1.79 4 4 4 .12 0 .23-.02.34-.02L12.07 23l4.61-9.03c.11.01.21.03.32.03 2.21 0 4-1.79 4-4 0-1.71-1.08-3.19-2.62-3.76zm-6.33 12.39l-2.73-5.21a6.468 6.468 0 005.4-.02l-2.67 5.23zM17 12c-.52 0-1.01-.2-1.39-.56l-.56-.54-.66.42a4.52 4.52 0 01-4.78-.01l-.66-.41-.56.54c-.38.35-.87.56-1.39.56a1.999 1.999 0 01-.32-3.97l.77-.13.06-.78C7.71 4.8 9.66 3 12 3s4.29 1.8 4.48 4.12l.06.78.77.12c.97.16 1.69.99 1.69 1.98 0 1.1-.9 2-2 2z"></path>
            </svg>
          </CategoryButton>
          <CategoryButton
            setCategorySelected={setCategorySelected}
            selected={categorySelected}
            name="Fish"
          >
            <svg
              stroke="white"
              fill="white"
              strokeWidth="0"
              viewBox="0 0 576 512"
              height="1.25rem"
              width="1.25rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M327.1 96c-89.97 0-168.54 54.77-212.27 101.63L27.5 131.58c-12.13-9.18-30.24.6-27.14 14.66L24.54 256 .35 365.77c-3.1 14.06 15.01 23.83 27.14 14.66l87.33-66.05C158.55 361.23 237.13 416 327.1 416 464.56 416 576 288 576 256S464.56 96 327.1 96zm87.43 184c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24 13.26 0 24 10.74 24 24 0 13.25-10.75 24-24 24z"></path>
            </svg>
          </CategoryButton>
          <CategoryButton
            setCategorySelected={setCategorySelected}
            selected={categorySelected}
            name="Rice"
          >
            <svg
              stroke="white"
              fill="white"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1.25rem"
              width="1.25rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m20.35 26.1-2.68 15.78L381.7 103.9l2.6-15.79zm-.55 57.94-1.58 15.92L382.2 136l1.6-16zm212.1 84.36c-2.1-.1-4.2.7-5.9 2.3-3.4 3.1-3.5 8.4-.4 11.7l2.6 2.8-17.7-7.6c-4.2-1.8-9.1.1-10.9 4.3-1.8 4.3.1 9.2 4.4 11l6.8 3c-30.5 1.9-60.3 12-83.5 29l-1.8-3c-2.4-3.9-7.5-5.2-11.5-2.8-3.9 2.4-5.2 7.5-2.8 11.4l3.2 5.3-.4.4-8.2-8.6c-3.2-3.3-8.5-3.5-11.8-.3-3.3 3.2-3.5 8.5-.3 11.8l9.2 9.6c-9.5 12.4-16.3 26.8-19.3 42.9h346.8c5 0 9-3.7 9-8.3 0-4.6-4-8.3-9-8.3h-8l3-.6c5-.7 8-5 7-9.5-1-4.6-5-7.7-10-6.9l-11 1.8c-3-3.3-6-6.2-9-8.8l2-2.1c3-3.2 4-8.4 0-11.8-3-3.3-8.1-3.4-11.4-.2l-5 4.7c-12.9-6.6-26.7-9.8-38.5-11.3 3.7-2.6 4.7-7.8 2-11.6-2.6-3.7-7.8-4.7-11.6-2l-13.3 9.3 3.4-6c2.2-4 .8-9.1-3.2-11.4-4-2.2-9.1-.8-11.3 3.2l-6 10.5c-13-9.4-27.6-16.2-42.9-20.6L237.8 171c-1.6-1.7-3.7-2.5-5.9-2.6zm-52.1 52.1 15.4 5.5c3.3 1.2 4.9 4.8 3.8 8-1.2 3.3-4.8 4.9-8 3.8l-15.4-5.6c-3.3-1.2-5-4.7-3.8-8 1.9-3.5 4.8-4.5 8-3.7zm85.6 22.4c1.5 3.1.2 6.9-2.9 8.3l-14.8 7.1c-3.1 1.5-6.9.1-8.4-3-1.4-3.1-.1-6.8 3-8.3l14.8-7c3.1-1.4 7 .4 8.3 2.9zm98.6 10.6 11.8 11.3c2.5 2.4 2.6 6.4.2 8.9-2.4 2.4-6.3 2.5-8.8.1l-11.8-11.3c-2.5-2.4-2.6-6.4-.2-8.9 2.7-2.2 6.5-2.3 8.8-.1zm-214.3 16.8c1 3.3-.8 6.8-4.1 7.9l-15.6 5c-3.2 1-6.8-.8-7.8-4.1-1.1-3.3.7-6.8 4-7.8l15.6-5c3.3-.9 7 1.5 7.9 4zm145-3.3 15.9 4c3.4.8 5.4 4.2 4.6 7.6-.9 3.3-4.3 5.4-7.6 4.5l-15.9-4c-3.4-.8-5.4-4.2-4.5-7.6 1.5-3.6 4.3-5 7.5-4.5zM39.33 312c1.68 42.5 16.6 76.8 48.58 101.7C121.9 440.1 176.1 456 255 456s133.1-15.9 167.1-42.3c32-24.9 46.9-59.2 48.6-101.7zM191 472v16h128v-16z"></path>
            </svg>
          </CategoryButton>
          <CategoryButton
            setCategorySelected={setCategorySelected}
            selected={categorySelected}
            name="Curry"
          >
            <svg
              stroke="white"
              fill="white"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1.25rem"
              width="1.25rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M1 21.98c0 .56.45 1.01 1.01 1.01H15c.56 0 1.01-.45 1.01-1.01V21H1v.98zM8.5 8.99C4.75 8.99 1 11 1 15h15c0-4-3.75-6.01-7.5-6.01zM3.62 13c1.11-1.55 3.47-2.01 4.88-2.01s3.77.46 4.88 2.01H3.62zM1 17h15v2H1zM18 5V1h-2v4h-5l.23 2h9.56l-1.4 14H18v2h1.72c.84 0 1.53-.65 1.63-1.47L23 5h-5z"></path>
            </svg>
          </CategoryButton>
        </div>
        <div className="mt-8 px-10 flex flex-wrap justify-center w-full py-12 gap-20 gap-x-12 bg-[#d9ffd9] ">
          {products &&
          products.filter(
            (item) =>
              categorySelected === "Menu" || item.category === categorySelected
          ).length > 0 ? (
            reorderedProducts
              .filter(
                (item) =>
                  categorySelected === "Menu" ||
                  item.category === categorySelected
              )
              .map(
                (item: {
                  name: string;
                  price: number;
                  imgSrc: string;
                  description: string;
                  category: string;
                }) => {
                  return (
                    <ItemsToBuy
                      addToCart={addToCart}
                      key={item.name}
                      imgSrc={item.imgSrc}
                      name={item.name}
                      price={item.price}
                      description={item.description}
                    />
                  );
                }
              )
          ) : (
            <div className="flex flex-col items-center">
              <svg
                fill="#3bc416"
                width="200px"
                height="200px"
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M500 70q-117 0-217 59-97 57-154 154-59 100-59 217t59 217q57 97 154 154 100 59 217 59t217-59q97-57 154-154 59-100 59-217t-59-217q-57-97-154-154-100-59-217-59zM240 259q-5 2-9 2-9 0-15-6t-6-14q0-4 1-7l2-2q3-6 4-7 21-26 47.5-40t57-14 58 16.5T429 235q1 3 1 6 0 11-9.5 17t-19.5 2l-9-9q-32-36-71-36-23-1-44 10.5T240 259zm33 91q0-26 18.5-44.5T336 287t44.5 18.5T399 350t-18.5 44.5T336 413t-44.5-18.5T273 350zm361 313q-11-7-31-12-40-10-103-10t-103 10q-20 5-31 12l-14-43 1-1q45-22 147-22t147 22l1 1zm-19-205q-26 0-44.5-18.5T552 395t18.5-44.5T615 332t44.5 18.5T678 395t-18.5 44.5T615 458zm87-176H566q-9 0-15-6.5t-6-15.5 6-15 15-6h135q9 0 15 6.5t6 15-6 15-15 6.5h1z" />
              </svg>
              <p className="text-[1.25rem] text-[#575757] font-[800]">
                No Food Items Available
              </p>
            </div>
          )}
        </div>
      </section>
      <footer className="my-16 px-[5rem]">
        <div className="px-20 mb-12 gap-8 font-[700] text-[1.4rem] flex flex-row cursor-pointer">
          <Image
            className="object-contain w-auto"
            src={"/img/logo.png"}
            height={60}
            width={60}
            alt="logo"
          />
          <p className="text-center items-center justify-center flex pt-[1rem] text-[2rem] select-none	">
            Zoné
          </p>
        </div>
        <hr className="border-t-2" />
        <div className="mt-12 flex flex justify-between">
          <p className="text-[.9rem] text-[#808080] font-[500] flex justify-center">
            © 2023 éZoné™. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <Link
              target="_blank"
              rel="noreferrer"
              href="https://github.com/LifeAsDev"
            >
              <svg
                stroke="#808080"
                fill="#808080"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="2rem"
                width="2rem"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/angelo-sarmiento-1bab3b290/"
            >
              <svg
                stroke="#808080"
                fill="#808080"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="2rem"
                width="2rem"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"></path>
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
interface CategoryButton {
  name: string;
}
function CategoryButton({
  name,
  selected,
  children,
  setCategorySelected,
}: {
  name: string;
  children: React.ReactNode;
  selected: string;
  setCategorySelected: (name: string) => void;
}) {
  return (
    <div
      onClick={() => setCategorySelected(name)}
      className={`cursor-pointer gap-2 flex flex-col items-center justify-center bg-white w-[6rem] h-[7rem] rounded-lg drop-shadow-xl ${
        selected === name ? "category-selected" : ""
      }`}
    >
      <div className="bg-[#e80013] w-[2.5rem] h-[2.5rem] rounded-[50%] flex justify-center items-center">
        {children}
      </div>
      <p className=" font-[400]">{name}</p>
    </div>
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

interface ArrowSvg {
  right: boolean;
}
function ArrowSvg({ right }: ArrowSvg) {
  const direction = right ? "" : "rotate-180";
  return (
    <div
      className={`bg-[#3bc416] rounded-lg w-[2.5rem] h-[2.5rem] p-[.5rem] ${direction}`}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 5L14.15 10C14.4237 10.2563 14.6419 10.5659 14.791 10.9099C14.9402 11.2539 15.0171 11.625 15.0171 12C15.0171 12.375 14.9402 12.7458 14.791 13.0898C14.6419 13.4339 14.4237 13.7437 14.15 14L9 19"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
interface itemsToBuy {
  imgSrc: string;
  name: string;
  description: string;
  price: number;
  addToCart: (item: string) => void;
}
function ItemsToBuy({
  imgSrc,
  name,
  description,
  price,
  addToCart,
}: itemsToBuy) {
  return (
    <div className="relative gap-2 min-w-[12rem] h-[13rem] flex justify-end flex-col items-center rounded-xl">
      <div className=" absolute backdrop-blur-[3px] drop-shadow-2xl white-transparent w-full h-full rounded-xl"></div>
      <Image
        className="absolute block h-[8rem] w-auto bottom-[6.5rem] "
        src={imgSrc}
        height={130}
        width={130}
        alt="motorcycle delivery"
      />
      <p className="z-[0] mt-24 text-[#545454] font-[650] text-[1rem]">
        {name}
      </p>
      <p className="z-[0] text-[#808080] font-[650] text-[1rem]">
        {description}
      </p>
      <p className="z-[0] mb-4 text-[1rem] font-semibold text-[#303030]">
        <span className="text-red-600">$</span> {price}
      </p>
      <div
        onClick={() => addToCart(name)}
        className="select-none cursor-pointer bottom-[-2rem] absolute rounded-[50%] bg-red-500 p-3"
      >
        <Image
          className="w-6"
          src={"/img/addToCart.png"}
          height={40}
          width={40}
          alt="logo"
        />
      </div>
    </div>
  );
}
