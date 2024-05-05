import { IconArrowUp } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { timeSinceDate } from "@/helper.ts";
import Comment from "@server/types/comment";
import { useState } from "react";

export default function CommentComponent({
  comment,
  voteCallback,
}: {
  comment: Comment;
  voteCallback: (comment: Comment) => void;
}) {
  const [votes, setVotes] = useState(comment.votes);

  const handleVote = () => {
    setVotes((prevVotes) => prevVotes + 1);
    voteCallback(comment);
  };
  return (
    <>
      <li className="border-b py-1 text-sm flex flex-row gap-3">
        <button
          className="rounded-full border w-5 h-5 flex justify-center items-center hover:bg-[#fbdbc0]"
          onClick={() => handleVote()}
        >
          <IconArrowUp width={14} height={14} />
        </button>
        <p className="text-sm text-gray-500 min-w-6 px-1">{votes}</p>
        <div>
          <span>{comment.text}</span> –{" "}
          <Link to={`/users/${comment.author.id}`} className="text-blue-700">
            {comment.author.username}
          </Link>
          <span className="text-gray-500">
            {" "}
            {timeSinceDate(comment.creationTime)}
          </span>
        </div>
      </li>
    </>
  );
}
