"use client";
import products from "@/app/utils/MenuData";
import { useSession } from "next-auth/react";

import React, { useEffect, useState } from "react";

const OnboardingContext = React.createContext<any>(undefined);

export const OnboardingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [reorderedProducts, setReorderedProducts] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user?.email !== undefined) {
      const fetchData = async () => {
        try {
          const email = session?.user?.email;

          const res = await fetch("api/updateCart", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              email,
              cart: cartItems,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data.message === "Users get" && data.cart !== null) {
              setCartItems(data.cart);
            }
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchData();
    }
  }, [cartItems]);

  const [phone, setPhone] = useState("");
  const [imgURL, setimgURL] = useState("");
  const [userImgURL, setUserImgURL] = useState("");

  const [name, setName] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      const getUserData = async () => {
        try {
          const email = session?.user?.email;

          const res = await fetch("api/check", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              email,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data.message === "Users get") {
              const imageUrl = data.imageUrl || session?.user?.image || "";
              setimgURL(imageUrl);
              setUserImgURL(imageUrl);
              setPhone(data.phone);
              setName(data.name);
              if (data.cart !== null) {
                setCartItems(data.cart);
              }
            }
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      getUserData();
    }
  }, [status]);

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
  const cartFunctions = (
    method: string,
    methodParam: { item: string; operation: string }
  ) => {
    if (method === "add") addToCart(methodParam.item);
    if (method === "remove") removeFromCart(methodParam.item);
    if (method === "update")
      updateQuantity(methodParam.item, methodParam.operation);
    if (method === "clear") setCartItems([]);
  };
  const addToCart = (item: string) => {
    if (true) {
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

  return (
    <OnboardingContext.Provider
      value={{
        cartFunctions,
        reorderedProducts,
        cartItems,
        status,
        session,
        phone,
        imgURL,
        setPhone,
        setimgURL,
        setUserImgURL,
        userImgURL,
        name,
        setName,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
export const useOnboardingContext = () => {
  const onboardingContext = React.useContext(OnboardingContext);
  if (onboardingContext === undefined) {
    throw new Error("useOnboardingContext must be inside a OnboardingProvider");
  }
  return onboardingContext;
};
