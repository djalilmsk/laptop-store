import { getQueryParams } from "@/pages/Products";
import ProductCard from "./ProductCard";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
// import { laptops } from "@/json/laptops.json";

function ProductsGrid({ laptops }) {
  const params = getQueryParams();

  if (!laptops.length) {
    if (params[1].length) {
      return (
        <div className="flex flex-col items-center justify-center gap-3 py-10">
          No laptops found in the store with this Features.
          <Button variant={"link"}>
            <Link to="/products" className="flex justify-center items-end gap-2">
              <X />
              Remove the Filters
            </Link>
          </Button>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center py-10">
        There are no laptops in the store.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {laptops.map((laptop) => (
        <ProductCard key={laptop._id} laptop={laptop} />
      ))}
    </div>
  );
}

export default ProductsGrid;
