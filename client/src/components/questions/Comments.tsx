import { Link } from "react-router-dom";
import { timeSinceDate } from "@/helper.ts";
import PageButtons from "@/components/PageButtons.tsx";
import Comment from "@server/types/comment";

export default function Comments({ comments }: { comments: Comment[] }) {
  return (
    <ol className="col-[2] border-t">
      {comments.map((comment) => (
        <li className="border-b py-1 text-sm flex flex-row gap-3">
          <p className="text-sm text-gray-500 min-w-6 px-1">{comment.votes} </p>
          <div>
            <span>{comment.text}</span> –{" "}
            <Link to={`/users`} className="text-blue-700">
              {comment.author.username}
            </Link>
            <span className="text-gray-500">
              {" "}
              {timeSinceDate(comment.creationTime)}
            </span>
          </div>
        </li>
      ))}
      <PageButtons totalPages={5} />
    </ol>
  );
}
