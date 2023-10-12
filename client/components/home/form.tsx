"use client";

import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import TwitterHeader from "@/components/home/welcome-twitter-header";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/modals/auth-modal";
import { Avatar } from "@/components/avatar/avatar";
import { cn } from "@/lib/utils";

interface FormProps {
  placeholder: string;
  postId?: string;
  isComment?: boolean;
  className?: string;
}

export const Form = ({
  placeholder,
  isComment,
  postId,
  className,
}: FormProps) => {
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSumbit = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        setIsLoading(true);

        const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts";

        if (!body.trim().length) {
          return toast.error("Post cannot be empty");
        }

        await axios.post(url, { body });

        if (url.includes(postId as string)) {
          toast.success("Tweet commented");
        } else {
          toast.success("Tweet created");
        }

        setBody("");
      } catch (error) {
        toast.error("Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    },
    [body, isComment, postId]
  );

  return (
    <>
      <form
        onSubmit={onSumbit}
        className={(cn("border-b-[1px] px-5"), className)}
      >
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={"currentUser?.id"} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              className="disabled:opacity-80 peer resize-none mt-3 w-full ring-0 outline-none text-[20px] p-2 bg-transparent"
              placeholder={placeholder}
            ></textarea>
            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] transition w-full" />
            <div className="my-4 flex flex-row justify-end">
              <Button className="text-white" disabled={isLoading || !body}>
                {postId ? "Comment" : "Post"}
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* <>
        <div className="py-8">
          <TwitterHeader />
        </div>
        <div className="flex flex-row items-center justify-center gap-4 mb-5">
          <AuthModal />
        </div>
      </> */}
    </>
  );
};