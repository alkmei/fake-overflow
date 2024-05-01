import AnswerComponent from "@/components/questions/AnswerComponent.tsx";
import PostText from "@/components/questions/PostText.tsx";
import { Link } from "react-router-dom";
import { tempQuestions } from "@/TempData.ts";
import QuestionHeader from "@/components/QuestionHeader.tsx";
import { IconCaretDownFilled, IconCaretUpFilled } from "@tabler/icons-react";
import TagComponent from "@/components/TagComponent.tsx";
import { timeSinceDate } from "@/helper.ts";

export default function Answers() {
  const questionId = new URLSearchParams(window.location.search).get("id");
  // TODO: show updated view count on answers page
  // temp hardcoded question for front end dev

  const question = tempQuestions[0];

  const answers = question.answers;

  if (questionId && Object.keys(question).length === 0)
    return <p>Page Loading...</p>;

  return (
    <section className="w-full p-6">
      <section className="w-full">
        <QuestionHeader question={question} />
      </section>
      <div className="grid gap-4 mt-4">
        <div className="flex flex-col gap-2 items-center col-[1]">
          <button className="rounded-full border w-10 h-10 flex justify-center items-center">
            <IconCaretUpFilled width={24} height={24} />
          </button>
          <div className="font-bold">4</div>
          <button className="rounded-full border w-10 h-10 flex justify-center items-center">
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
        <ol className="col-[2] border-t">
          {question.comments.map((comment) => (
            <li className="border-b py-1 text-sm">
              <span>{comment.text}</span> –{" "}
              <Link to={`/users`} className="text-blue-700">
                {comment.commentBy.username}
              </Link>
              <span className="text-gray-500">
                {" "}
                {timeSinceDate(comment.commentDateTime)}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="flex flex-col gap-3">
        <ul id="answer-list">
          {answers.map((answer, index) => (
            <div key={index}>
              <AnswerComponent answer={answer} />
            </div>
          ))}
        </ul>

        <Link to={`/new-answer?id=${questionId}`}>Answer Question</Link>
      </div>
    </section>
  );
}
