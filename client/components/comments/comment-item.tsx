import { useMemo } from "react";

interface CommentItemProps {
  comment: {
    commentImage: string;
    commentBody: string;
    username: string;
    createdAt: string;
  };
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const createdAt = useMemo(() => {
    if (!comment?.createdAt) {
      return null;
    }
    return new Date(comment?.createdAt).toLocaleDateString("en-EN", {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [comment?.createdAt]);

  return (
    <div
      className={`${
        comment?.commentImage && "w-fit"
      } p-5 bg-[#eee] max-w-[560px] md:mx-auto mx-4 dark:bg-[#222] rounded-2xl my-10 hover:dark:bg-[#333] hover:bg-[#ddd]`}
    >
      <div className="flex items-center gap-2 px-4">
        <img
          src={"/images/placeholder.jpg"}
          alt=""
          className="w-14 aspect-square border-4 border-white dark:border-navbar object-cover rounded-full hover:opacity-90"
        />
        <span className="flex gap-2 items-center text-sm">
          <p className="font-semibold">@{comment?.username}</p>
          <p className="font-light">{createdAt}</p>
        </span>
      </div>
      <div className="p-5 flex mt-2 flex-col gap-2">
        <span>
          <p>{comment?.commentBody}</p>
        </span>
        {comment?.commentImage && (
          <div className="flex">
            <img
              src={comment?.commentImage}
              alt="comment image"
              width={480}
              height={480}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
