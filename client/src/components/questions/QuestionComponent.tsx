import { timeSinceDate } from "@/helper";
import { Link } from "react-router-dom";
import Question from "@server/types/question";
import TagComponent from "@/components/TagComponent.tsx";

export default function QuestionComponent({
  question,
}: {
  question: Question;
}) {
  question.creationTime = new Date(question.creationTime);

  return (
    <li className="flex justify-between items-start gap-5 text-base border-b py-4">
      <div className="flex flex-col text-right pl-5 text-sm gap-1">
        <p className="whitespace-nowrap w-24">{question.votes} votes</p>
        <p className="whitespace-nowrap w-24">
          <span
            className={
              question.answers.length > 0
                ? "border border-green-600 rounded py-0.5 px-1 text-green-600"
                : ""
            }
          >
            {question.answers.length} answers
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
              {question.author.username}
            </Link>
            <span className="whitespace-nowrap">
              asked {timeSinceDate(question.creationTime)}
            </span>
          </p>
        </div>
      </div>
    </li>
  );
}
