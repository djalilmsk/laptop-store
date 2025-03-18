"use client";

import * as React from "react";
import { RxCross2 } from "react-icons/rx";
import {
  Form,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SelectionFilters } from "../customerData/Inputs";
import { category, brand, sort } from "@/json/filters.json";
import { mergeQueryParams } from "@/utils";
import { Slider } from "../ui/slider";

export function FiltersForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const defaultCategory = searchParams.get("category") || "";
  const defaultModel = searchParams.get("brand") || "";
  const defaultPriceSort = searchParams.get("sort") || "";
  const defaultMaxPrice = +searchParams.get("maxPrice") || 750;

  const [maxValue, setMaxValue] = React.useState(defaultMaxPrice);

  const handleSliderChange = (value) => {
    setMaxValue(value[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = {
      category: formData.get("category") || "none",
      brand: formData.get("brand") || "none",
      sort: formData.get("sort") || "none",
      maxPrice: formData.get("maxPrice") || "none",
      minPrice: "500",
    };
    navigate(mergeQueryParams(filters));
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">Use Filters</Button>
      </DrawerTrigger>
      <DrawerContent>
        <form onSubmit={handleSubmit}>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <DrawerTitle>Customize Your Filters</DrawerTitle>
                  <DrawerDescription></DrawerDescription>
                </div>
                <DrawerClose asChild>
                  <RxCross2 className="h-6 w-6 cursor-pointer" />
                </DrawerClose>
              </div>
            </DrawerHeader>
            <div className="flex flex-col gap-3 p-4 pb-0">
              <div className="mb-1">
                <div className="mb-2 flex justify-between">
                  <p className="text-lg">
                    <span className="text-xs font-normal uppercase text-muted-foreground">
                      Min Price
                    </span>{" "}
                    500
                  </p>
                  <p className="text-lg">
                    <span className="text-xs font-normal uppercase text-muted-foreground">
                      Max Price
                    </span>{" "}
                    {maxValue}
                  </p>
                </div>
                <Slider
                  defaultValue={[defaultMaxPrice]}
                  value={[maxValue]}
                  name="maxPrice"
                  max={1000000}
                  min={500}
                  step={1}
                  onValueChange={handleSliderChange}
                />
              </div>
              <SelectionFilters
                name="category"
                placeholder="Category"
                array={category}
                defaultValue={defaultCategory}
              />
              <SelectionFilters
                name="brand"
                placeholder="Brand"
                array={brand}
                defaultValue={defaultModel}
              />
              <SelectionFilters
                name="sort"
                placeholder="Price Sort"
                array={sort}
                defaultValue={defaultPriceSort}
              />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button type="submit">Apply Filter</Button>
              </DrawerClose>
              <Link to="/products">
                <DrawerClose asChild>
                  <Button className="w-full" variant="outline" type="button">
                    Remove Filters
                  </Button>
                </DrawerClose>
              </Link>
            </DrawerFooter>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
}