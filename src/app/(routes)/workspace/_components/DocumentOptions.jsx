import React from "react";
import { LuLink2, LuMoreVertical, LuTrash2 } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DocumentOptions = ({ doc, deleteDocument }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <LuMoreVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex gap-2 cursor-pointer">
            <LuLink2 className="h-4 w-4 text-primary font-bold" /> Share Link
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2 cursor-pointer">
            <FaRegEdit className="h-4 w-4 text-primary font-bold" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => deleteDocument(doc?.id)}
            className="flex gap-2 text-red-500 cursor-pointer"
          >
            <LuTrash2 className="h-4 w-4 text-red-500 font-bold" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DocumentOptions;
