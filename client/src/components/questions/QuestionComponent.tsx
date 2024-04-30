import React from "react";
import { timeSinceDate } from "@/helper.tsx";
import { Link } from "react-router-dom";
import { Question } from "@/components/questions/QuestionList.tsx";

export default function QuestionComponent({
  question,
}: {
  question: Question;
}) {
  const TagComponent = React.memo(({ name }: { name: string }) => (
    <li>
      <Link
        to="/tags"
        className="text-sm bg-blue-100 text-blue-900 py-0.5 px-2 rounded-md cursor-pointer transition duration-300 hover:bg-blue-200"
      >
        {name}
      </Link>
    </li>
  ));

  question.askDateTime = new Date(question.askDateTime);

  return (
    <li className="flex justify-between items-start gap-5 text-base border-b py-4">
      <div className="flex flex-col text-right pl-5 text-sm gap-1">
        <p className="whitespace-nowrap w-24">{question.votes} votes</p>
        <p className="whitespace-nowrap w-24">
          <span
            className={
              question.numAnswers > 0
                ? "border border-green-600 rounded py-0.5 px-1 text-green-600"
                : ""
            }
          >
            {question.numAnswers} answers
          </span>
        </p>
        <p className="whitespace-nowrap w-24">{question.views} views</p>
      </div>
      <div className="w-full">
        <h3 className="text-blue-600 hover:text-blue-900 break-all mb-0.5">
          <Link
            to={`${question.id}/${question.title
              .toLowerCase()
              .replace(/[^\w ]+/g, "")
              .replace(/ +/g, "-")}`}
          >
            {question.title}
          </Link>
        </h3>
        <p className="text-sm line-clamp-2 hyphens-auto mr-2 mb-2">
          {question.summary}
        </p>
        <div className="flex justify-between flex-wrap items-center">
          <ul className="flex flex-wrap gap-3" id={`${question.id}__tags`}>
            {question.tags.map((tag) => {
              return <TagComponent key={tag.id} name={tag.name} />;
            })}
          </ul>
          <p className="text-sm text-gray-500 flex justify-end ml-auto gap-1 max-w-[62rem]">
            <Link
              to="/users/"
              className="text-blue-600 hover:text-blue-900 truncate"
            >
              {question.askedBy}
            </Link>
            <span className="whitespace-nowrap">
              asked {timeSinceDate(question.askDateTime)}
            </span>
          </p>
        </div>
      </div>
    </li>
  );
}
