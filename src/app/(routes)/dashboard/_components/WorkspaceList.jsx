"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@clerk/nextjs";
import { LuAlignLeft, LuLayoutDashboard } from "react-icons/lu";
import { HiPlus } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import WorkspaceItemList from "./WorkspaceItemList";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import EmptyWorkspace from "../../../../../public/EmptyWorkspace.json";
import Lottie from "lottie-react";

const WorkspaceList = () => {
  const { user } = useUser();
  const { orgId } = useAuth();
  const [WorkspaceList, setWorkspaceList] = useState([]);

  useEffect(() => {
    user && getWorkspaceList();
  }, [orgId, user]);

  const getWorkspaceList = async () => {
    try {
      const q = query(
        collection(db, "Workspace"),
        where(
          "orgId",
          "==",
          orgId ? orgId : user?.primaryEmailAddress?.emailAddress // if we are in org mode, use org id else use useremail if not org mode.
        )
      );
      const querySnapshot = await getDocs(q);
      setWorkspaceList([]);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setWorkspaceList((prev) => [...prev, doc.data()]);
      });
    } catch (error) {
      console.error("Error getting workspaces: ", error);
    }
  };
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
        {/* <div className="flex gap-2">
          <LuLayoutDashboard size={20} />
          <LuAlignLeft size={20} />
        </div> */}
      </div>

      {/* <WorkspaceList /> */}
      {WorkspaceList?.length == 0 ? (
        <div className="flex flex-col justify-center items-center my-10">
          {/* <Image
            // src="/workspacesvg.svg"
            src="/workspaceimg.jpg"
            alt="workspace"
            width={250}
            height={250}
          /> */}
          <Lottie
            animationData={EmptyWorkspace}
            loop={true}
            className="h-[23rem] w-fit -mt-8"
          />
          <h2 className="mt-4">Create New Workspace</h2>
          <Link href="/createworkspace">
            <Button className="my-3">+ New Workspace</Button>
          </Link>
        </div>
      ) : (
        <div>
          <WorkspaceItemList
            workspaceList={WorkspaceList}
            refreshData={getWorkspaceList}
          />
        </div>
      )}
    </div>
  );
};

export default WorkspaceList;
