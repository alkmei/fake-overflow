import { Link, useParams } from "react-router-dom";
import { tags, tempQuestions, user } from "@/TempData.ts";
import { timeSinceDate } from "@/helper.ts";
import TagList from "@/components/TagList.tsx";
import QuestionList from "@/components/questions/QuestionList.tsx";
import { IconEdit, IconX } from "@tabler/icons-react";

export default function Profile() {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="flex flex-col gap-5 m-10 ml-10 w-full">
      <div className="flex justify-between mb-2">
        <div className="flex flex-col gap-3">
          <h2 className="text-4xl">{user.username}</h2>
          <p className="text-gray-500">
            Member since {timeSinceDate(user.creationTime)}
          </p>
        </div>
        <div className="">
          <h3 className="text-gray-400 text-sm font-bold">REPUTATION</h3>
          <p className="text-3xl">{user.reputation}</p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl mb-5">Questions</h2>
        <ul className="flex flex-col gap-2">
          {tempQuestions.map((q, index) => (
            <div className="flex flex-col">
              <div className="flex flex-row justify-between border p-4 rounded-md">
                <h3 className="text-blue-600 hover:text-blue-900 break-all mb-0.5 self-center">
                  <Link
                    to={`/questions/${q.id}/${q.title
                      .toLowerCase()
                      .replace(/[^\w ]+/g, "")
                      .replace(/ +/g, "-")}`}
                    key={index}
                  >
                    {q.title}
                  </Link>
                </h3>
                <div className="flex flex-row gap-2">
                  <button className="rounded-full border w-7 h-7 flex justify-center items-center hover:bg-[#fbdbc0]">
                    <IconEdit width={16} height={16} />
                  </button>
                  <button className="rounded-full border w-7 h-7 flex justify-center items-center hover:bg-red-200">
                    <IconX width={16} height={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl mb-5">Created Tags</h2>
        {/* TODO: Replace with tags created by user*/}
        <TagList tags={tags} />
      </div>
      <div>
        <h2 className="text-2xl mb-5">Answered Questions</h2>
        {/*
          TODO: Replace with questions answered by user
           if a question answered by user is clicked, Their answer/s for
           the question is displayed first followed by the rest in Newest order
        */}
        <QuestionList questions={tempQuestions} />
      </div>
    </div>
  );
}
