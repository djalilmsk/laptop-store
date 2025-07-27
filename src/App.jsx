import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/utils/queryClient";

import { DashboardLayout, HomeLayout } from "./pages";
import { Error } from "./error";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { NonAuthenticatedUser } from "./components/user/authenticate-user";
import { dashboardChildren, homeChildren } from "./utils/router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: homeChildren,
  },
  {
    path: "/user-dashboard",
    element: (
      <NonAuthenticatedUser>
        <DashboardLayout />
      </NonAuthenticatedUser>
    ),
    errorElement: <Error />,
    children: dashboardChildren,
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme-key">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
