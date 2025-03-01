import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Ellipsis } from "lucide-react";
import { formatPrice } from "@/utils";
import { customFetch } from "@/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { SingleProductManagementLoader } from "@/loaders/SingleProductManagementLoader";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Section } from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { QueryError } from "@/error";
import { useSelector } from "react-redux";

import { queryClient } from "@/utils/queryClient";
import { AlertDialogComponent } from "@/components/ui/alert-dialog-component";
import { EditProduct } from "@/components/From/products-data-from";

const singleProductQuery = (id) => ({
  queryKey: ["product", id],
  queryFn: async () => {
    const response = await customFetch.get(`/laptop/${id}`);
    if (!response.data) {
      throw new Error("No data received from the server");
    }
    return response.data.laptop;
  },
});

function SingleProductManagement() {
  const token = useSelector((state) => state.userReducer.token);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const { id } = useParams();
  const { data, isError, isLoading, isRefetching, refetch } = useQuery(
    singleProductQuery(id),
  );

  const laptop = data;

  if (isLoading || isRefetching) {
    return <SingleProductManagementLoader />;
  }

  if (isError) {
    return <QueryError refetch={refetch} />;
  }

  if (!laptop) {
    return (
      <section className="mt-20 flex w-full flex-col items-center justify-center">
        <div className="text-xl">No product data found.</div>
        <Button variant="link" onClick={() => navigate(-1)}>
          {" "}
          {"<"} Go back
        </Button>
      </section>
    );
  }

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDelete = async () => {
    console.log("delete");
    try {
      const response = await customFetch.delete(`/laptop/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      queryClient.invalidateQueries(["product", id]);
      queryClient.invalidateQueries(["product"]);
      navigate("/user-dashboard/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <Section title={laptop.model} description={laptop.description} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Product Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleEdit}>
                Edit Product
              </DropdownMenuItem>
              <AlertDialogComponent
                setAlertReturn={(alertConfirmed) => {
                  if (alertConfirmed) {
                    handleDelete();
                  }
                }}
                alertTitle="Are you sure?"
                alertDescription={`This will permanently delete the product "${laptop.model}" from the system.`}
              >
                <DropdownMenuItem
                  className="text-red-600"
                  onSelect={(e) => e.preventDefault()} // Prevent dropdown from closing
                >
                  Delete Product
                </DropdownMenuItem>
              </AlertDialogComponent>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Separator className="mb-5" />
      </div>
      {editMode ? (
        <EditProduct setEditMode={setEditMode} laptop={laptop} />
      ) : (
        <Product laptop={laptop} />
        
      )}
    </div>
  );
}

function Product({ laptop }) {
  const {
    processor,
    RamSize,
    RamType,
    RamSpeed,
    GPU,
    storage,
    displaySize,
    displayQuality,
    displayType,
  } = laptop.specs;

  return (
    <section className="mt-5 flex gap-5 max-sm:flex-col">
      <Carousel className="sm:w-2/3">
        <CarouselContent>
          {laptop.images.map((imgs, index) => (
            <CarouselItem key={index}>
              <img
                src={imgs} // Use the actual image URL from the data
                alt={laptop.model}
                className="aspect-square h-full w-full object-cover object-center"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex w-full flex-col gap-5">
        <div>
          <div className="flex justify-between">
            <div className="title">
              <CardTitle>{laptop.model}</CardTitle>
              <CardDescription>{laptop.category}</CardDescription>
            </div>
            <CardTitle>{formatPrice(laptop.price)}</CardTitle>
          </div>
        </div>
        <Table>
          <TableCaption>{laptop.description}</TableCaption>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold uppercase">CPU</TableCell>
              <TableCell>{processor}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold uppercase">Storage</TableCell>
              <TableCell>{storage} GB</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold uppercase">RAM</TableCell>
              <TableCell>
                {RamSize} GB - {RamType} {RamSpeed}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold uppercase">GPU</TableCell>
              <TableCell>{GPU}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold uppercase">Screen</TableCell>
              <TableCell>
                {displaySize}" - {displayType} {displayQuality}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

export default SingleProductManagement;
