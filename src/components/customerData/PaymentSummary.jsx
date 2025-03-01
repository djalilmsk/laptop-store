import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatPrice } from "@/utils";

import { GoDotFill } from "react-icons/go";
import { Dot } from "lucide-react";

function PaymentSummary({ children }) {
  const cart = useSelector((state) => state.cartReducer);
  const { total, shipping, quantity, cartItems } = cart;

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Payment Summary</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2} className="p-0 font-medium">
                <Accordion
                  type="single"
                  defaultValue="item-1"
                  className="boarder-0"
                  collapsible
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger chevronDown={false} className="px-4">
                      Total Products <span>{quantity}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <Table>
                        <TableBody>
                          {cartItems.map((item) => {
                            return (
                              <TableRow key={item._id} className="">
                                <TableCell className="flex w-full items-center gap-1 px-0 py-2 text-gray-500">
                                  <GoDotFill />

                                  <Link
                                    to={`/products/${item._id}`}
                                    className="flex w-full items-center justify-between"
                                  >
                                    <p>{item.model}</p>
                                    <p>{formatPrice(item.price)}</p>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Order Price</TableCell>
              <TableCell className="text-right">{formatPrice(total)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Shipping</TableCell>
              <TableCell className="text-right">
                {formatPrice(shipping)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xl font-bold">Total Price</TableCell>
              <TableCell className="text-right text-xl">
                {formatPrice(total + shipping)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">{children}</CardFooter>
    </Card>
  );
}

export default PaymentSummary;
