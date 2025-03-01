import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export function OrdersLoader() {
  return (
    <div className="my-5 flex flex-col items-center justify-center">
      <Skeleton className="mb-5 h-6 w-1/2 sm:w-1/3" />

      <div className="w-full overflow-auto">
        <div className="flex flex-col w-full gap-2 rounded-lg">
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
