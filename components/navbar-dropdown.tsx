"use client";

import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Button,
  NavbarItem,
} from "@nextui-org/react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ChevronDownIcon } from "./icons";
import { SportDropdown } from "@/app/lib/definitions";

// Accept label as a prop to dynamically update the dropdown menu
interface NavbarDropdownProps {
  sport: SportDropdown;
}

export default function NavbarDropdown({ sport }: NavbarDropdownProps) {
  const pathname = usePathname();

  // A fallback UI in case the item does not exist or doesn't contain a dropdown menu
  function FallbackComponent() {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500 text-xs">Menu is temporarily unavailable</p>
      </div>
    );
  }

  // Check if user is on one of a sport's pages
  const isOnPage = pathname.startsWith(`/${sport.slug}`);

  return (
    <Dropdown backdrop="blur">
      <NavbarItem>
        <DropdownTrigger>
          <Button
            variant="light"
            disableRipple
            className={clsx(
              "text-foreground text-xl",
              isOnPage ? "text-red-900 font-medium" : ""
            )}
            endContent={<ChevronDownIcon />}
          >
            {sport.name}
          </Button>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu aria-label="Link Actions">
        {sport.dropdownItems.map((dropdownItem) => (
          <DropdownItem
            className={clsx(
              "text-foreground",
              dropdownItem.label === "My Games" ? "text-rose-700" : ""
            )}
            href={dropdownItem.href}
            variant="light"
            color={dropdownItem.label === "My Games" ? "danger" : "default"}
          >
            {dropdownItem.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
