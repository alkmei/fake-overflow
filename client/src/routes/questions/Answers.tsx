import PostText from "@/components/questions/PostText.tsx";
import QuestionHeader from "@/components/QuestionHeader.tsx";
import {
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconEdit,
  IconX,
} from "@tabler/icons-react";
import TagComponent from "@/components/TagComponent.tsx";
import Comments from "@/components/questions/Comments.tsx";
import { useEffect, useState } from "react";
import { useAuthentication } from "@/helper.ts";
import { Link, useParams, useSearchParams } from "react-router-dom";
import PageButtons from "@/components/PageButtons.tsx";
import Answer from "@server/types/answer";
import Question from "@server/types/question";
import axios from "axios";

export default function Answers({ fromProfile }: { fromProfile?: boolean }) {
  const questionId = useParams().qid;
  const { loggedIn, user } = useAuthentication();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [question, setQuestion] = useState<Question>();
  const [nonUserAnswers, setNonUserAnswers] = useState<Answer[]>([]);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [deleteError, setDeleteError] = useState("");

  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("page")) {
      const pageParam = searchParams.get("page");
      if (pageParam) {
        const newPage = parseInt(pageParam);
        setPage(newPage);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/questions/${questionId}`)
      .then(async (res) => {
        setQuestion(res.data);
        setAnswers(
          res.data.answers.sort(
            (a: Answer, b: Answer) =>
              new Date(b.creationTime).getTime() -
              new Date(a.creationTime).getTime(),
          ),
        );
        // Split answers into user's answers and non-user's answers
        const userAnswersArray: Answer[] = [];
        const nonUserAnswersArray: Answer[] = [];
        res.data.answers.forEach((answer: Answer) => {
          if (answer.author._id === user?._id) {
            userAnswersArray.push(answer);
          } else {
            nonUserAnswersArray.push(answer);
          }
        });
        setUserAnswers(
          userAnswersArray.sort(
            (a, b) =>
              new Date(b.creationTime).getTime() -
              new Date(a.creationTime).getTime(),
          ),
        );
        setNonUserAnswers(
          nonUserAnswersArray.sort(
            (a, b) =>
              new Date(b.creationTime).getTime() -
              new Date(a.creationTime).getTime(),
          ),
        );
      })
      .catch((error) => {
        console.error("Error fetching question:", error);
      });
  }, [questionId, user?._id]);

  const handleDelete = (answer: Answer) => {
    setDeleteError("");
    axios
      .delete(`http://localhost:8000/api/answers/${answer._id}`, {
        withCredentials: true,
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        setDeleteError(err.response.data.message);
      });
  };

  const handleUpvote = (post: Question | Answer) => {
    // TODO: Send POST request to upvote the post
    console.log(post);
  };

  const handleDownvote = (post: Question | Answer) => {
    // TODO: Send POST request to upvote the post
    console.log(post);
  };

  if (question === undefined) return <p>Question Not Found...</p>;

  const numPerPage = 5;
  const lastPage = Math.ceil(question.answers.length / numPerPage);

  return (
    <section className="flex flex-col gap-5 w-full p-6">
      <section className="w-full">
        <QuestionHeader question={question} />
      </section>
      <div className="grid gap-4 mt-4 grid-cols-[1fr_16fr]">
        <div className="flex flex-col gap-2 items-center col-[1]">
          <button
            className="rounded-full border w-10 h-10 flex justify-center items-center hover:bg-[#fbdbc0]"
            onClick={() => handleUpvote(question)}
          >
            <IconCaretUpFilled width={24} height={24} />
          </button>
          <div className="font-bold">{question.votes}</div>
          <button
            className="rounded-full border w-10 h-10 flex justify-center items-center hover:bg-[#fbdbc0]"
            onClick={() => handleDownvote(question)}
          >
            <IconCaretDownFilled width={24} height={24} />
          </button>
        </div>
        <div className="flex flex-col justify-between items-start col-[2]">
          <PostText text={question.text} />
          <ol className="flex items-center justify-center gap-2">
            {question.tags.map((tag) => (
              <TagComponent key={tag.id} name={tag.name} />
            ))}
          </ol>
        </div>
        <div className="col-[2] justify-self-end">
          <div className="text-xs bg-blue-50 rounded-md p-3 max-w-56">
            <p className="text-gray-600">
              asked {new Date(question.creationTime).toLocaleString()}
            </p>
            <Link
              to={`/users/${question.author.id}`}
              className="text-sm text-blue-600"
            >
              {question.author.username}
            </Link>
            <p className="font-bold text-gray-600">
              {question.author.reputation} rep
            </p>
          </div>
        </div>
        <Comments
          comments={question.comments}
          from="questions"
          id={question._id}
        />
      </div>
      <h2 className="text-xl">
        {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
      </h2>
      <div className="flex flex-col gap-3 overflow-y-scroll max-h-[650px]">
        <ul id="answer-list">
          {(() => {
            const renderedAnswers = [];
            for (
              let i = (page - 1) * numPerPage;
              i < (page - 1) * numPerPage + numPerPage;
              i++
            ) {
              let answer;
              let editableAns = false;
              if (fromProfile) {
                if (i < userAnswers.length) {
                  answer = userAnswers[i];
                  editableAns = true;
                } else answer = nonUserAnswers[i - userAnswers.length];
              } else answer = answers[i];

              if (answer) {
                renderedAnswers.push(
                  <div key={i} className="grid gap-4 mt-4 grid-cols-[1fr_16fr]">
                    <div className="flex flex-col gap-2 items-center col-[1]">
                      <button
                        className="rounded-full border w-10 h-10 flex justify-center items-center hover:bg-[#fbdbc0]"
                        onClick={() => handleUpvote(answer)}
                      >
                        <IconCaretUpFilled width={24} height={24} />
                      </button>
                      <div className="font-bold">{answer.votes}</div>
                      <button
                        className="rounded-full border w-10 h-10 flex justify-center items-center hover:bg-[#fbdbc0]"
                        onClick={() => handleDownvote(answer)}
                      >
                        <IconCaretDownFilled width={24} height={24} />
                      </button>
                    </div>
                    {editableAns && (
                      <div className="flex flex-col gap-2 col-[1] items-center">
                        <Link
                          to={`/questions/${question._id}/answer/${answer._id}/edit`}
                          className="rounded-full border w-9 h-9 flex justify-center items-center hover:bg-[#fbdbc0]"
                        >
                          <IconEdit width={16} height={16} />
                        </Link>
                        <button
                          className="rounded-full border w-9 h-9 flex justify-center items-center hover:bg-red-200"
                          onClick={() => handleDelete(answer)}
                        >
                          <IconX width={16} height={16} />
                        </button>
                      </div>
                    )}
                    <div className="flex flex-col justify-between items-start col-[2] row-[1]">
                      <PostText text={answer.text} />
                    </div>
                    <div className="col-[2] justify-self-end">
                      <div className="text-xs p-3 max-w-56">
                        <p className="text-gray-600">
                          answered{" "}
                          {new Date(answer.creationTime).toLocaleString()}
                        </p>
                        <Link
                          to={`/users/${question.author.id}`}
                          className="text-sm text-blue-600"
                        >
                          {answer.author.username}
                        </Link>
                        <p className="font-bold text-gray-600">
                          {answer.author.reputation} rep
                        </p>
                      </div>
                    </div>
                    <Comments
                      comments={answer.comments}
                      from="answers"
                      id={answer._id}
                    />
                  </div>,
                );
              }
            }
            return renderedAnswers;
          })()}
        </ul>
      </div>
      <PageButtons totalPages={lastPage} />
      {loggedIn && (
        <div className="inline-block">
          <Link
            to={`/questions/${question._id}/answer/`}
            className="bg-blue-500 p-2 text-white rounded hover:bg-blue-600 text-nowrap"
          >
            Answer Question
          </Link>
        </div>
      )}
    </section>
  );
}
