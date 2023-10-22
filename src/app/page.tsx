"use client";
import Image from "next/image";
import React, { useRef, RefObject } from "react";

export default function Home() {
  const containerRef: RefObject<HTMLDivElement> = useRef(null);

  const scrollRight = (right: boolean) => {
    const container = containerRef.current;
    const dir = right ? 208 * 6 : -208 * 6;
    if (container) {
      container.scrollLeft += dir; // Ajusta el valor según tu preferencia
    }
  };
  return (
    <main>
      <nav className="bg-white px-[6rem] py-[1.5rem] pt-[1.2rem] w-full  flex flex-row justify-between">
        <div className="font-[700] text-[1.4rem] flex flex-row h-[2.2rem] cursor-pointer">
          <Image
            className="object-contain"
            src={"/img/logo.png"}
            height={40}
            width={40}
            alt="logo"
          />
          <p className="text-center items-center flex pt-[0.6rem] select-none	">
            Zoneé
          </p>
        </div>
        <ul className="flex flex-row gap-[3rem] text-[.9rem] text-[#808080] font-[500] text-center items-center flex pt-[0.5rem] select-none	">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Menu</li>
          <li className="cursor-pointer">Contact us</li>
        </ul>
        <ul className="flex flex-row mt-[.5rem] gap-[2rem]">
          <ShopBagSvg />
          <div className="select-none cursor-pointer px-[1rem] text-center py-[.25rem] gap-[.5rem] font-[500] flex flex-row border-[1px] rounded-md  ">
            <LoginSvg />
            Login
          </div>
        </ul>
      </nav>
      <section className="mt-[2rem] px-[2rem]">
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
              className="rounded-[20px]  z-[-1]  ml-auto lg:h-[550px] h-[420px] w-full lg:w-auto right-0"
              src={"/img/hero.jpg"}
              height={736}
              width={460}
              alt="motorcycle delivery"
            />
            <div className="w-[344px] z-[1] absolute gradient-transparent rounded-[20px] ml-auto lg:h-[550px] h-[420px] top-0 right-0"></div>
            <div className="absolute z-[1] w-full h-full flex flex-wrap justify-center items-center gap-hero top-0">
              <ItemsToBuy
                name="default"
                imgSrc="/img/f8.png"
                shortDescription="default"
                price={12.2}
              />
              <ItemsToBuy
                name="default"
                imgSrc="/img/f8.png"
                shortDescription="default"
                price={12.2}
              />
              <ItemsToBuy
                name="default"
                imgSrc="/img/f8.png"
                shortDescription="default"
                price={12.2}
              />
              <ItemsToBuy
                name="default"
                imgSrc="/img/f8.png"
                shortDescription="default"
                price={12.2}
              />
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
            <div onClick={() => scrollRight(false)}>
              <ArrowSvg right={false} />
            </div>
            <div onClick={() => scrollRight(true)}>
              <ArrowSvg right={true} />
            </div>
          </div>
        </div>
        <div
          ref={containerRef}
          className="mt-8 px-4 flex items-center w-full overflow-x-scroll min-h-[18rem] gap-x-4 bg-[#d9ffd9] scrollbar-hidden scroll-smooth"
        >
          <ItemsToBuy
            name="default"
            imgSrc="/img/f8.png"
            shortDescription="default"
            price={12.2}
          />
          <ItemsToBuy
            name="default"
            imgSrc="/img/f8.png"
            shortDescription="default"
            price={12.2}
          />
          <ItemsToBuy
            name="default"
            imgSrc="/img/f8.png"
            shortDescription="default"
            price={12.2}
          />{" "}
          <ItemsToBuy
            name="default"
            imgSrc="/img/f8.png"
            shortDescription="default"
            price={12.2}
          />
          <ItemsToBuy
            name="default"
            imgSrc="/img/f8.png"
            shortDescription="default"
            price={12.2}
          />
          <ItemsToBuy
            name="default"
            imgSrc="/img/f8.png"
            shortDescription="default"
            price={12.2}
          />{" "}
          <ItemsToBuy
            name="default"
            imgSrc="/img/f8.png"
            shortDescription="default"
            price={12.2}
          />
          <ItemsToBuy
            name="default"
            imgSrc="/img/f8.png"
            shortDescription="default"
            price={12.2}
          />
          <ItemsToBuy
            name="default"
            imgSrc="/img/f8.png"
            shortDescription="default"
            price={12.2}
          />{" "}
          <ItemsToBuy
            name="default"
            imgSrc="/img/f8.png"
            shortDescription="default"
            price={12.2}
          />
          <ItemsToBuy
            name="default"
            imgSrc="/img/f8.png"
            shortDescription="default"
            price={12.2}
          />
          <ItemsToBuy
            name="default"
            imgSrc="/img/f8.png"
            shortDescription="default"
            price={12.2}
          />
        </div>
      </section>
    </main>
  );
}
function ShopBagSvg() {
  return (
    <div className="relative mt-[.3rem]">
      <svg
        className="fill-[#4a4a4a]"
        xmlns="http://www.w3.org/2000/svg"
        height="1.75rem"
        viewBox="0 0 448 512"
      >
        <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
      </svg>
      <div className="absolute top-[-.7rem] right-[-.9rem] bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
        0
      </div>
    </div>
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
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}
interface itemsToBuy {
  imgSrc: string;
  name: string;
  shortDescription: string;
  price: number;
}
function ItemsToBuy({ imgSrc, name, shortDescription, price }: itemsToBuy) {
  return (
    <div className="relative gap-2 min-w-[12rem] h-[13rem] flex justify-end flex-col items-center rounded-xl">
      <div className=" absolute backdrop-blur-[3px] drop-shadow-2xl white-transparent w-full h-full rounded-xl"></div>
      <Image
        className="absolute bottom-[6.5rem] "
        src={imgSrc}
        height={130}
        width={130}
        alt="motorcycle delivery"
      />
      <p className="z-[0] mt-24 text-[#545454] font-[650] text-[1.2rem]">
        {name}
      </p>
      <p className="z-[0] text-[#808080] font-[650] text-[1rem]">
        {shortDescription}
      </p>
      <p className="z-[0] mb-4 text-[1rem] font-semibold text-[#303030]">
        <span className="text-red-600">$</span> {price}
      </p>
      <div className="bottom-[-2rem] absolute rounded-[50%] bg-red-500 p-3">
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
