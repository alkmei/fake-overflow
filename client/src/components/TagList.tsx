import { Link } from "react-router-dom";
import Tag from "@server/types/tag";

export default function TagList({ tags }: { tags: Tag[] }) {
  // TODO: request number of questions per tag
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
            {/*<span>{tags[t.name].length}&nbsp;</span>*/}604 questions
            {/*{tagQuestions[t.name].length > 1 ? "s" : ""}*/}
          </p>
        </Link>
      ))}
    </ul>
  );
}
