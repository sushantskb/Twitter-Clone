import CommentItem from "./CommentItem";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface CommentFeedProps {
  comments?: Record<string, any>[];
}
const CommentsFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => {
  return (
    <>
      {comments.map((comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  );
};

export default CommentsFeed;
