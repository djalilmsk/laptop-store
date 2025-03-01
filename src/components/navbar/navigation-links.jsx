"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { DropdownMenuLabel } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

import { Link } from "react-router-dom";

import { useIsMobile } from "@/hooks/use-mobile";

import { CartIcon } from "../cart/cart-icon";
import { NAV_LINKS } from "./NAV_LINKS-array";

export function NavigationLinks() {
  const isMobile = useIsMobile();

  return (
    <NavigationMenu className="nav">
      <NavigationMenuList>
        {isMobile ? <MobileSize /> : <LinedNavLinksMenu />}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function LinedNavLinksMenu() {
  return (
    <>
      {NAV_LINKS.map((link) => (
        <NavigationMenuItem key={link.id} className="nav">
          <Link to={link.to} className={navigationMenuTriggerStyle()}>
            {link.label}
          </Link>
        </NavigationMenuItem>
      ))}
    </>
  );
}

export function DropdownNavLinksMenu({ trigger = "Menu" }) {
  return (
    <NavigationMenuItem className="nav">
      <NavigationMenuTrigger>{trigger}</NavigationMenuTrigger>
      <NavigationMenuContent className="w-40 p-1">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Dropdown Menu
        </DropdownMenuLabel>
        <NavigationMenuIndicator />
        {NAV_LINKS.map((link) => (
          <Link key={link.id} to={link.to} className="flex">
            <ListItem
              title={{
                logo: link.logo,
                label: link.label,
              }}
            />
          </Link>
        ))}
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

function MobileSize() {
  return (
    <div className="flex items-center">
      <DropdownNavLinksMenu />
      <Separator orientation="vertical" className="h-9" />
      <Button variant="ghost" size="icon" className="nav">
        <CartIcon />
      </Button>
    </div>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "block w-full select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className,
        )}
        {...props}
      >
        <div className="flex w-full items-center gap-3 text-sm font-medium leading-none">
          <span className="flex size-7 items-center justify-center rounded-sm border px-1 py-1">
            {title.logo}
          </span>
          {title.label}
        </div>
        {children && (
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        )}
      </div>
    );
  },
);
ListItem.displayName = "ListItem";
