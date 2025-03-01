import { MdShoppingCartCheckout } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function CartIcon() {
  const quantity = useSelector((state) => state.cartReducer?.savedItems.length);

  return (
    <Link to="/cart" className="relative">
      {quantity ? (
        <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-600 text-[.5rem] text-slate-50">
          {quantity == 0 ? "" : quantity}
        </span>
      ) : (
        <></>
      )}
      <MdShoppingCartCheckout />
    </Link>
  );
}
