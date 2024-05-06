import { useSearchParams } from "react-router-dom";

export default function SortButtons() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const base = "rounded hover:bg-gray-200 p-1 text-sm";
  const active = " bg-gray-200 font-bold";

  const handleSort = (sort: string) => {
    setSearchParams((params) => {
      const query = new URLSearchParams(params);
      query.set("tab", sort);
      return query;
    });
  };

  return (
    <div className="rounded p-2 border flex gap-2">
      <button
        onClick={() => handleSort("newest")}
        className={base.concat(tab == null || tab == "newest" ? active : "")}
      >
        Newest
      </button>
      <button
        onClick={() => handleSort("active")}
        className={base.concat(tab == "active" ? active : "")}
      >
        Active
      </button>
      <button
        onClick={() => handleSort("unanswered")}
        className={base.concat(tab == "unanswered" ? active : "")}
      >
        Unanswered
      </button>
    </div>
  );
}
