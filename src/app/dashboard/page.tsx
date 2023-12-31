"use client";
import { useSession, signOut } from "next-auth/react";
import { SetStateAction, useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import UserIcon from "../components/userSVG";
import PhoneIcon from "../components/phoneSVG";
import UploadIcon from "../components/uploadSVG";
import DeleteIcon from "../components/deleteSVG";
import Image from "next/image";
import { useOnboardingContext } from "../context/MyContext";

export default function Home() {
  const [loadingImg, setLoadingImg] = useState(100);

  const {
    imgURL,
    phone,
    setimgURL,
    setUserImgURL,
    setPhone,
    status,
    session,
    name,
    setName,
  } = useOnboardingContext();

  const [nameEdit, setNameEdit] = useState("");

  useEffect(() => {
    setNameEdit(name);
  }, [name]);

  // This function will be triggered when the file field change
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setimgURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    let fileInput = document.getElementById("file");

    if (fileInput instanceof HTMLInputElement) {
      fileInput.value = "";
      fileInput.dispatchEvent(new Event("change"));
    }
    setimgURL("");
  };

  const numberHandler = (e: any) => {
    const validatedValue = e.target.value.replace(/[^0-9]/g, "");
    setPhone(validatedValue);
  };
  const updateOnMongoDB = async (url: SetStateAction<string>) => {
    try {
      console.log("Updating on mongoDB Boss");
      const res = await fetch("api/update", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: session?.user?.email,
          name: nameEdit,
          phone,
          imageUrl: url,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log("Updated on mongoDB Boss");
        setName(data.name);
        console.log(data.message);
      }
      setLoadingImg(100);
    } catch (error) {
      setLoadingImg(100);

      console.log("error");
    }
  };

  const handleUpload = (e: { [x: string]: any; preventDefault: any }) => {
    setLoadingImg(0);
    console.log("uploading to firebase boss");
    e.preventDefault();
    const file = e.target[0]?.files[0];
    if (!file) return updateOnMongoDB(imgURL);
    const storageRef = ref(storage, `images/${session?.user?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (url: SetStateAction<string>) => {
            console.log("uploaded to firebase boss");

            setimgURL(url);
            setUserImgURL(url);

            updateOnMongoDB(url);

            console.log(url);
          }
        );
      }
    );
  };

  if (status === "loading") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 gap-4"></main>
    );
  }

  return (
    <main className="pt-[6rem] flex  flex-col items-center justify-center p-4 gap-4">
      <h2 className="text-[2rem] font-extrabold">DASHBOARD</h2>
      {session ? (
        <div className="bg-white border w-full  md:w-[500px] flex border-gray-300 items-center rounded-lg p-4 pb-6 flex-col justify-center gap-4 mg:mt-10">
          <div className="w-full pb-3 flex flex-row	gap-4 items-center 	border-b-[1px] border-gray-300 w-full">
            <UserIcon />
            <input
              placeholder="Name"
              className="bg-transparent outline-none grow"
              type="text"
              onChange={(e) => setNameEdit(e.target.value)}
              value={nameEdit}
            ></input>
          </div>
          <div className="w-full pb-3 flex flex-row	gap-4 items-center 	border-b-[1px] border-gray-300 w-full">
            <PhoneIcon />
            <input
              placeholder="Phone"
              className="bg-transparent outline-none grow"
              type="text"
              value={phone}
              onChange={numberHandler}
            ></input>
          </div>
          <form
            className="flex flex-col w-full h-[350px]"
            onSubmit={handleUpload}
          >
            {imgURL !== "" ? (
              <div className="flex flex-col justify-center items-center border-dotted border-2 w-full min-h-[300px] ">
                <div className="relative h-full">
                  <Image
                    className="w-full h-full object-cover"
                    src={imgURL}
                    alt="Preview image"
                    width={500} // Agrega el ancho de la imagen
                    height={300} // Agrega la altura de la imagen
                  />
                </div>
                <div className="relative w-full">
                  <div
                    onClick={removeSelectedImage}
                    className="active:scale-[1.1] transition-all  cursor-pointer p-[.5rem] rounded-[50%] absolute flex justify-center items-center right-[15px] bottom-[15px] w-[3rem] h-[3rem] bg-red-500"
                  >
                    <DeleteIcon />
                  </div>
                </div>
              </div>
            ) : (
              <label
                className={`flex flex-col justify-center items-center border-dotted border-2 w-full min-h-[300px] ${
                  imgURL !== "" ? "" : "cursor-pointer"
                }`}
                htmlFor="file"
              >
                <UploadIcon />
                <p className="font-bold	text-gray-500">Click here to upload</p>
                <p className="font-[500]		 text-gray-500 text-[.9rem]">
                  PNG, JPG or GIF(MAX. 800x400px)
                </p>
              </label>
            )}
            <input
              onChange={imageChange}
              id="file"
              accept="image/*"
              className="inputfile"
              type="file"
            ></input>
            <div className="gap-4 flex flex-row w-full">
              <button
                type="submit"
                disabled={imgURL === ""}
                className={`active:scale-[1.05] transition-all  w-[70%] outline-none flex justify-center items-center shadow-e font-[600] box-border mt-3 h-[48px] text-white rounded-[50px] bg-greenn p-[.5rem] ${
                  imgURL === "" || loadingImg < 99
                    ? "saturate-[.3] cursor-not-allowed	  "
                    : ""
                }`}
              >
                {loadingImg > 99 ? "SAVE" : <div className="loader"></div>}
              </button>
              <button
                type="button"
                onClick={() => signOut()}
                className={`active:scale-[1.05] transition-all  w-[30%] outline-none font-[600] flex justify-center items-center shadow-red box-border mt-3 h-[48px] text-white rounded-[50px] bg-red-500 p-[.5rem]`}
              >
                SIGN OUT
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p></p>
      )}
    </main>
  );
}
