import { Skeleton } from "@/components/ui/skeleton";

export function ProductsManagementLoader() {
  return (
    <div className="pt-5">
      <Skeleton className={"mb-2 h-5 w-full sm:w-2/3"} />
      <Skeleton className={"mb-9 h-2 w-full sm:w-2/3"} />
      <div className="mt-10 flex justify-between gap-3">
        <Skeleton className={"h-10 w-2/3 sm:w-1/3"} />
        <Skeleton className={"h-10 w-1/3 sm:w-1/6"} />
      </div>
      <div className="mt-5">
        <div className="w-full overflow-auto">
          <div className="flex w-full flex-col gap-2 rounded-lg">
            {[...Array(5)].map((_, rowIndex) => (
              <div
                className="w-full border-0 hover:bg-background"
                key={rowIndex}
              >
                <Skeleton className="h-40 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
