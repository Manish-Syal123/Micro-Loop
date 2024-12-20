import React, { useState } from "react";
import DocumentHeader from "./DocumentHeader";
import DocumentInfo from "./DocumentInfo";
import RichDocumentEditor from "./RichDocumentEditor";
import { Button } from "@/components/ui/button";
import { LuMessagesSquare, LuX } from "react-icons/lu";
import CommentBox from "./CommentBox";

const DocumentEditorSection = ({ params }) => {
  const [openComment, setOpenComment] = useState(false);
  return (
    <div className="relative">
      {/* Header */}
      <DocumentHeader />

      {/* Document Info */}
      <DocumentInfo params={params} />
      {/* Rich Text Editor */}
      <RichDocumentEditor params={params} />

      <div className="fixed bottom-5 right-5 z-20">
        {openComment && <CommentBox />}
        <Button
          onClick={() => setOpenComment(!openComment)}
          className="fixed bottom-5 right-5 z-50 rounded-full p-2"
        >
          {openComment ? <LuX size={20} /> : <LuMessagesSquare size={20} />}
        </Button>
      </div>
    </div>
  );
};

export default DocumentEditorSection;
