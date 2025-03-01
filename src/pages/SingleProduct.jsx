import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { formatPrice } from "@/utils";
import { customFetch } from "@/utils";
import {
  addItem,
  clearCart,
  saveItem,
  saveItemWithStatus,
} from "@/features/reduxSlices/cartSlice";
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
import { useToast } from "@/hooks/use-toast";
import { SingleProductLoader } from "@/loaders/single-product-loader";

import img from "@/assets/dell_xps_13_front.jpg";
import { QueryError } from "@/error";

const singleProductQuery = (id) => ({
  queryKey: ["product", id],
  queryFn: async () => {
    const response = await customFetch(`/laptop/${id}`);
    if (!response.data) {
      throw new Error("No data received from the server");
    }
    return response.data.laptop;
  },
});

function SingleProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isError, isLoading, isRefetching, refetch } = useQuery(
    singleProductQuery(id),
  );

  const laptop = data;

  const { savedItems } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [isInCart, setIsInCart] = useState(
    savedItems.some((item) => item._id === laptop?._id),
  );

  const handleCardSave = () => {
    const { status, message } = dispatch(saveItemWithStatus(laptop));
    if (status === "Success") {
      setIsInCart(true);
    }
    toast({
      title: `${status}: ${message}`,
      duration: 1000,
    });
  };

  const handleBuy = () => {
    dispatch(clearCart());
    dispatch(addItem(laptop));
    dispatch(saveItem(laptop));
  };

  if (isLoading || isRefetching) {
    return (
      <SingleProductLoader />
      // <section className="flex items-center justify-center pt-20">
      //   <div className="flex flex-col items-center justify-center">
      //     <div className="loader"></div>
      //     <div className="text-3xl uppercase text-muted-foreground">
      //       Loading
      //     </div>
      //   </div>
      // </section>
    );
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
    <section className="flex gap-5 pt-10 max-sm:flex-col">
      <Carousel className="sm:w-2/3">
        <CarouselContent>
          {laptop.images.map((imgs, index) => (
            <CarouselItem key={index}>
              <img
                src={imgs}
                alt={laptop.model}
                className="aspect-square h-full w-full object-cover object-center"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
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
            <TableRow className='hover:bg-background'>
              <TableCell colSpan={2}>
                <div className="flex gap-3">
                  <Link to="/checkout" className="w-full" onClick={handleBuy}>
                    <Button className="w-full">Buy Now</Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full p-0"
                    onClick={handleCardSave}
                  >
                    {isInCart ? (
                      <span className="flex items-center gap-2">
                        <Check /> Product Saved
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Plus />
                        Save In Card
                      </span>
                    )}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

export default SingleProduct;
