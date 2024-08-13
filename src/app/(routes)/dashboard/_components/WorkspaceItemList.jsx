import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { LuMoreVertical, LuTrash2 } from "react-icons/lu";
import { FaRegEye } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const WorkspaceItemList = ({ workspaceList, refreshData }) => {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);

  const DeleteWorkspace = async (workID) => {
    try {
      await DeleteDocumentOutput(workID);
      await DeleteDocument(workID);
      await deleteDoc(doc(db, "Workspace", String(workID)));

      await refreshData();
      toast.success("Workspace Deleted!");
    } catch (error) {
      console.error("Error deleting Workspace: ", error);
    }
  };

  // before deleting workspace we have to delete all the documents associated with it along with their documentOutput
  const DeleteDocument = async (workID) => {
    try {
      const q = query(
        collection(db, "workspaceDocuments"),
        where("workspaceId", "==", workID)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (document) => {
        await deleteDoc(doc(db, "workspaceDocuments", document.id));
      });

      toast.success("Documents Deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const DeleteDocumentOutput = async (workID) => {
    try {
      const q = query(
        collection(db, "documentOutput"),
        where("workspaceId", "==", workID)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (document) => {
        await deleteDoc(doc(db, "documentOutput", document.id));
      });

      toast.success("DocumentOutput Deleted!");
    } catch (error) {
      console.error("Error deleting documentOutput: ", error);
    }
  };

  const OnClickWorkspaceItem = (workspaceId) => {
    router.push("/workspace/" + workspaceId);
  };

  const RenameWorkspace = async (workID) => {
    try {
      await updateDoc(doc(db, "Workspace", String(workID)), {
        workspaceName: workspaceName,
      });
      toast.success("Workspace Renamed!");
      refreshData();
    } catch (error) {
      console.error("Error Updating WorkspaceName: ", error);
    }
    setOpenDialog(false); // Closing the dialog after renaming
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {workspaceList &&
        workspaceList.map((workspace, index) => (
          <div
            key={workspace?.id}
            className="border shadow-xl hover:scale-105 transition-all hover:shadow-lg hover:shadow-black/50 cursor-pointer rounded-xl"
          >
            <Image
              src={workspace?.coverImage}
              alt="cover"
              width={400}
              height={200}
              className="h-[150px] rounded-t-xl object-cover"
              onClick={() => OnClickWorkspaceItem(workspace?.id)}
            />
            <div className="p-4 rounded-b-xl flex justify-between items-center">
              <h2 className="flex gap-2">
                {workspace?.emoji} {workspace?.workspaceName}
              </h2>
              <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                <DropdownMenuTrigger>
                  <LuMoreVertical className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Workspace</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {/* Details/CreatedBy on Hover */}
                  <HoverCard>
                    <HoverCardTrigger>
                      <DropdownMenuItem className="flex gap-2 cursor-pointer">
                        <TbListDetails className="h-4 w-4 text-primary font-bold" />{" "}
                        Details
                      </DropdownMenuItem>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <h2 className="text-xs flex gap-1">
                        <span className="text-indigo-700">Created By:</span>{" "}
                        {workspace?.createdBy}
                      </h2>
                    </HoverCardContent>
                  </HoverCard>

                  <DropdownMenuItem
                    className="flex gap-2 cursor-pointer"
                    onClick={() => {
                      OnClickWorkspaceItem(workspace?.id);
                      setOpenDropdown(false);
                    }}
                  >
                    <FaRegEye className="h-4 w-4 text-primary font-bold" /> View
                  </DropdownMenuItem>

                  {/* Edit workspace Name / Rename */}
                  <DropdownMenuItem
                    className="flex gap-2 cursor-pointer"
                    onClick={() => {
                      setSelectedWorkspaceId(workspace?.id);
                      setWorkspaceName(workspace?.workspaceName);
                      setOpenDialog(true);
                      setOpenDropdown(false);
                    }}
                  >
                    <MdOutlineDriveFileRenameOutline className="h-5 w-5 text-primary font-bold" />{" "}
                    Rename
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => {
                      DeleteWorkspace(workspace?.id);
                      setOpenDropdown(false);
                    }}
                    className="flex gap-2 text-red-500 cursor-pointer"
                  >
                    <LuTrash2 className="h-4 w-4 text-red-500 font-bold" />{" "}
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}

      {/* Dialog for renaming */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rename Workspace</AlertDialogTitle>
            <AlertDialogDescription>
              <Input
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => RenameWorkspace(selectedWorkspaceId)}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default WorkspaceItemList;
