"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Logo = ({ expanded }) => {
  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, [path]);
  return (
    <div className="flex items-center gap-2">
      {/* <Image src="/logo.png" alt="Logo" width={30} height={30} /> */}
      <Image src="/Micro_Loop_logo.svg.png" alt="Logo" width={30} height={30} />
      {path === "/dashboard" ? (
        <h2 className={`font-bold test-sm md:text-2xl`}>Micro Loop</h2>
      ) : (
        <h2 className={`font-bold test-sm md:text-xl ${!expanded && "hidden"}`}>
          Micro Loop
        </h2>
      )}
    </div>
  );
};

export default Logo;
