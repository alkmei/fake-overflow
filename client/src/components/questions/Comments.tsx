import { Link } from "react-router-dom";
import { timeSinceDate } from "@/helper.ts";
import Comment from "@server/types/comment";
import { useState } from "react";

export default function Comments({ comments }: { comments: Comment[] }) {
  const [page, setPage] = useState(1);
  const numPerPage = 3;
  const lastPage = Math.floor(comments.length / numPerPage) + 1;

  const incrementPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const decrementPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <ol className="col-[2] border-t">
      {(() => {
        const renderedComments = [];
        for (
          let i = (page - 1) * numPerPage;
          i < (page - 1) * numPerPage + numPerPage;
          i++
        ) {
          const comment = comments[i];
          if (comment) {
            renderedComments.push(
              <li key={i} className="border-b py-1 text-sm flex flex-row gap-3">
                <p className="text-sm text-gray-500 min-w-6 px-1">
                  {comment.votes}
                </p>
                <div>
                  <span>{comment.text}</span> –{" "}
                  <Link
                    to={`/users/${comment.author.id}`}
                    className="text-blue-700"
                  >
                    {comment.author.username}
                  </Link>
                  <span className="text-gray-500">
                    {" "}
                    {timeSinceDate(comment.creationTime)}
                  </span>
                </div>
              </li>,
            );
          }
        }
        return renderedComments;
      })()}
      <ol className="flex gap-2 text-sm p-8 items-center justify-center">
        <li>
          <button
            className={`border p-2 rounded ${page > 1 ? "hover:bg-gray-200" : "bg-gray-100"}`}
            onClick={decrementPage}
            disabled={page <= 1}
          >
            Prev
          </button>
        </li>
        {page}
        <li>
          <button
            className={`border p-2 rounded ${page < lastPage ? "hover:bg-gray-200" : "bg-gray-100"}`}
            onClick={incrementPage}
            disabled={page >= lastPage}
          >
            Next
          </button>
        </li>
      </ol>
    </ol>
  );
}
