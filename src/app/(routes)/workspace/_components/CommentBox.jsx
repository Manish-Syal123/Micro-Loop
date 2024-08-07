"use client";
import { useThreads } from "@liveblocks/react";
import { Composer, Thread } from "@liveblocks/react-ui";
import React from "react";

const CommentBox = () => {
  const { threads } = useThreads();
  return (
    <div className="w-[300px] h-[350px] shadow-lg rounded-2xl overflow-auto mb-11 border">
      {threads?.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
      {/* <Composer /> */}
      <Composer className="z-10">
        <Composer.Submit className="btn-primary" style={{ color: "#ffffff" }}>
          Reply
        </Composer.Submit>
      </Composer>
    </div>
  );
};

export default CommentBox;
