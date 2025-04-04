import { Skeleton } from "@/components/ui/skeleton";

export function SingleProductLoader() {
  return (
    <section className="flex gap-5 pt-10 max-sm:flex-col">
      <div className="sm:w-2/3">
        <Skeleton className="aspect-square h-2/3 w-full" />
      </div>

      <div className="flex w-full flex-col gap-5">
        <div>
          <div className="flex justify-between">
            <div className="title">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="mt-2 h-4 w-32" />
            </div>
            <Skeleton className="h-6 w-24" />{" "}
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-4 w-1/2" />
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex justify-between">
                <Skeleton className="h-4 w-24" />{" "}
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </section>
  );
}
