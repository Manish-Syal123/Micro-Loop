"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { LuAlignLeft, LuLayoutDashboard } from "react-icons/lu";
import { HiPlus } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";

const WorkspaceList = () => {
  const { user } = useUser();
  const [WorkspaceList, setWorkspaceList] = useState([]);
  return (
    <div className="my-10 p-10 md:px-24 lg:px-36 xl:px-52">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">
          Hello,<span> {user?.fullName}</span>
        </h2>
        <Link href="/createworkspace">
          <Button>
            <HiPlus size={16} />
          </Button>
        </Link>
      </div>

      <div className="mt-10 flex justify-between items-center">
        <div>
          <h2 className="font-medium text-primary">Workspaces</h2>
        </div>
        <div className="flex gap-2">
          <LuLayoutDashboard size={20} />
          <LuAlignLeft size={20} />
        </div>
      </div>

      {/* <WorkspaceList /> */}
      {WorkspaceList?.length == 0 ? (
        <div className="flex flex-col justify-center items-center my-10">
          <Image
            // src="/workspacesvg.svg"
            src="/workspaceimg.jpg"
            alt="workspace"
            width={250}
            height={250}
          />
          <h2 className="mt-4">Create New Workspace</h2>
          <Link href="/createworkspace">
            <Button className="my-3">+ New Workspace</Button>
          </Link>
        </div>
      ) : (
        <div>Workspace List</div>
      )}
    </div>
  );
};

export default WorkspaceList;
