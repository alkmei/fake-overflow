import { Link, useParams } from "react-router-dom";
import { sluggify, timeSinceDate } from "@/helper.ts";
import TagList from "@/components/TagList.tsx";
import QuestionList from "@/components/questions/QuestionList.tsx";
import { IconEdit, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import axios from "axios";
import User from "@server/types/user";
import { tempQuestions } from "@/TempData.ts";
import Question from "@server/types/question";
import Tag from "@server/types/tag";

export default function Profile() {
  const [user, setUser] = useState<User>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<Question[]>([]);
  const [userTags, setUserTags] = useState<Tag[]>([]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log("Error fetching user:", err);
      });
  }, [id]);

  useEffect(() => {
    // Get questions posted by user
    axios
      .get(`http://localhost:8000/api/users/${user?.id}/questions`)
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log("Error fetching questions posted by user", err);
      });

    // Get tags created by user
    axios
      .get(`http://localhost:8000/api/users/${user?.id}/tags`)
      .then((res) => {
        setUserTags(res.data);
      })
      .catch((err) => {
        console.log("Error fetching tags created by user", err);
      });

    // Get questions answered by user
    axios
      .get(`http://localhost:8000/api/users/${user?.id}/questions-answered`)
      .then((res) => {
        setAnsweredQuestions(res.data);
      })
      .catch((err) => {
        console.log("Error fetching questions answered by user", err);
      });
  }, [user]);

  if (user === undefined) return <p>User Not Found...</p>;

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
        <ul className="flex flex-col gap-2 ml-3">
          {questions.map((q, index) => (
            <div className="flex flex-col" key={index}>
              <div className="flex flex-row justify-between border p-4 rounded-md">
                <h3 className="text-blue-600 hover:text-blue-900 break-all mb-0.5 self-center">
                  <Link to={`/questions/${q.id}/${sluggify(q.title)}`}>
                    {q.title}
                  </Link>
                </h3>
                <div className="flex flex-row gap-2">
                  <Link
                    to={`/questions/edit/${q.id}`}
                    className="rounded-full border w-7 h-7 flex justify-center items-center hover:bg-[#fbdbc0]"
                  >
                    <IconEdit width={16} height={16} />
                  </Link>
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
        <TagList tags={userTags} />
      </div>
      <div>
        <h2 className="text-2xl mb-5">Answered Questions</h2>
        {/*
          TODO: Replace with questions answered by user
           if a question answered by user is clicked, Their answer/s for
           the question is displayed first followed by the rest in Newest order
        */}
        <QuestionList questions={tempQuestions} fromProfile={true} />
      </div>
    </div>
  );
}
