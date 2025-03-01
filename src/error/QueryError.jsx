import { Button } from "@/components/ui/button";

function QueryError({ refetch }) {
  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <div className="text-center uppercase sm:text-3xl">
        <span className="text-muted-foreground">Unknown Error</span> <br />{" "}
        <div className="mb-5 text-3xl sm:text-5xl">
          An unknown error occurred
        </div>
      </div>
      <Button onClick={refetch}>Retry</Button>
    </div>
  );
}

export default QueryError;
