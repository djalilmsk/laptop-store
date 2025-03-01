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
import { formatPrice } from "@/utils";
import { formatNumber } from "libphonenumber-js";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Orders({
  section,
  orders = { head: ["Model", "Price", "Phone", "Wilaya"], rows: [] },
}) {
  const navigate = useNavigate();
  return (
    <div>
      <Section
        title={section?.title || "Customers Orders"}
        description={
          section?.description ||
          "Displays a list of recent orders placed by customer."
        }
      />
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
                  <TableRow
                    key={index}
                    onClick={() => {
                      navigate(`/user-dashboard/orders/${order.id}`);
                    }}
                    className="cursor-pointer"
                  >
                    <TableCell className="max-w-32 overflow-x-auto text-nowrap hover:underline">
                      {order.productModel}
                    </TableCell>
                    <TableCell className="max-w-32 overflow-x-auto text-nowrap">
                      {formatPrice(+order.price)}
                    </TableCell>
                    <TableCell className="max-w-32 overflow-x-auto text-nowrap">
                      {formatNumber(order.customerPhone, "INTERNATIONAL")}
                    </TableCell>
                    <TableCell className="max-w-32 overflow-x-auto text-nowrap">
                      {order.wilaya}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={orders.head.length || 4}
                    className="h-24 text-center"
                  >
                    no order available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <Table>
          <TableCaption className="flex w-full justify-center">
            {section?.footer || "A list of your recent orders."}
          </TableCaption>
        </Table>
      </div>
    </div>
  );
}

export default Orders;
