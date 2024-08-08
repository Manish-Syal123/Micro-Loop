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
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  LuBell,
  LuChevronFirst,
  LuChevronLast,
  LuLoader,
} from "react-icons/lu";
import DocumentList from "./DocumentList";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import NotificationBox from "./NotificationBox";

const MAX_FILE = process.env.NEXT_PUBLIC_MAX_FILE_COUNT;

const SideNav = ({ params, expanded, setExpanded }) => {
  const [documentList, setDocumentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const workspaceId = useMemo(() => Number(params?.workspaceid), [params]);

  useEffect(() => {
    if (params) {
      GetDocumentList();
    }
  }, [params]);

  const GetDocumentList = useCallback(() => {
    try {
      setLoading(true);
      const q = query(
        collection(db, "workspaceDocuments"),
        where("workspaceId", "==", Number(workspaceId))
      );
      // this will get the documents based on the query
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push(doc.data());
          // setDocumentList((documentList) => [...documentList, doc.data()]);
        });
        setDocumentList(documents);
      });
      return () => unsubscribe(); // Clean up the listener when the component unmounts
    } catch (error) {
      console.error("Error getting documents: ", error);
    } finally {
      setLoading(false);
    }
  }, [workspaceId]);

  //To create new Document
  const CreateNewDocument = useCallback(async () => {
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

      const newDoc = {
        workspaceId: Number(workspaceId),
        createdBy: user?.primaryEmailAddress?.emailAddress,
        coverImage: null,
        emoji: null,
        id: docId,
        documentName: "Untitled Document",
        documentOutput: [],
      };

      await setDoc(doc(db, "workspaceDocuments", docId.toString()), newDoc);

      await setDoc(doc(db, "documentOutput", docId.toString()), {
        docId: docId,
        output: [],
      });

      setLoading(false);
      router.replace("/workspace/" + workspaceId + "/" + docId);
    } catch (error) {
      console.error("Error creating document: ", error);
      setLoading(false);
    }
  }, [documentList?.length, router, user, workspaceId]);

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia("(min-width: 1024px)"); // 'lg' breakpoint is 1024px in Tailwind
  //   const handleMediaChange = (e) => {
  //     if (e.matches) {
  //       setExpanded(true);
  //     }
  //   };

  //   handleMediaChange(mediaQuery); // Set initial value
  //   mediaQuery.addEventListener("change", handleMediaChange);

  //   return () => {
  //     mediaQuery.removeEventListener("change", handleMediaChange);
  //   };
  // }, [setExpanded]);
  return (
    <div
      className={`h-screen w-16 lg:w-72 z-50 md:block 
      fixed bg-blue-50 p-5 shadow-md
      ${expanded && "w-72"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo and Notification box */}
      <div className="flex items-center justify-between">
        <Logo expanded={expanded} />
        <NotificationBox>
          <LuBell
            size={20}
            className={`h-5 w-5 text-gray-500 ${!expanded && "hidden"} lg:flex`}
          />
        </NotificationBox>
      </div>
      {/* Expand Button */}
      <div
        className={`flex items-center justify-end ${
          isHovered ? "block" : "hidden"
        }`}
      >
        <button
          onClick={() => setExpanded((curr) => !curr)}
          className={`p-1.5 mt-1 -mb-4 lg:block rounded-lg bg-white hover:bg-gray-100 transition-opacity ${
            isHovered ? "opacity-100 block" : "opacity-0 hidden"
          }`}
        >
          {expanded ? <LuChevronFirst /> : <LuChevronLast />}
        </button>
      </div>

      <hr className="my-5 border-[1.5px] border-gray-300 rounded-lg" />
      <div>
        <div
          className={`flex items-center ${
            expanded ? "justify-between" : "justify-center"
          }`}
        >
          <h2 className={`font-medium ${!expanded && "hidden"}`}>
            Workspace Name
          </h2>
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
      <DocumentList
        documentList={documentList}
        params={params}
        expanded={expanded}
      />

      {/* Progress Bar */}
      <div className={`absolute bottom-10 w-[85%] ${!expanded && "hidden"}`}>
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

export default memo(SideNav);
