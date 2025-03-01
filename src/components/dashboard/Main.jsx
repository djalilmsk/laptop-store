import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "../theme/ModeToggle";
import { Footer } from "..";

export function Main({ children }) {
  return (
    <SidebarInset className="overflow-x-auto">
      <header className="flex h-16 w-full shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex w-full items-center justify-between gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <ModeToggle className="p-0" />
        </div>
      </header>
      <Separator className="mb-5" />
      <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>

      <Footer />
    </SidebarInset>
  );
}
