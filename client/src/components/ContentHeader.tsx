import { Link } from "react-router-dom";
import SortButtons from "@/components/SortButtons.tsx";
import { useAuthentication } from "@/helper.ts";

export default function ContentHeader({
  name,
  questionCount,
  noSort,
}: {
  name: string;
  questionCount?: number;
  noSort?: boolean;
}) {
  const { loggedIn } = useAuthentication();

  return (
    <div className="border-b p-8 pb-4 pr-0">
      <div className="flex justify-between items-center mb-2">
        <h1 className=" text-2xl">{name}</h1>
        {loggedIn && (
          <Link
            to="/questions/ask"
            className="bg-blue-500 p-2 text-white rounded hover:bg-blue-600"
          >
            Ask Question
          </Link>
        )}
      </div>
      <div className="flex justify-between items-center">
        {questionCount && (
          <div>
            {questionCount} {questionCount === 1 ? "question" : "questions"}
          </div>
        )}
        {!noSort && <SortButtons />}
      </div>
    </div>
  );
}
