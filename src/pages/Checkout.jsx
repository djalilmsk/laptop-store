import { PaymentSummary } from "@/components";
import CheckoutForm from "@/components/From/CheckoutFrom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// export const loader = (store) => {
//   if (!store.getState().userReducer.user) {
//     return redirect('/');
//   }
//   return;
// };

function Checkout() {
  return (
    <section className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <CheckoutForm />
      <PaymentSummary>
        <Link to="/cart" className="flex flex-col">
          <Button variant='outline'>Go Back to Cart</Button>
        </Link>
      </PaymentSummary>
    </section>
  );
}

export default Checkout;
