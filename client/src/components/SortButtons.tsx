import { Link, useSearchParams } from "react-router-dom";

export default function SortButtons() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const base = "rounded hover:bg-gray-200 p-1 text-sm";
  const active = " bg-gray-200 font-bold";

  return (
    <div className="rounded p-2 border flex gap-2">
      <Link
        to="?tab=newest"
        className={base.concat(tab == null || tab == "newest" ? active : "")}
        preventScrollReset={true}
      >
        Newest
      </Link>
      <Link
        to="?tab=active"
        className={base.concat(tab == "active" ? active : "")}
        preventScrollReset={true}
      >
        Active
      </Link>
      <Link
        to="?tab=unanswered"
        className={base.concat(tab == "unanswered" ? active : "")}
        preventScrollReset={true}
      >
        Unanswered
      </Link>
    </div>
  );
}
