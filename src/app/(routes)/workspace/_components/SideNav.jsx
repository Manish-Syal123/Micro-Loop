"use client";
import Logo from "@/app/_components/Logo";
import { Button } from "@/components/ui/button";
import { db } from "@/config/firebaseConfig";
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { LuBell, LuLoader } from "react-icons/lu";
import DocumentList from "./DocumentList";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const MAX_FILE = process.env.NEXT_PUBLIC_MAX_FILE_COUNT;

const SideNav = ({ params }) => {
  const [documentList, setDocumentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    params && GetDocumentList();
  }, [params]);

  const GetDocumentList = () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, "workspaceDocuments"),
        where("workspaceId", "==", Number(params?.workspaceid))
      );
      // this will get the documents based on the query
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setDocumentList([]); // empty the list before fetchinng the list of documents

        querySnapshot.forEach((doc) => {
          //   console.log(doc.id, " => ", doc.data())
          setDocumentList((documentList) => [...documentList, doc.data()]);
        });
      });
      setLoading(false);
    } catch (error) {
      console.error("Error getting documents: ", error);
      setLoading(false);
    }
  };

  //To create new Document
  const CreateNewDocument = async () => {
    if (documentList?.length >= MAX_FILE) {
      toast("Upgrade Plan to add new Files.", {
        description: "You have reached the maximum number of documents.",
        action: {
          label: "Upgrade",
          onClick: () => console.log("Upgrade"),
        },
      });
      return;
    }
    try {
      setLoading(true);
      const docId = uuid4();
      await setDoc(doc(db, "workspaceDocuments", docId.toString()), {
        workspaceId: Number(params?.workspaceid),
        createdBy: user?.primaryEmailAddress?.emailAddress,
        coverImage: null,
        emoji: null,
        id: docId,
        documentName: "Untitled Document",
        documentOutput: [],
      });

      await setDoc(doc(db, "documentOutput", docId.toString()), {
        docId: docId,
        output: [],
      });

      setLoading(false);
      router.replace("/workspace/" + params?.workspaceid + "/" + docId);
    } catch (error) {
      console.error("Error creating document: ", error);
      setLoading(false);
    }
  };
  return (
    <div className="h-screen md:w-72 hidden md:block fixed bg-blue-50 p-5 shadow-md">
      <div className="flex items-center justify-between">
        <Logo />
        <LuBell size={20} className="h-5 w-5 text-gray-500" />
      </div>
      <hr className="my-5 border-[1.5px] border-gray-300 rounded-lg" />
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Workspace Name</h2>
          <Button
            onClick={CreateNewDocument}
            size="sm"
            disabled={loading}
            className="font-bold text-[18px]"
          >
            {loading ? <LuLoader className="h-4 w-4 animate-spin" /> : "+"}
          </Button>
        </div>
      </div>
      {/* Document List */}
      <DocumentList documentList={documentList} params={params} />

      {/* Progress Bar */}
      <div className="absolute bottom-10 w-[85%]">
        <Progress value={(documentList?.length / MAX_FILE) * 100} />
        <h2 className="text-sm font-light my-2">
          <strong>{documentList?.length}</strong> Out of <strong>5</strong>{" "}
          files used
        </h2>
        <h2 className="text-sm font-light">
          Upgrade Plan for Unlimited access
        </h2>
      </div>
    </div>
  );
};

export default SideNav;
