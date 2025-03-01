import Orders from "@/components/order/Orders";
import { Separator } from "@/components/ui/separator";

import { orders } from "@/json/Order.json";
import { customFetch } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const ordersQuery = (URL, token) => {
  return {
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await customFetch.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.data) {
        throw new Error("No data received from the server");
      }
      return response.data;
    },
  };
};

function CustomersOrders() {
  const token = useSelector((state) => state.userReducer.token);
  const URL = "/Orders/";
  const { data, isLoading, isError, isRefetching, refetch } = useQuery(
    ordersQuery(URL, token),
  );
  console.log(data);
  return (
    <div>
      <Orders orders={{ head: orders.head, rows: orders.rows.in_review }} />
    </div>
  );
}

export default CustomersOrders;

// const section = {
//   shipping: {
//     title: "Shipping Orders",
//     description:
//       "Displays a list of orders that need to be sent to customers.",
//     footer: "A list of your shipping Orders.",
//   },
//   delivered: {
//     title: "Delivered Orders",
//     description:
//       "Displays a list of orders currently on their way to customers.",
//     footer: "A list of your delivered Orders.",
//   },
// };