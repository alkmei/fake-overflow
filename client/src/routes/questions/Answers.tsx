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
import FormError from "@/components/FormError.tsx";
import { FormEvent, useEffect, useState } from "react";
import { useAuthentication, validateHyperlinks, getAnswers } from "@/helper.ts";
import { Link, useParams, useSearchParams } from "react-router-dom";
import PageButtons from "@/components/PageButtons.tsx";
import Answer from "@server/types/answer";
import Question from "@server/types/question";
import axios from "axios";
import { tempQuestions } from "@/TempData.ts";

export default function Answers({ fromProfile }: { fromProfile?: boolean }) {
  const questionId = useParams().id;
  const { loggedIn, username } = useAuthentication();
  const [question, setQuestion] = useState<Question>();
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);

  const [text, setText] = useState("");
  const [textError, setTextError] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [editingAnswerId, setEditingAnswerId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");
  const [editError, setEditError] = useState("");

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
      })
      .catch((error) => {
        console.error("Error fetching question:", error);
      });
  }, [questionId]);

  //  TODO: split the array into answers by user and answers not by the user

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    let valid = true;

    setTextError("");

    if (!validateHyperlinks(text)) {
      setTextError("Invalid hyperlink");
      valid = false;
    }

    if (text.trim() === "") {
      setTextError("Answer text cannot be empty");
      valid = false;
    }

    if (valid) {
      const newAnswer = {
        text: text,
      };

      console.log(newAnswer);

      // // TODO: add new answer then reload to show new answer if successful, make sure user is logged in
      // axios
      //     .post("http://localhost:8000/api/answers/", newAnswer, {withCredentials: true})
      //     .then((res) => {
      //       console.log(res);
      //       console.log(res.data);
      //     });
    }
  };

  const handleEdit = (answer: Answer) => {
    if (!(answer.id !== editingAnswerId)) setEditingAnswerId(null);
    else setEditingAnswerId(answer.id);

    setEditedText(answer.text);
  };

  const handleEditSubmit = (event: FormEvent, answer: Answer) => {
    event.preventDefault();
    let valid = true;

    setEditError("");

    if (!validateHyperlinks(text)) {
      setEditError("Invalid hyperlink");
      valid = false;
    }

    if (editedText.trim() === "") {
      setEditError("Edited text cannot be empty");
      valid = false;
    }

    if (editedText === answer.text) {
      setEditError("Edited text is identical to answer text");
      valid = false;
    }

    if (valid) {
      // TODO: send POST request to change answer
      console.log(editedText);
    }
  };

  const handleDelete = (answer: Answer) => {
    console.log(answer);
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
  const lastPage = Math.floor(question.answers.length / numPerPage) + 1;
  console.log(question);
  // TODO - Separate the body into its own component
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
        <Comments comments={question.comments} />
      </div>
      <h2 className="text-xl">
        {question.answers.length}{" "}
        {question.answers.length === 1 ? "Answer" : "Answers"}
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
              if (i < userAnswers.length) {
                answer = userAnswers[i];
                editableAns = true;
              } else answer = question.answers[i - userAnswers.length];

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
                        <button
                          className="rounded-full border w-9 h-9 flex justify-center items-center hover:bg-[#fbdbc0]"
                          onClick={() => handleEdit(answer)}
                        >
                          <IconEdit width={16} height={16} />
                        </button>
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
                    {editingAnswerId === answer.id && (
                      <form onSubmit={(e) => handleEditSubmit(e, answer)}>
                        <textarea
                          name="edit-answer"
                          cols={30}
                          rows={3}
                          value={editedText}
                          className="rounded p-2 border w-full mr-10"
                          onChange={(e) => setEditedText(e.target.value)}
                        />
                        <FormError message={editError} />
                        <button className="bg-blue-500 p-2 text-white rounded hover:bg-blue-600 text-nowrap text-xs mt-2">
                          Submit Edit
                        </button>
                      </form>
                    )}
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
                    <Comments comments={answer.comments} />
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
        <form className="inline-block mb-16 border-t" onSubmit={handleSubmit}>
          <div className="flex flex-col p-2 bg-gray-50 gap-6">
            <label htmlFor="new-answer" className="text-xl">
              Your Answer
            </label>
            <textarea
              name="new-answer"
              cols={30}
              rows={7}
              className="rounded p-2 border"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <FormError message={textError} />
          <button className="bg-blue-500 p-2 text-white rounded hover:bg-blue-600 text-nowrap mt-5">
            Post Your Answer
          </button>
        </form>
      )}
    </section>
  );
}
