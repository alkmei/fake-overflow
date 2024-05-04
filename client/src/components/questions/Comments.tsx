import { Link } from "react-router-dom";
import { timeSinceDate, useAuthentication } from "@/helper.ts";
import Comment from "@server/types/comment";
import { FormEvent, useState } from "react";
import FormError from "@/components/FormError.tsx";
import { IconArrowUp, IconCaretUpFilled } from "@tabler/icons-react";

export default function Comments({ comments }: { comments: Comment[] }) {
  const { loggedIn } = useAuthentication();

  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState("");
  const [page, setPage] = useState(1);

  const numPerPage = 3;
  const lastPage = Math.floor(comments.length / numPerPage) + 1;

  const incrementPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const decrementPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    let valid = true;

    setCommentError("");

    if (commentText.trim() === "") {
      valid = false;
      setCommentError("New comment cannot be empty");
    }

    if (valid) {
      // TODO: Send comments POST request for new comment
      const newComment = {
        text: commentText,
      };
      console.log(newComment);
    }
  };

  const handleUpvote = (comment: Comment) => {
    // TODO: Send POST request to upvote the comment
    console.log(comment);
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
                <button
                  className="rounded-full border w-5 h-5 flex justify-center items-center hover:bg-[#fbdbc0]"
                  onClick={() => handleUpvote(comment)}
                >
                  <IconArrowUp width={14} height={14} />
                </button>
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
      {loggedIn && (
        <form className="inline-block w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col pt-2 bg-gray-50 gap-6">
            <textarea
              name="new-answer"
              placeholder="Comment here..."
              cols={30}
              rows={1}
              className="rounded p-2 border text-xs"
              onChange={(e) => setCommentText(e.target.value)}
            />
          </div>
          <FormError message={commentError} />
          <button className=" text-blue-500 text-nowrap ml-3 text-xs">
            Post comment
          </button>
        </form>
      )}
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
