import { useComments } from "../../hooks/useComments";
import CommentItem from "./comment-item.tsx";

const CommentFeed = () => {
  const { comments = [] } = useComments();

  const sortedComments = [...comments].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div>
      {sortedComments?.map((comment) => <CommentItem comment={comment} />)}
    </div>
  );
};

export default CommentFeed;
