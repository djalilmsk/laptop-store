import {
  House,
  ListOrdered,
  PackageSearch,
  ReceiptText,
  ShieldQuestion,
  ShoppingCart,
} from "lucide-react";

const NAV_LINKS = [
  { id: 1, to: "/", label: "Home", logo: <House /> },
  { id: 2, to: "/products", label: "Products", logo: <PackageSearch /> },
  { id: 4, to: "/contact", label: "Contact", logo: <ReceiptText /> },
  { id: 3, to: "/about", label: "About", logo: <ShieldQuestion /> },
  { id: 5, to: "/orders", label: "Orders", logo: <ListOrdered /> },
  { id: 6, to: "/cart", label: "Cart", logo: <ShoppingCart /> },
];

export { NAV_LINKS };
