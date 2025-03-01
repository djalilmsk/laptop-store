// import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductsLoader() {
  // const [arraySize, setArraySize] = useState(3);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newSize = Math.floor(Math.random() * (9 - 3 + 1)) + 3;
  //     setArraySize(newSize);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <section className="mt-5 grid gap-3">
      <Skeleton className="h-[40px] w-full rounded-lg" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 9 }).map((_, index) => (
          <ProductCardLoader key={index} />
        ))}
      </div>
    </section>
  );
}

export function ProductCardLoader() {
  return (
    <div className="flex flex-col space-y-3">
      {/* Maintain a 1:1 aspect ratio for the image placeholder */}
      <div className="relative w-full pt-[100%]">
        <Skeleton className="absolute inset-0 h-full w-full rounded-lg" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}
