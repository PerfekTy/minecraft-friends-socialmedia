"use client";

import { PostItem } from "./post-item";

interface PostFeedProps {
  userId?: string;
}

export const PostFeed = ({ userId }: PostFeedProps) => {
  const posts = [];
  return (
    <>
      {posts?.map((post: Record<string, any>) => (
        <PostItem key={post.id} data={post} userId={userId as string} />
      ))}
    </>
  );
};
