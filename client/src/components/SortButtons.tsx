import { Link, useSearchParams } from "react-router-dom";

export default function SortButtons() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const newestClass = tab == null || tab == "newest" ? "bg-gray-200" : "";
  const activeClass = tab == "active" ? "bg-gray-200" : "";
  const unansweredClass = tab == "unanswered" ? "bg-gray-200" : "";

  return (
    <div className="rounded p-2 border flex gap-2">
      <Link
        to="?tab=newest"
        className={"rounded hover:bg-gray-200 p-1".concat(" ", newestClass)}
      >
        Newest
      </Link>
      <Link
        to="?tab=active"
        className={"rounded hover:bg-gray-200 p-1".concat(" ", activeClass)}
      >
        Active
      </Link>
      <Link
        to="?tab=unanswered"
        className={"rounded hover:bg-gray-200 p-1".concat(" ", unansweredClass)}
      >
        Unanswered
      </Link>
    </div>
  );
}
