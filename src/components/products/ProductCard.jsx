import { Link } from "react-router-dom";
import { Card, CardDescription, CardFooter, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { MdAddShoppingCart, MdShoppingCart } from "react-icons/md";
import { saveItem, saveItemWithStatus } from "@/features/reduxSlices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import img from "@/assets/dell_xps_13_front.jpg";
import { useState } from "react";

function SaveInCard({ laptop }) {
  const { savedItems } = useSelector((state) => state.cartReducer);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [isInCart, setIsInCart] = useState(() => {
    const item = savedItems.find((item) => item._id === laptop._id);
    return item ? true : false;
  });

  const handleAddToCard = () => {
    const { status, message } = dispatch(saveItemWithStatus(laptop));
    if (status === "Success") {
      setIsInCart(true);
    }

    toast({
      title: `${status}: ${message}`,
      duration: 1000,
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={handleAddToCard}
          className={`absolute bottom-2 right-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-3 py-3 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${isInCart ? "" : ""}`}
        >
          {isInCart ? <MdShoppingCart /> : <MdAddShoppingCart />}
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to Cart</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function ProductCard({ laptop }) {
  return (
    <div className="card transition-all duration-300 hover:-translate-y-1">
      <Card className="relative aspect-square bg-cover bg-center">
        <Link to={`/products/${laptop._id}`}>
          <img
            src={laptop.images[0]}
            alt={`${laptop.model} image`}
            className="h-full w-full rounded-lg object-cover object-center"
          />
        </Link>
        <SaveInCard laptop={laptop} />
        <div className="bg bg-opacity-50"></div>
      </Card>
      <CardFooter className="flex items-center justify-between p-1">
        <div className="flex w-full items-center justify-between">
          <div className="w-1/2">
            <Link to={`/products/${laptop._id}`} className="hover:underline">
              <CardTitle className="no-scrollbar z-10 overflow-x-auto text-nowrap text-xl max-sm:text-base">
                {laptop.model}
              </CardTitle>
            </Link>
            <CardDescription>{laptop.category}</CardDescription>
          </div>
          <div className="text-nowrap sm:text-xl text-sm font-semibold">
            {new Intl.NumberFormat("en").format(laptop.price.toFixed(2))}
            <span className="text-xs"> DZD</span>
          </div>
        </div>
      </CardFooter>
    </div>
  );
}

export default ProductCard;
