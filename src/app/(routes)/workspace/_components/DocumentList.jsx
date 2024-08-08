import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { memo, useCallback } from "react";
import DocumentOptions from "./DocumentOptions";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "sonner";
import { db } from "@/config/firebaseConfig";

const DocumentList = ({ documentList, params, expanded }) => {
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
        rounded-lg cursor-pointer flex sm:justify-center ${
          expanded && "md:justify-between"
        }lg:justify-between items-center
        ${doc.id == params?.documentid && "bg-white"}
        group
        `}
        >
          <div className="flex gap-2 justify-between  items-center">
            {!doc?.emoji && (
              <Image
                src={"/loopdocument.svg"}
                alt="doc"
                width={20}
                height={20}
              />
            )}
            <h2 className="flex gap-2">
              {doc?.emoji}{" "}
              <span className={`${!expanded && "hidden"}`}>
                {doc?.documentName}
              </span>
              {!expanded && (
                <div
                  className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-blue-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
                >
                  {doc?.documentName}
                </div>
              )}
            </h2>
          </div>
          <DocumentOptions
            doc={doc}
            deleteDocument={(docId) => DeleteDocument(docId)}
            expanded={expanded}
          />
        </div>
      ))}
    </div>
  );
};

export default memo(DocumentList);
