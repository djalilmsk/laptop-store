import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export function OrdersLoader({ isDashboard = false }) {
  const items = isDashboard ? "items-start" : "items-center";
  return (
    <div className={`my-5 flex flex-col justify-center ${items} `}>
      {isDashboard ? (
        <>
          <Skeleton className={"mb-2 h-5 w-full sm:w-2/3"} />
          <Skeleton className={"mb-7 h-2 w-full sm:w-2/3"} />
        </>
      ) : (
        <Skeleton className="mb-5 h-6 w-1/2 sm:w-1/3" />
      )}

      <div className="w-full overflow-auto">
        <div className="flex w-full flex-col gap-2 rounded-lg">
          {[...Array(5)].map((_, rowIndex) => (
            <div className="w-full border-0 hover:bg-background" key={rowIndex}>
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
