import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Added Input import
import { MoreHorizontal, ChevronDown, Plus } from "lucide-react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Section } from "@/components/ui/section";
import { customFetch, formatPrice } from "@/utils";
import { Separator } from "@/components/ui/separator";
import { ProductsManagementLoader } from "@/loaders/products-management-loader";

const productsQuery = (URL) => {
  return {
    queryKey: ["products"],
    queryFn: async () => {
      const response = await customFetch.get(URL);
      if (!response.data) {
        throw new Error("No data received from the server");
      }
      return response.data;
    },
  };
};

function ProductsManagement() {
  const navigate = useNavigate();
  const URL = `/laptop`;

  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = useState([]); // Added for filtering

  const {
    data: productsData,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useQuery(productsQuery(URL));

  const columns = [
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => (
        <div
          onClick={() =>
            navigate(`/user-dashboard/products/${row.original._id}`)
          }
          className="aspect-square h-24 max-w-32 overflow-hidden"
        >
          <img
            className="aspect-square rounded object-cover"
            src={row.original.images[0]}
            alt={row.original.model}
          />
        </div>
      ),
      enableHiding: true,
    },
    {
      accessorKey: "model",
      header: "Model",
      cell: ({ row }) => (
        <div
          onClick={() =>
            navigate(`/user-dashboard/products/${row.original._id}`)
          }
          className="max-w-32 cursor-pointer overflow-x-auto text-nowrap hover:underline"
        >
          {row.getValue("model")}
        </div>
      ),
      enableHiding: true,
      filterFn: "includesString",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <div className="max-w-32 overflow-x-auto text-nowrap">
          {row.getValue("category")}
        </div>
      ),
      enableHiding: true,
    },
    {
      accessorKey: "quantitySold",
      header: "Solds",
      cell: ({ row }) => (
        <div className="max-w-32 overflow-x-auto text-nowrap">
          {row.getValue("quantitySold")}
        </div>
      ),
      enableHiding: true,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <div className="max-w-32 overflow-x-auto text-nowrap">
          {formatPrice(+row.getValue("price"))}
        </div>
      ),
      enableHiding: true,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigate(`/products/${product._id}`)}
              >
                View product
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(product._id)}
              >
                Copy product ID
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableHiding: false,
    },
  ];

  const table = useReactTable({
    data: productsData?.Laptops || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // Added for filtering
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters, // Added for filter state management
    state: {
      columnVisibility,
      columnFilters, // Added to table state
    },
  });

  if (isLoading || isRefetching) {
    return <ProductsManagementLoader />;
  }

  if (isError) {
    return (
      <div>
        Error fetching products. <button onClick={refetch}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <Section
          title={"Your Products"}
          description={"Displays a list of your store products."}
        />
        <Link to={"/user-dashboard/new-product"}>
          <Button size="icon" variant="ghost">
            <Plus />
          </Button>
        </Link>
      </div>
      <Separator />
      <div className="w-full">
        <div className="flex items-center gap-4 py-4">
          <Input
            placeholder="Search by model..."
            value={table.getColumn("model")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("model")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.header}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No products available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="py-4 text-center text-sm text-muted-foreground">
          A list of your store products.
        </div>
      </div>
    </div>
  );
}

export default ProductsManagement;
