"use client";
import React from "react";
import SideNav from "../_components/SideNav";
import { Room } from "@/app/Room";
import Image from "next/image";
import Lottie from "lottie-react";
import lottieworkspace from "../../../../../public/lottieworkspace.json";
const Workspace = ({ params }) => {
  return (
    <div>
      <Room params={params}>
        <SideNav
          params={params}
          //below two are dummy parameters to get rid of sidNav error
          expanded={false}
          setExpanded={(e) => console.log(e)}
        />

        {/* blank side Image/ Lottie Animation */}
        <div className="ml-16 md:ml-9 lg:ml-0">
          {/* <Image
            src="/cover.jpg"
            layout="fill"
            alt="blank"
            objectFit="cover"
            className="h-screen w-screen"
          /> */}
          <Lottie
            animationData={lottieworkspace}
            loop={true}
            alt="workspace"
            className="h-96 w-svw"
          />
          <div className="text-sm md:text-xl lg:text-2xl mt-40 flex flex-col justify-center items-center gap-3 text-wrap">
            <h2>⚡ Let's Get Started ⚡</h2>
            <h2>Select Files from Workspace and let the creativity begin.</h2>
          </div>
        </div>
      </Room>
    </div>
  );
};

export default Workspace;
