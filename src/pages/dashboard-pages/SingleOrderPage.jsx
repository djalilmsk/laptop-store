import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { singleOrder } from "@/json/Order.json";
import { formatPrice } from "@/utils";
import { Ellipsis } from "lucide-react";
import { useParams } from "react-router-dom";
import React from "react";

// Reusable TableRowItem component
const TableRowItem = ({ label, value }) => (
  <TableRow>
    <TableCell className="w-1/3 text-nowrap py-2 pl-0 font-semibold uppercase text-muted-foreground">
      {label}:
    </TableCell>
    <TableCell className="w-2/3 text-nowrap py-2 text-end">{value}</TableCell>
  </TableRow>
);

// Mapping for badge variants
const badgeVariantMap = {
  canceled: "destructive",
  "in review": "outline",
  shipping: "secondary",
  delivered: "default",
};

// Customer Details Card
const CustomerDetailsCard = ({ customer }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>Customer Details</CardTitle>
      <CardDescription>Data entered by the customer</CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableBody>
          <TableRowItem label="Name" value={customer.full_name} />
          <TableRowItem label="Phone" value={customer.phone_number} />
          <TableRowItem label="Address" value={customer.address} />
          <TableRowItem label="Wilaya" value={customer.wilaya} />
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

// Order Details Card
const OrderDetailsCard = ({ order }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>Order Details</CardTitle>
      <CardDescription>Quick order summary details</CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableBody>
          <TableRowItem label="Total Products" value={order.items.length} />
          <TableRowItem label="Shipping To" value={order.shipping.wilaya} />
          <TableRowItem
            label="Shipping Method"
            value={order.shipping.shipping_method}
          />
          <TableRowItem
            label="Total Price"
            value={formatPrice(+order.total_amount)}
          />
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

// Items Table
const ItemsTable = ({ items }) => (
  <div className="w-full overflow-x-auto md:col-span-2">
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {"Image Name Category Price".split(" ").map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length ? (
            items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <img
                    src={item.image || "/placeholder-image.jpg"}
                    alt={item.model}
                    className="h-16 w-16 rounded-lg object-cover object-center"
                  />
                </TableCell>
                <TableCell className="text-nowrap">{item.model}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{formatPrice(item.price)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No items found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  </div>
);

function SingleOrderPage() {
  const { id } = useParams();
  const order = singleOrder.find((order) => order.id === id);
  const [status, setStatus] = React.useState(order.status);

  if (!order) {
    return <div>Order not found</div>;
  }

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    // Here you can add logic to update the order status in your backend or state management
    console.log(`Order status updated to: ${newStatus}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="items-top flex gap-3">
          <Section
            className="p-0"
            title={`Order ID: ${id}`}
            description={new Date(order.date).toLocaleString()}
          />
          <Badge className="mt-6 h-5" variant={badgeVariantMap[status]}>
            {status}
          </Badge>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Order Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={status} onValueChange={handleStatusChange}>
              <DropdownMenuRadioItem value="in review">
                In Review
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="shipping">
                Shipping
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="canceled">
                Canceled
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="delivered">
                Delivered
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Items</DropdownMenuItem>
            <DropdownMenuItem>Edit Shipping</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Delete Order</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator className="mb-5" />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <CustomerDetailsCard customer={order.customer} />
        <OrderDetailsCard order={order} />
        <ItemsTable items={order.items} />
      </div>
    </div>
  );
}

export default SingleOrderPage;