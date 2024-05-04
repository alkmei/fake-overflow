import { Link } from "react-router-dom";
import Tag from "@server/types/tag";
import { useEffect, useState } from "react";
import axios from "axios";
import Question from "@server/types/question";

type TagQuestionsMap = { [key: string]: Question[] };

export default function TagList({ tags }: { tags: Tag[] }) {
  const [tagQuestions, setTagQuestions] = useState<TagQuestionsMap>();
  useEffect(() => {
    const fetchTagQuestions = async () => {
      const tagQuestionsData: TagQuestionsMap = {};
      for (const tag of tags) {
        const res = await axios.get(
          `http://localhost:8000/api/tags/${tag.name}/questions`,
        );
        tagQuestionsData[tag.name] = res.data;
      }
      setTagQuestions(tagQuestionsData);
    };

    fetchTagQuestions().then();
  }, [tags]);
  console.log(tagQuestions);
  if (!tagQuestions) return <p>Page Loading...</p>;

  return (
    <ul className="flex flex-wrap gap-6 m-5">
      {tags.map((t, index) => (
        <Link
          className="border p-4 w-60 rounded-md hover:bg-gray-100"
          to={`/questions/tagged/${t.name}`}
          key={index}
        >
          <section className="flex-grow text-sm bg-blue-100 text-blue-900 py-0.5 px-2 rounded-md cursor-pointer w-fit">
            {t.name}
          </section>
          <p className="mt-3 text-sm text-gray-500">
            <span>{tagQuestions[t.name]?.length || 0}&nbsp;</span>
            question
            {(tagQuestions[t.name]?.length || 0) > 1 ? "s" : ""}
          </p>
        </Link>
      ))}
    </ul>
  );
}
