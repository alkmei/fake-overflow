import { Link, useSearchParams } from "react-router-dom";

export default function PageButtons({ totalPages }: { totalPages: number }) {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const generateUrlWithSearchParam = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    return url.toString();
  };

  const startPage =
    page == totalPages - 3
      ? totalPages - 4
      : page == 4
        ? 1
        : Math.min(Math.max(1, page - 2), totalPages - 4);
  const endPage = Math.min(totalPages, startPage + 4);

  return (
    <ol className="flex gap-1 text-sm p-8 items-center justify-center">
      {page > 1 && (
        <li>
          <Link
            to={generateUrlWithSearchParam(page - 1)}
            className="border p-2 rounded hover:bg-gray-200"
          >
            Prev
          </Link>
        </li>
      )}
      {startPage > 1 && (
        <li>
          <Link
            to={generateUrlWithSearchParam(1)}
            className="border p-2 rounded hover:bg-gray-200"
          >
            1
          </Link>
        </li>
      )}
      {startPage > 2 && <li className="p-2">…</li>}
      {[...Array(endPage - startPage + 1)].map((_, i) => (
        <li key={startPage + i}>
          <Link
            to={generateUrlWithSearchParam(startPage + i)}
            className={`border p-2 rounded ${
              startPage + i === page
                ? "bg-[#e7700d] text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {startPage + i}
          </Link>
        </li>
      ))}
      {endPage < totalPages - 1 && <li className="p-2">…</li>}
      {endPage < totalPages && (
        <li>
          <Link
            to={generateUrlWithSearchParam(totalPages)}
            className="border p-2 rounded hover:bg-gray-200"
          >
            {totalPages}
          </Link>
        </li>
      )}
      {page < totalPages && (
        <li>
          <Link
            to={generateUrlWithSearchParam(page + 1)}
            className="border p-2 rounded hover:bg-gray-200"
          >
            Next
          </Link>
        </li>
      )}
    </ol>
  );
}
