import { useAuthentication } from "@/helper.ts";
import Comment from "@server/types/comment";
import { FormEvent, useState } from "react";
import FormError from "@/components/FormError.tsx";
import axios from "axios";
import CommentComponent from "@/components/questions/CommentComponent.tsx";

export default function Comments({
  comments,
  from,
  id,
}: {
  comments: Comment[];
  from?: string;
  id?: string;
}) {
  const { loggedIn } = useAuthentication();

  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState("");
  const [page, setPage] = useState(1);

  const numPerPage = 3;
  const lastPage = Math.ceil(comments.length / numPerPage);

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
      const newComment = {
        text: commentText,
      };
      if (from && id) {
        axios
          .post(
            `http://localhost:8000/api/${from}/${id}/comments`,
            newComment,
            {
              withCredentials: true,
            },
          )
          .then(() => window.location.reload())
          .catch((err) => {
            console.error(err);
            setCommentError(err.response.data.message);
          });
      }
    }
  };

  const handleUpvote = (comment: Comment) => {
    axios
      .post(
        `http://localhost:8000/api/comments/${comment._id}/votes`,
        {},
        { withCredentials: true },
      )
      .then(() => {})
      .catch(() => console.log("Help me"));
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
              <CommentComponent
                key={i}
                comment={comment}
                voteCallback={() => handleUpvote(comment)}
              />,
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
