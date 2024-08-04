import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const WorkspaceItemList = ({ workspaceList }) => {
  const router = useRouter();
  const OnClickWorkspaceItem = (workspaceId) => {
    router.push("/workspace/" + workspaceId);
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {workspaceList &&
        workspaceList.map((workspace, index) => (
          <div
            key={workspace?.id}
            onClick={() => OnClickWorkspaceItem(workspace?.id)}
            className="border shadow-xl hover:scale-105 transition-all hover:shadow-lg hover:shadow-black/50 cursor-pointer rounded-xl"
          >
            <Image
              src={workspace?.coverImage}
              alt="cover"
              width={400}
              height={200}
              className="h-[150px] rounded-t-xl object-cover"
            />
            <div className="p-4 rounded-b-xl">
              <h2 className="flex gap-2">
                {workspace?.emoji} {workspace?.workspaceName}
              </h2>
            </div>
          </div>
        ))}
    </div>
  );
};

export default WorkspaceItemList;
