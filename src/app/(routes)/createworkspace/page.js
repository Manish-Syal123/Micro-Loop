"use client";
import CoverPicker from "@/app/_components/CoverPicker";
import EmojiPickerComponent from "@/app/_components/EmojiPickerComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";
import { LuSmilePlus } from "react-icons/lu";

const CreateWorkspace = () => {
  const [coverImage, setCoverImage] = useState("/cover3.jpg");
  const [workspaceName, setWorkspaceName] = useState();
  const [emoji, setEmoji] = useState("");

  return (
    <div className="p-10 md:px-36 lg:px-64 xl:px-96 py-28">
      <div className="shadow-2xl rounded-xl">
        {/* Cover Image */}
        <CoverPicker setNewCover={(cover) => setCoverImage(cover)}>
          <div className="relative group cursor-pointer">
            <h2 className=" hidden absolute p-4 w-full h-full items-center group-hover:flex justify-center ">
              Change Cover
            </h2>
            <div className="group-hover:opacity-50">
              <Image
                src={coverImage}
                width={400}
                height={400}
                className="w-full h-[180px] object-cover rounded-t-xl"
              />
            </div>
          </div>
        </CoverPicker>
        {/* Input Section */}
        <div className="p-12">
          <h2 className="font-medium text-xl">Create a new Workspace</h2>
          <h2 className="text-sm mt-2">
            This is shared space where you can colloborate with your team. You
            can always rename it later.
          </h2>
          <div className="mt-8 flex gap-2 items-center">
            <EmojiPickerComponent setEmojiIcon={(v) => setEmoji(v)}>
              <Button variant="outline" className="text-xl">
                {emoji ? emoji : <LuSmilePlus size={20} />}
              </Button>
            </EmojiPickerComponent>
            <Input
              placeholder="Workspace Name"
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
          </div>
          <div className="mt-7 flex justify-end gap-6">
            <Button disabled={!workspaceName?.length}>Create</Button>
            <Button variant="outline">Cancle</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkspace;
