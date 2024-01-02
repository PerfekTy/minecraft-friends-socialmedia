import { FormEvent, useEffect, useMemo, useState } from "react";
import { useUser } from "../../hooks/useUser.ts";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { useCurrentUser } from "../../hooks/useCurrentUser.ts";
import { useComments } from "../../hooks/useComments.ts";
import { useToken } from "../../hooks/useToken.ts";
import {useNavigate} from "react-router-dom";

interface CommentItemProps {
  comment: {
    idd: string;
    commentImage: string;
    commentBody: string;
    username: string;
    createdAt: string;
  };

  commentUsernames: [{ username: string }];
}

const CommentItem = ({ comment, commentUsernames }: CommentItemProps) => {
  const [userProfileImage, setUserProfileImage] = useState<string[]>([]);
  const navigate = useNavigate()
  const { user } = useUser(commentUsernames);
  const { currentUser } = useCurrentUser();
  const { mutateComments } = useComments();
  const { token } = useToken();

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

  useEffect(() => {
    if (!user) {
      return setUserProfileImage([]);
    }

    const profileImage = user.filter((user) => {
      if (user.username !== comment.username) {
        return;
      }
      return { image: user.profileImage };
    });

    setUserProfileImage(profileImage);
  }, [comment.username, user]);

  const onDelete = async (e: FormEvent) => {
    e.stopPropagation();
    try {
      await axios.delete(`http://localhost:8080/api/comments/${comment.idd}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      toast.success("Comment deleted!");
      mutateComments();
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className={`${
        comment?.commentImage && "w-fit"
      } p-5 bg-[#eee] max-w-[560px] md:mx-auto mx-4 dark:bg-[#222] rounded-2xl my-10 hover:dark:bg-[#333] hover:bg-[#ddd] relative`}
    >
      <div className="flex items-center gap-2 px-4">
        <img
          src={userProfileImage[0]?.profileImage || "/images/placeholder.jpg"}
          alt=""
          className="w-10 aspect-square object-cover rounded-full hover:opacity-90 cursor-pointer"
          onClick={e => {
            e.stopPropagation()
            navigate(`/user/${comment.username}`)
          }}
        />
        <span className="flex gap-2 items-center text-sm">
          <p className="font-semibold">@{comment?.username}</p>
          <p className="font-light">{createdAt}</p>
        </span>
        {comment.username === currentUser.username && (
          <div
            className="absolute right-5 cursor-pointer transition-all hover:scale-110 hover:text-error border-[#ccc] dark:border-[#555] border p-2 rounded-lg hover:bg-error hover:bg-opacity-20"
            onClick={onDelete}
          >
            <Trash2 size={20} />
          </div>
        )}
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
