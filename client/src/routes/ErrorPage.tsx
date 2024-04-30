import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Navbar from "@/components/Navbar.tsx";
import { IconAlertTriangle } from "@tabler/icons-react";

export default function ErrorPage() {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center bg-gray-50 gap-4">
        <IconAlertTriangle width={128} height={128} />
        <div className="h-screen flex items-start flex-col justify-center gap-2">
          <h1 className="text-6xl">Sorry</h1>
          <p>An unexpected error has occurred</p>
          <p>
            Error: <span className="text-red-500">{errorMessage}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
