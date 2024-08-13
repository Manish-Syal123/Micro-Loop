import React from "react";
import SideNav from "../_components/SideNav";
import { Room } from "@/app/Room";
import Image from "next/image";

const Workspace = ({ params }) => {
  return (
    <div>
      <Room params={params}>
        <SideNav params={params} />

        {/* blank side Image */}
        <div>
          <Image
            src="/cover.jpg"
            layout="fill"
            alt="blank"
            objectFit="cover"
            className="h-screen w-screen"
          />
        </div>
      </Room>
    </div>
  );
};

export default Workspace;
