import CoverPicker from "@/app/_components/CoverPicker";
import EmojiPickerComponent from "@/app/_components/EmojiPickerComponent";
import { db } from "@/config/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LuSmilePlus } from "react-icons/lu";
import { toast } from "sonner";

const DocumentInfo = ({ params }) => {
  const [coverImage, setCoverImage] = useState("/cover3.jpg");
  const [emoji, setEmoji] = useState();
  const [documentInfo, setDocumentInfo] = useState();

  useEffect(() => {
    params && GetDocumentInfo();
  }, [params]);
  const GetDocumentInfo = async () => {
    try {
      const docRef = doc(db, "workspaceDocuments", params?.documentid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setDocumentInfo(docSnap.data());
        setEmoji(docSnap.data()?.emoji);
        docSnap.data()?.coverImage && setCoverImage(docSnap.data()?.coverImage);
      }
    } catch (error) {
      console.error("Error getting documentInfo:", error);
    }
  };

  const updateDocumentInfo = async (key, value) => {
    try {
      const docRef = doc(db, "workspaceDocuments", params?.documentid);
      await updateDoc(docRef, { [key]: value });
      toast.success("Document Updated !");
    } catch (error) {
      console.error("Error updating documentInfo:", error);
    }
  };

  return (
    <div>
      {/* Cover */}
      <CoverPicker
        setNewCover={(cover) => {
          setCoverImage(cover);
          updateDocumentInfo("coverImage", cover);
        }}
      >
        <div className="relative group cursor-pointer">
          <h2 className=" hidden absolute p-4 w-full h-full items-center group-hover:flex justify-center ">
            Change Cover
          </h2>
          <div className="group-hover:opacity-50">
            <Image
              src={coverImage}
              alt="cover"
              width={400}
              height={400}
              priority={true}
              className="w-full h-[200px] object-cover rounded-t-xl"
            />
          </div>
        </div>
      </CoverPicker>
      {/* Emoji Picker */}
      <div className="absolute ml-10 mt-[-40px]">
        <EmojiPickerComponent
          setEmojiIcon={(emoji) => {
            setEmoji(emoji);
            updateDocumentInfo("emoji", emoji);
          }}
        >
          <div className="bg-[#ffffffb0] p-4 rounded-md cursor-pointer">
            {emoji ? (
              <span className="text-5xl">{emoji}</span>
            ) : (
              <LuSmilePlus className="h-10 w-10 text-gray-500" />
            )}
          </div>
        </EmojiPickerComponent>
      </div>
      {/* File Name */}
      <div className="mt-10 p-10">
        <input
          type="text"
          placeholder="Untitled Document"
          defaultValue={documentInfo?.documentName}
          className="w-full border-none text-4xl font-bold outline-none"
          onBlur={(e) => updateDocumentInfo("documentName", e.target.value)} // when user is done typing and click outside this input box it's this(onBlur) gonna emite/fire/trigger the event.
        />
      </div>
    </div>
  );
};

export default DocumentInfo;
