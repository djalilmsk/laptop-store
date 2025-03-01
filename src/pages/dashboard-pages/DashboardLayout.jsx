import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Main } from "@/components/dashboard/Main";

import { Outlet, redirect } from "react-router-dom";
import { Footer } from "@/components";
import { Toaster } from "@/components/ui/toaster";

// export const loader = (store) => {
//   if (!store.getState().userReducer.user) {
//     return redirect("/");
//   }
//   return;
// };

function DashboardLayout() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar /> {/* sidebar */}
        <Main>
          <Outlet /> {/* main content */}
        </Main>
        <Toaster />
      </SidebarProvider>
    </div>
  );
}

export default DashboardLayout;
