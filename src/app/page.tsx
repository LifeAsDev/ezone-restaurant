"use client";
import { useRouter } from "next/navigation";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRef, RefObject, useState, useEffect } from "react";
import products from "@/app/utils/MenuData";
import { useOnboardingContext } from "./context/MyContext";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const { cartFunctions, cartItems, reorderedProducts, status } =
    useOnboardingContext();

  const [categorySelected, setCategorySelected] = useState("Menu");

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
      <section className="pt-[6.5rem] px-[2rem]">
        <div className="flex flex-col min-[926px]:flex-row gap-[0.65rem]">
          <div className="min-[926px]:w-[50%] w-full flex flex-col gap-3 justify-center">
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
            <div className="mb-8 select-none cursor-pointer mt-[1rem] bg-[#46cc21] block p-[.8rem] py-[.6rem] rounded-md md:w-[7.25rem] w-full text-center hover:scale-[1.075] transition-all	">
              Order Now
            </div>
          </div>
          <div className="w-[100%] min-[926px]:w-[50%] relative justify-center flex">
            <Image
              priority
              className="rounded-[20px] z-[-1] ml-auto max-[506px]:h-[1000px] lg:h-[550px] h-[500px] w-full lg:w-auto right-0"
              src={"/img/hero.jpg"}
              height={736}
              width={460}
              alt="motorcycle delivery"
            />
            <div className="w-full w-full z-[1] absolute gradient-transparent rounded-[20px] ml-auto h-full lg:h-[550px] h-[420px] top-0 right-0"></div>
            <div className="w-[90%] absolute z-[1] h-full flex flex-wrap justify-center items-center gap-hero top-0 gap-y-0">
              {products ? (
                <>
                  <ItemsToBuy
                    status={status}
                    addToCart={() =>
                      cartFunctions("add", {
                        item: products[9].name,
                      })
                    }
                    name={products[9].name}
                    imgSrc={products[9].imgSrc}
                    description={products[9].description}
                    price={products[9].price}
                  />
                  <ItemsToBuy
                    status={status}
                    addToCart={() =>
                      cartFunctions("add", {
                        item: products[1].name,
                      })
                    }
                    name={products[1].name}
                    imgSrc={products[1].imgSrc}
                    description={products[1].description}
                    price={products[1].price}
                  />
                  <ItemsToBuy
                    status={status}
                    addToCart={() =>
                      cartFunctions("add", {
                        item: products[29].name,
                      })
                    }
                    name={products[29].name}
                    imgSrc={products[29].imgSrc}
                    description={products[29].description}
                    price={products[29].price}
                  />
                  <ItemsToBuy
                    status={status}
                    addToCart={() =>
                      cartFunctions("add", {
                        item: products[25].name,
                      })
                    }
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
                        status={status}
                        addToCart={() =>
                          cartFunctions("add", {
                            item: item.name,
                          })
                        }
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
        <div className=" flex-wrap	 mt-10 flex flex-row mb-12 justify-center gap-8">
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
          <AnimatePresence>
            {products &&
            products.filter(
              (item) =>
                categorySelected === "Menu" ||
                item.category === categorySelected
            ).length > 0 ? (
              reorderedProducts
                .filter(
                  (item: any) =>
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
                      <motion.div
                        key={item.name}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <ItemsToBuy
                          status={status}
                          addToCart={() =>
                            cartFunctions("add", {
                              item: item.name,
                            })
                          }
                          key={item.name}
                          imgSrc={item.imgSrc}
                          name={item.name}
                          price={item.price}
                          description={item.description}
                        />
                      </motion.div>
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
          </AnimatePresence>
        </div>
      </section>
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
      <p className=" font-[400] text-center">{name}</p>
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
      className={` hover:scale-[1.075] transition-all bg-[#3bc416] rounded-lg w-[2.5rem] h-[2.5rem] p-[.5rem] ${direction}`}
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
  status: string;
}
function ItemsToBuy({
  imgSrc,
  name,
  description,
  price,
  addToCart,
  status,
}: itemsToBuy) {
  const router = useRouter();

  return (
    <div className="relative gap-2 min-w-[12rem] h-[13rem] flex justify-end flex-col items-center rounded-xl ">
      <div className=" absolute backdrop-blur-[3px] drop-shadow-2xl white-transparent w-full h-full rounded-xl"></div>
      <Image
        className="absolute block h-[8rem] w-auto bottom-[6.5rem] hover:scale-[1.1] transition-all	"
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
        onClick={() => {
          if (status === "authenticated") {
            addToCart(name);
          } else {
            router.push("/sign-in");
          }
        }}
        className="select-none cursor-pointer bottom-[-2rem] absolute rounded-[50%] bg-red-500 p-3 hover:scale-[1.1] transition-all	"
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
