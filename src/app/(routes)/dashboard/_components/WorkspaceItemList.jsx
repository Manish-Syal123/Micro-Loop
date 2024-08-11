import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuMoreVertical, LuTrash2 } from "react-icons/lu";
import { FaRegEye } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { toast } from "sonner";

const WorkspaceItemList = ({ workspaceList, refreshData }) => {
  const router = useRouter();

  const DeleteWorkspace = async (workID) => {
    try {
      console.log("Deleting workspace with ID:", workID, typeof workID); // workID is a number here

      await DeleteDocumentOutput(workID);
      await DeleteDocument(workID);
      await deleteDoc(doc(db, "Workspace", String(workID))); // converting the number to string as deleteDoc only takes strings

      await refreshData();
      toast.success("Workspace Deleted !");
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
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <LuMoreVertical className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Workspace</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex gap-2 cursor-pointer"
                    onClick={() => OnClickWorkspaceItem(workspace?.id)}
                  >
                    <FaRegEye className="h-4 w-4 text-primary font-bold" /> View
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex gap-2 cursor-pointer">
                    <TbListDetails className="h-4 w-4 text-primary font-bold" />{" "}
                    Details
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => DeleteWorkspace(workspace?.id)}
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
    </div>
  );
};

export default WorkspaceItemList;
