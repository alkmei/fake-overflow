import { Link } from "react-router-dom";

export default function TagName({ name }: { name: string }) {
  return (
    <li>
      <Link
        to={`/questions/tagged/${name}`}
        className="text-sm bg-blue-100 text-blue-900 py-0.5 px-2 rounded-md cursor-pointer transition duration-300 hover:bg-blue-200"
      >
        {name}
      </Link>
    </li>
  );
}
