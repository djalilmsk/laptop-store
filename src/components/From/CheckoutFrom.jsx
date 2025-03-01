import { Form } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  InputFullName,
  InputPhoneNumber,
  SelectionWilaya,
  InputAddress,
  SelectionShipping,
  InputNote,
} from "@/components/customerData/Inputs";
import { useSelector } from "react-redux";
import { Label } from "../ui/label";

import { redirect } from "react-router-dom";
import { customFetch } from "@/utils";
import { clearCart, removeSavedItem } from "@/features/reduxSlices/cartSlice";
import { setOrders } from "@/features/reduxSlices/orderSlice";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const requestData = Object.fromEntries(formData);

    const laptopsInCart = store.getState().cartReducer.cartItems;
    const laptops = laptopsInCart.map((lap) => {
      return { laptop: lap._id, quantity: lap?.quantity || 1 };
    });

    const checkoutForm = {
      fullName: `${requestData.firstName} ${requestData.lastName}`,
      phone: requestData.phone,
      address: {
        commune: requestData.commune,
        wilaya: requestData.wilaya,
      },
      note: requestData.note,
      shippingType: requestData.ShippingType,
    };

    const postData = {
      checkout: checkoutForm,
      laptops: laptops,
      // laptops: { laptop: "6796aa7436b68d1e14795e58", quantity: 2 },
    };

    const URL = "/checkout/";
    try {
      const response = await customFetch.post(URL, postData);
      const data = response.data.order;

      // if (!data || typeof data !== "object") {
      //   throw new Error("Invalid data structure received from the API.");
      // }

      store.dispatch(clearCart());
      store.dispatch(setOrders(data._id));
      postData.laptops.map(({ laptop }) => {
        store.dispatch(removeSavedItem(laptop));
      });

      return redirect("/");
    } catch (err) {
      throw new Error(
        err || "Failed to fetch data from the server. Please try again later.",
      );
      //return null;
    }
  };

function CheckoutForm() {
  const { quantity } = useSelector((state) => state.cartReducer);

  return (
    <Form method="POST" className="flex flex-col gap-3 lg:col-span-2">
      <InputFullName />
      <InputPhoneNumber />
      <SelectionWilaya />
      <InputAddress />
      <SelectionShipping />
      <InputNote />
      {quantity ? (
        <Button type="submit">Confirm Order</Button>
      ) : (
        <div className="flex flex-col">
          <Button type="submit" disabled>
            Confirm Order
          </Button>
          <Label className="mt-1 text-center text-xs">
            {" "}
            Note : at least add one item to the cart
          </Label>
        </div>
      )}
    </Form>
  );
}

export default CheckoutForm;
