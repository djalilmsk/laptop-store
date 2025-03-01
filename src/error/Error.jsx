import { Button } from "@/components/ui/button";
import { Link, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();

  const { name, message } =
    error.status !== 404
      ? { name: "Error 404", message: "page not found" }
      : { name: "Unknown Error", message: "An unknown error occurred" };

  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <div className="text-center uppercase sm:text-5xl">
        <span className="text-muted-foreground">{name}</span> <br />{" "}
        <div className="mb-5 text-4xl sm:text-7xl">{message}</div>
      </div>
      <Button>
        <Link to="/">Go back to home</Link>
      </Button>
    </div>
  );
}

export default Error;
