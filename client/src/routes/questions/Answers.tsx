import PostText from "@/components/questions/PostText.tsx";
import { tempQuestions } from "@/TempData.ts";
import QuestionHeader from "@/components/QuestionHeader.tsx";
import { IconCaretDownFilled, IconCaretUpFilled } from "@tabler/icons-react";
import TagComponent from "@/components/TagComponent.tsx";
import Comments from "@/components/questions/Comments.tsx";
import FormError from "@/components/FormError.tsx";
import { FormEvent, useEffect, useState } from "react";
import { validateHyperlinks } from "@/helper.ts";
import { Link, useSearchParams } from "react-router-dom";
import PageButtons from "@/components/PageButtons.tsx";

export default function Answers() {
  const questionId = new URLSearchParams(window.location.search).get("id");
  const [text, setText] = useState("");
  const [textError, setTextError] = useState("");
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
  // TODO: show updated view count on answers page

  const question = tempQuestions[1];
  const answers = question.answers;

  const numPerPage = 5;
  const lastPage = Math.floor(answers.length / numPerPage) + 1;

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
        author: "test author", // this will be a user later
      };

      console.log(newAnswer);

      // // TODO: add new answer then reload to show new answer if successful, make sure user is logged in
      // axios
      //     .post("http://localhost:8000/posts/answer", newAnswer)
      //     .then((res) => {
      //       console.log(res);
      //       console.log(res.data);
      //     });
    }
  };

  if (questionId && Object.keys(question).length === 0)
    return <p>Page Loading...</p>;
  // TODO - Separate the body into its own component
  return (
    <section className="flex flex-col gap-5 w-full p-6">
      <section className="w-full">
        <QuestionHeader question={question} />
      </section>
      <div className="grid gap-4 mt-4 grid-cols-[1fr_16fr]">
        <div className="flex flex-col gap-2 items-center col-[1]">
          <button className="rounded-full border w-10 h-10 flex justify-center items-center hover:bg-[#fbdbc0]">
            <IconCaretUpFilled width={24} height={24} />
          </button>
          <div className="font-bold">{question.votes}</div>
          <button className="rounded-full border w-10 h-10 flex justify-center items-center hover:bg-[#fbdbc0]">
            <IconCaretDownFilled width={24} height={24} />
          </button>
        </div>
        <div className="flex flex-col justify-between items-start col-[2]">
          <PostText text={question.text} />
          <ol className="flex items-center justify-center gap-2">
            {question.tags.map((tag) => (
              <TagComponent name={tag.name} />
            ))}
          </ol>
        </div>
        <div className="col-[2] justify-self-end">
          <div className="text-xs bg-blue-50 rounded-md p-3 max-w-56">
            <p className="text-gray-600">
              asked {question.creationTime.toLocaleString()}
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
              const answer = answers[i];
              if (answer) {
                renderedAnswers.push(
                  <div key={i} className="grid gap-4 mt-4 grid-cols-[1fr_16fr]">
                    <div className="flex flex-col gap-2 items-center col-[1]">
                      <button className="rounded-full border w-10 h-10 flex justify-center items-center hover:bg-[#fbdbc0]">
                        <IconCaretUpFilled width={24} height={24} />
                      </button>
                      <div className="font-bold">{answer.votes}</div>
                      <button className="rounded-full border w-10 h-10 flex justify-center items-center hover:bg-[#fbdbc0]">
                        <IconCaretDownFilled width={24} height={24} />
                      </button>
                    </div>
                    <div className="flex flex-col justify-between items-start col-[2]">
                      <PostText text={answer.text} />
                    </div>
                    <div className="col-[2] justify-self-end">
                      <div className="text-xs p-3 max-w-56">
                        <p className="text-gray-600">
                          answered {answer.creationTime.toLocaleString()}
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
    </section>
  );
}
