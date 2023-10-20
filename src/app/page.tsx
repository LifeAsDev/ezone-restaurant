import Image from "next/image";

export default function Home() {
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
          <div className="w-[50%] flex flex-col">
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
            <h2 className="text-[4rem] font-[700]">
              The Fastest Food Delivery in
              <span className="text-[#3bc416] text-[4.6rem]"> Manaus</span>
            </h2>
            <p className="font-[450]  text-[#808080]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              nam delectus sed, vel quaerat, libero nesciunt debitis, architecto
              repudiandae accusamus aut exercitationem nisi non doloribus!
              Temporibus officia architecto reiciendis blanditiis.
            </p>
            <div className="absolute backdrop-blur	 gap-2 pb-3 drop-shadow-xl white-transparent w-[13rem] h-[14rem] flex justify-center flex-col items-center rounded-xl">
              <Image
                className="absolute top-[-3.5rem] "
                src={"/img/f8.png"}
                height={160}
                width={160}
                alt="motorcycle delivery"
              />
              <p className="mt-24 text-[#6b6b6b] font-[650] text-[1.2rem]">
                Strawberries
              </p>
              <p className="text-[#808080] font-[650] text-[1.1rem]">
                Fresh Strawberries
              </p>
              <p className="text-[1rem] font-semibold text-[#303030]">
                <span className="text-red-600">$</span> 7.25
              </p>
            </div>
          </div>
          <div className="w-[50%] relative">
            <Image
              className="rounded-[20px]  z-[-1]  ml-auto lg:h-[550px] h-[420px] w-full lg:w-auto absolute right-0"
              src={"/img/hero.jpg"}
              height={736}
              width={460}
              alt="motorcycle delivery"
            />
            <div className="w-[344px] z-[-1] absolute gradient-transparent rounded-[20px] ml-auto lg:h-[550px] h-[420px] right-0"></div>
            <div className="mt-12 absolute w-full h-full flex flex-wrap justify-center items-center gap-hero ">
              <div className="	  gap-2 pb-3 drop-shadow-xl white-transparent w-[13rem] h-[14rem] flex justify-center flex-col items-center rounded-xl">
                <Image
                  className="absolute top-[-3.5rem] "
                  src={"/img/f8.png"}
                  height={160}
                  width={160}
                  alt="motorcycle delivery"
                />
                <p className="mt-24 text-[#6b6b6b] font-[650] text-[1.2rem]">
                  Cerezas
                </p>
                <p className="text-[#808080] font-[650] text-[1.1rem]">
                  Cerezas Frescas
                </p>
                <p className="text-[1rem] font-semibold text-[#303030]">
                  <span className="text-red-600">$</span> 7.25
                </p>
              </div>
              <div className="backdrop-filter gap-2 pb-3 drop-shadow-xl white-transparent w-[13rem] h-[14rem] flex justify-center flex-col items-center rounded-xl">
                <Image
                  className="absolute top-[-3.5rem] "
                  src={"/img/f7.png"}
                  height={160}
                  width={160}
                  alt="motorcycle delivery"
                />
                <p className="mt-24 text-[#6b6b6b] font-[650] text-[1.2rem]">
                  Frambuesas
                </p>
                <p className="text-[#808080] font-[650] text-[1.1rem]">
                  Frambuesas Frescas
                </p>
                <p className="text-[1rem] font-semibold text-[#303030]">
                  <span className="text-red-600">$</span> 7.25
                </p>
              </div>
            </div>
          </div>
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
