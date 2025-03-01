import { useIsMobile } from "@/hooks/use-mobile";

import { Logo } from "./navigation-logo";
import { NavigationLinks } from "./navigation-links";
import { States } from "./navigation-states";

function NavBar({ className }) {
  const isMobile = useIsMobile();

  return (
    <nav className={`flex justify-between ${className}`}>
      {isMobile ? (
        <>
          <NavigationLinks />
          <Logo />
        </>
      ) : (
        <>
          <Logo />
          <NavigationLinks />
        </>
      )}

      <States />
    </nav>
  );
}

export default NavBar;
