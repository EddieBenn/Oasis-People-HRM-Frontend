import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="grid place-content-center h-screen">
      <h1 className="text-5xl font-semibold font-lexend text-center">Oops!</h1>
      <p className="font-lexend py-4">Sorry, an unexpected error has occurred.</p>
      <p className="text-center text-gray-500">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
