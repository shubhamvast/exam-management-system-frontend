import { useRouteError } from "react-router-dom";
export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="h-screen w-full error-page flex flex-col justify-center items-center ">
      <h1 className=" text-3xl text-red-500">
        {error.status + " " + error.statusText}
      </h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
}
