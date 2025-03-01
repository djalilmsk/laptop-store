import { useRouteError } from "react-router-dom";

function ErrorElement() {
  const error = useRouteError();
  console.log(error)

  return (
    <div>
      <h1>Oops!</h1>
      <p>Something went wrong.</p>
      <pre>{error?.message || "Unknown error occurred."}</pre>
    </div>
  );
}

export default ErrorElement;
