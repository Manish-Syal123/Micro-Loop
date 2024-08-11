import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";

const DocumentHeader = () => {
  return (
    <div className="flex items-center justify-between p-3 px-7 shadow-md">
      <div></div>
      <OrganizationSwitcher />
      <div className="flex gap-2">
        <Link href="/dashboard">
          <Button
            variant="outline"
            className="flex gap-2 hover:text-primary hover:border-[1.5px] hover:border-primary group"
          >
            <LuLayoutDashboard className="h-4 w-4 hidden group-hover:block" />
            Dashboard
          </Button>
        </Link>
        <UserButton />
      </div>
    </div>
  );
};

export default DocumentHeader;
