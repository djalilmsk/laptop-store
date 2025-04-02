import {
  Checkout,
  Landing,
  Login,
  Products,
  Cart,
  SingleProduct,
  Contact,
  Account,
  Notification,
  CustomersOrders,
  SingleOrderPage,
  OrdersPage,
  ProductsManagement,
  Signup,
} from "@/pages";
import { ErrorElement } from "@/error";
import { reduxConfig } from "@/reduxConfig";

import { action as loginAction } from "@/components/From/LoginFrom";
import { action as signupAction } from "@/components/From/RegisterFrom";
import { action as checkoutAction } from "@/components/From/CheckoutFrom";
import { action as accountAction } from "@/components/From/DataUpdateFrom";
import { action as contactAction } from "@/pages/Contact";

// import { loader as checkoutLoader } from "@/pages/Checkout";
// import { loader as productsLoader } from "@/pages/Products";
// import { loader as singleProductsLoader } from "@/pages/SingleProduct";
// import { loader as ordersLoader } from "@/pages/OrdersPage";

import { queryClient } from "@/utils/queryClient";
import SingleProductManagement from "@/pages/dashboard-pages/SingleProductManagement";
import NewProductManagement from "@/pages/dashboard-pages/NewProductManagement";
import { AuthenticatedUser } from "@/components/user/authenticate-user";

export const homeChildren = [
  {
    index: true,
    element: <Landing />,
    errorElement: <ErrorElement />,
  },
  {
    path: "/products",
    element: <Products />,
    errorElement: <ErrorElement />,
    // loader: productsLoader(queryClient),
  },
  {
    path: "/products/:id",
    element: <SingleProduct />,
    errorElement: <ErrorElement />,
    // loader: singleProductsLoader,
  },
  {
    path: "/about",
    element: (
      <div className="flex w-full items-center justify-center py-24 text-3xl">
        will be added in the future.
      </div>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: "/contact",
    element: <Contact />,
    errorElement: <ErrorElement />,
    action: contactAction,
  },
  {
    path: "/cart",
    element: <Cart />,
    errorElement: <ErrorElement />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
    errorElement: <ErrorElement />,
    action: checkoutAction(reduxConfig),
    // loader: checkoutLoader(reduxConfig),
  },
  {
    path: "/orders",
    element: <OrdersPage />,
    errorElement: <ErrorElement />,
    // loader: ordersLoader(reduxConfig),
  },
  {
    path: "/login",
    element: (
      <AuthenticatedUser>
        <Login />
      </AuthenticatedUser>
    ),
    errorElement: <ErrorElement />,
    action: loginAction(reduxConfig),
  },
];

export const dashboardChildren = [
  {
    index: true,
    element: <CustomersOrders />,
    errorElement: <ErrorElement />,
  },
  {
    path: "/user-dashboard/orders",
    element: <CustomersOrders />,
    errorElement: <ErrorElement />,
  },
  {
    path: "/user-dashboard/orders/:id",
    element: <SingleOrderPage />,
    errorElement: <ErrorElement />,
  },
  {
    path: "/user-dashboard/products",
    element: <ProductsManagement />,
    errorElement: <ErrorElement />,
  },
  {
    path: "/user-dashboard/products/:id",
    element: <SingleProductManagement />,
    errorElement: <ErrorElement />,
  },
  {
    path: "/user-dashboard/new-product",
    element: <NewProductManagement />,
    errorElement: <ErrorElement />,
  },
  {
    path: "/user-dashboard/reports",
    element: (
      <div className="flex w-full items-center justify-center py-24 text-3xl">
        will be added in the future.
      </div>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: "/user-dashboard/account",
    element: <Account />,
    errorElement: <ErrorElement />,
    action: accountAction(reduxConfig),
  },
  {
    path: "/user-dashboard/notification",
    element: <Notification />,
    errorElement: <ErrorElement />,
  },
  {
    path: "/user-dashboard/signup",
    element: <Signup />,
    errorElement: <ErrorElement />,
    action: signupAction(reduxConfig),
  },
];
