import Orders from "@/components/order/Orders";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QueryError } from "@/error";
import { OrdersLoader } from "@/loaders/orders-loader";
import { customFetch, formatPrice } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const ordersQuery = (ordersId) => {
  return {
    queryKey: ["orders", ordersId],
    queryFn: async () => {
      if (!ordersId?.length) return [];
      const responses = await Promise.all(
        ordersId.map((orderId) => customFetch(`Orders/${orderId}`)),
      );
      return responses.map((response) => response.data);
    },
  };
};

function OrdersPage() {
  const ordersId = useSelector(
    (state) => state.orderReducer?.data?.orders || [],
  );

  const {
    data: order,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useQuery(ordersQuery(ordersId));

  if (isLoading || isRefetching) {
    return <OrdersLoader />;
  }

  if (isError) {
    return <QueryError refetch={refetch} />;
  }

  const orders = {
    head: ["ID", "Date", "Products List", "Total", "Status"],
    rows: order || [],
  };

  return (
    <div>
      <div className="my-5 flex items-center justify-center text-xl font-semibold uppercase">
        The list of your orders
      </div>
      <div className="overflow-auto2 w-full">
        <div className="rounded-lg border">
          <Table className="min-w-full table-auto">
            <TableHeader>
              <TableRow>
                {orders.head.map((item, index) => (
                  <TableHead key={index}>{item}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.rows.length ? (
                orders.rows.map((order, index) => (
                  <OrderRow key={index} order={order.Order} />
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={orders.head.length || 4}
                    className="h-24 text-center"
                  >
                    No order available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <Table>
          <TableCaption className="flex w-full justify-center">
            A list of your orders.
          </TableCaption>
        </Table>
      </div>
    </div>
  );
}

// OrderRow component to render each order row
function OrderRow({ order }) {
  return (
    <TableRow>
      <TableCell className="max-w-32 overflow-x-auto text-nowrap">
        {order.id}
      </TableCell>
      <TableCell className="max-w-32 overflow-x-auto text-nowrap">
        {new Date(order.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </TableCell>
      <TableCell className="max-w-48 overflow-x-auto text-nowrap">
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span className="w-1/2 overflow-x-hidden">{item.model}</span>
            <span>{formatPrice(+item.price)}</span>
          </div>
        ))}
      </TableCell>
      <TableCell className="max-w-32 overflow-x-auto text-nowrap">
        {formatPrice(+order.total_amount)}
      </TableCell>
      <TableCell className="max-w-32 overflow-x-auto text-nowrap">
        <Badge
          variant={
            (order.status === "canceled" && "destructive") ||
            (order.status === "in review" && "outline") ||
            (order.status === "shipping" && "secondary") ||
            (order.status === "delivered" && "default")
          }
        >
          {order.status}
        </Badge>
      </TableCell>
    </TableRow>
  );
}

export default OrdersPage;
