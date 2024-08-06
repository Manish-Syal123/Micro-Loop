"use client";
import { useThreads } from "@liveblocks/react/suspense";
import { Composer, Thread } from "@liveblocks/react-ui";
import React, { memo } from "react";

const CommentBox = () => {
  const { threads } = useThreads();
  return (
    <div className="w-[300px] h-[350px] shadow-lg rounded-2xl overflow-auto mb-11 border">
      {threads?.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
      <Composer />
    </div>
  );
};

export default CommentBox;
