import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { memo, useCallback } from "react";
import DocumentOptions from "./DocumentOptions";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "sonner";
import { db } from "@/config/firebaseConfig";

const DocumentList = ({ documentList, params }) => {
  const router = useRouter();

  const DeleteDocument = async (docId) => {
    try {
      await deleteDoc(doc(db, "workspaceDocuments", docId));
      toast.success("Document Deleted !");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div>
      {documentList.map((doc, index) => (
        <div
          key={doc.id}
          onClick={() =>
            router.push(`/workspace/${params?.workspaceid}/${doc.id}`)
          }
          className={`mt-3 p-2 px-3 hover:bg-gray-200 
        rounded-lg cursor-pointer flex justify-between items-center
        ${doc.id == params?.documentid && "bg-white"}
        `}
        >
          <div className="flex gap-2 items-center">
            {!doc?.emoji && (
              <Image
                src={"/loopdocument.svg"}
                alt="doc"
                width={20}
                height={20}
              />
            )}
            <h2 className="flex gap-2">
              {doc?.emoji} {doc?.documentName}
            </h2>
          </div>
          <DocumentOptions
            doc={doc}
            deleteDocument={(docId) => DeleteDocument(docId)}
          />
        </div>
      ))}
    </div>
  );
};

export default memo(DocumentList);
