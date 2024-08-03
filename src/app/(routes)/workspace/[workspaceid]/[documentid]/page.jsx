"use client";
import React, { useEffect } from "react";
import SideNav from "../../_components/SideNav";

const WorkspaceDocument = ({ params }) => {
  return (
    <div>
      {/* Side Nav */}
      <div className="">
        <SideNav params={params} />
      </div>

      {/* Document */}
      <div className="md:ml-72">
        <h1>Document</h1>
      </div>
    </div>
  );
};

export default WorkspaceDocument;
