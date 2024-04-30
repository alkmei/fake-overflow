import { Link } from "react-router-dom";
import SortButtons from "@/components/SortButtons.tsx";

export default function ContentHeader({
  name,
  questionCount,
}: {
  name: string;
  questionCount: number;
}) {
  return (
    <div className="border-b p-8 pb-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className=" text-2xl">{name}</h1>
        <Link
          to="/questions/ask"
          className="bg-blue-500 p-2 text-white rounded hover:bg-blue-600"
        >
          Ask Question
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <div>
          {questionCount} {questionCount === 1 ? "question" : "questions"}
        </div>
        <SortButtons />
      </div>
    </div>
  );
}
