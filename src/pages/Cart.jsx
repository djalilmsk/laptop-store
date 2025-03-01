import { PaymentSummary } from "@/components";
import { CartTable } from "@/components/cart/CartTable";
import { Button } from "@/components/ui/button";
import { clearCart } from "@/features/reduxSlices/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const handelClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <section className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <CartTable />
      <PaymentSummary>
        <Link to="/checkout" className="flex flex-col">
          <Button>Checkout</Button>
        </Link>
        <Button onClick={handelClearCart} variant="outline">
          Clear Cart
        </Button>
      </PaymentSummary>
    </section>
  );
}

export default Cart;
