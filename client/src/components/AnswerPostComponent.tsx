import {
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconEdit,
  IconX,
} from "@tabler/icons-react";
import PostText from "@/components/questions/PostText.tsx";
import TagName from "@/components/TagName.tsx";
import { Link } from "react-router-dom";
import Comment from "@server/types/comment";
import { useEffect, useState } from "react";
import Answer from "@server/types/answer";
import Question from "@server/types/question";
import FormError from "@/components/FormError.tsx";
import { useAuthentication } from "@/helper.ts";
import Comments from "@/components/questions/Comments.tsx";

export default function AnswerPostComponent({
  post,
  question,
  editableAns,
  voteCallback,
  deleteAnsCallback,
  newCommentCallback,
}: {
  post: Answer | Question;
  question?: Question;
  editableAns?: boolean;
  voteCallback: (post: Answer | Question, vote: number) => void;
  deleteAnsCallback?: (post: Answer) => Promise<string>;
  newCommentCallback?: (comment: Comment, answer: Answer) => void;
}) {
  const { user } = useAuthentication();
  const [postState, setPostState] = useState<Answer | Question>();
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [postVotes, setPostVotes] = useState(post.votes);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    setPostState(post);
    setPostComments(post.comments);
  }, [post]);

  const handleVote = (vote: number) => {
    if (user && (user.isStaff || !(user.reputation < 50)))
      setPostVotes((prevVotes) => prevVotes + vote);
    voteCallback(post, vote);
  };

  const handleDelete = async (answer: Answer) => {
    if (deleteAnsCallback) setDeleteError(await deleteAnsCallback(answer));
  };

  const handleNewComment = (comment: Comment) => {
    setPostComments((prevComments) => [...prevComments, comment]);
    if (newCommentCallback && !(post as Question).tags)
      newCommentCallback(comment, post as Answer);
  };

  const handleCommentVote = (comment: Comment) => {
    setPostComments((prevCom) =>
      prevCom.map(
        (com) =>
          (com._id === comment._id
            ? { ...com, votes: com.votes + 1 }
            : com) as Comment,
      ),
    );
  };
  if (!postState) return <div>Error loading post...</div>;
  return (
    <div className="grid gap-4 mt-4 grid-cols-[1fr_16fr]">
      <div className="flex flex-col gap-2 items-center col-[1]">
        <button
          className="rounded-full border w-10 h-10 flex justify-center items-center hover:bg-[#fbdbc0]"
          onClick={() => handleVote(1)}
        >
          <IconCaretUpFilled width={24} height={24} />
        </button>
        <div className="font-bold">{postVotes}</div>
        <button
          className="rounded-full border w-10 h-10 flex justify-center items-center hover:bg-[#fbdbc0]"
          onClick={() => handleVote(-1)}
        >
          <IconCaretDownFilled width={24} height={24} />
        </button>
      </div>
      {editableAns && (
        <div className="flex flex-col gap-2 col-[1] items-center">
          <Link
            to={`/questions/${question?._id}/answer/${postState._id}/edit`}
            className="rounded-full border w-9 h-9 flex justify-center items-center hover:bg-[#fbdbc0]"
          >
            <IconEdit width={16} height={16} />
          </Link>
          <button
            className="rounded-full border w-9 h-9 flex justify-center items-center hover:bg-red-200"
            onClick={() => handleDelete(postState)}
          >
            <IconX width={16} height={16} />
          </button>
          <FormError message={deleteError} />
        </div>
      )}
      <div className="flex flex-col justify-between items-start col-[2]">
        <PostText text={postState.text} />
        {(postState as Question).tags && (
          <ol className="flex items-center justify-center gap-2">
            {(postState as Question).tags.map((tag) => (
              <TagName key={tag.id} name={tag.name} />
            ))}
          </ol>
        )}
      </div>
      <div className="col-[2] justify-self-end">
        <div
          className={`text-xs rounded-md p-3 max-w-56 ${(postState as Question).tags ? "bg-blue-50" : ""}`}
        >
          <p className="text-gray-600">
            asked {new Date(postState.creationTime).toLocaleString()}
          </p>
          <Link
            to={`/users/${postState.author.id}`}
            className="text-sm text-blue-600"
          >
            {postState.author.username}
          </Link>
        </div>
      </div>
      <Comments
        initComments={postComments}
        from={(postState as Question).tags ? "questions" : "answers"}
        id={postState._id}
        voteCallback={handleCommentVote}
        newCommentCallback={handleNewComment}
      />
    </div>
  );
}
