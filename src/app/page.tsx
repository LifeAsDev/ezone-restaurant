import Image from "next/image";

export default function Home() {
  return (
    <main>
      <nav className="px-[6rem] py-[1.5rem] pt-[1.2rem] w-full  flex flex-row justify-between">
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
        <ul className="flex flex-row gap-[3rem] text-[.9rem] text-[#4a4a4a] font-[500] text-center items-center flex pt-[0.5rem] select-none	">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Menu</li>
          <li className="cursor-pointer">Contact us</li>
          <li className="cursor-pointer">
            <ShopBagSvg />
          </li>
        </ul>
        <div className="select-none cursor-pointer px-[1rem] text-center py-[.25rem] gap-[.5rem] font-[500] flex flex-row border-[1px] rounded-md  mt-[.5rem]">
          <LoginSvg />
          Login
        </div>
      </nav>
      <div className="bg-[#3fa84a]">bycicle</div>
    </main>
  );
}
function ShopBagSvg() {
  return (
    <div className="relative">
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
