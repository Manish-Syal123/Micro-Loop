"use client";
import React, { useEffect, useState } from "react";
import SideNav from "../../_components/SideNav";
import DocumentEditorSection from "../../_components/DocumentEditorSection";
import { Room } from "@/app/Room";

const WorkspaceDocument = ({ params }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Room params={params}>
      <div>
        {/* Side Nav */}
        <div>
          <SideNav
            params={params}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        </div>

        {/* Document */}
        <div className="lg:ml-72 ml-[4.5rem]">
          <DocumentEditorSection params={params} />
        </div>
      </div>
    </Room>
  );
};

export default WorkspaceDocument;
