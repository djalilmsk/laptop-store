import { Filters, PaginationCom, ProductsGrid } from "@/components";
import { QueryError } from "@/error";
import { ProductsLoader } from "@/loaders/products-loader";
import { customFetch } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const productsQuery = (URL, params) => {
  return {
    queryKey: ["products", ...params],
    queryFn: async () => {
      const response = await customFetch.get(URL);
      if (!response.data) {
        throw new Error("No data received from the server");
      }
      return response.data;
    },
  };
};

export function getQueryParams() {
  const [searchParams] = useSearchParams();

  const category =
    searchParams.get("category") === "none" || !searchParams.get("category")
      ? ""
      : `category=${searchParams.get("category")}`;
  const search = !searchParams.get("search")
    ? ""
    : `search=${searchParams.get("search")}`;
  const brand =
    searchParams.get("brand") === "none" || !searchParams.get("brand")
      ? ""
      : `brand=${searchParams.get("brand")}`;
  const sort =
    searchParams.get("sort") === "none" || !searchParams.get("sort")
      ? ""
      : `sort=${searchParams.get("sort")}`;
  const maxPrice =
    searchParams.get("maxPrice") === "none" || !searchParams.get("maxPrice")
      ? ""
      : `maxPrice=${searchParams.get("maxPrice")}`;
  const minPrice =
    searchParams.get("minPrice") === "none" || !searchParams.get("minPrice")
      ? ""
      : `minPrice=${searchParams.get("minPrice")}`;

  const params = [category, brand, sort, maxPrice, minPrice, search]
    .filter((param) => param !== "")
    .join("&");

  return params
    ? [`?${params}`, [category, brand, sort, maxPrice, minPrice, search]]
    : ["", []];
}

function Products() {
  const [searchParams] = useSearchParams();

  const params = getQueryParams();

  const URL = `/laptop${params[0]}`;

  const {
    data: productsData,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useQuery(productsQuery(URL, params[1]));

  if (isLoading || isRefetching) {
    return <ProductsLoader />;
  }

  if (isError) {
    return <QueryError refetch={refetch} />;
  }

  const laptops = Array.isArray(productsData?.Laptops)
    ? productsData.Laptops
    : [];

  return (
    <section className="mt-5 grid gap-3">
      <Filters />
      <ProductsGrid laptops={laptops} />
      {/* <PaginationCom /> */}
    </section>
  );
}

export default Products;
