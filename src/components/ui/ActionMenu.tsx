"use client";

import type { ReactNode } from "react";
import { Menu } from "@base-ui-components/react/menu";
import { ChevronDown } from "lucide-react";
import styles from "./ActionMenu.module.css";

export type ActionMenuItem = {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

type ActionMenuProps = {
  label?: string;
  items: ActionMenuItem[];
};

// Trigger + chevron that opens a popover of actions. Visual language matches the
// header admin dropdown; Base UI handles focus, escape, and outside-click.
export function ActionMenu({ label = "Actions", items }: ActionMenuProps) {
  return (
    <Menu.Root>
      <Menu.Trigger className={styles.trigger}>
        {label}
        <ChevronDown size={15} aria-hidden="true" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className={styles.positioner} sideOffset={8} align="end">
          <Menu.Popup className={styles.popup}>
            {items.map((item) => (
              <Menu.Item
                className={styles.item}
                disabled={item.disabled}
                key={item.label}
                onClick={item.onClick}
              >
                {item.icon}
                <span>{item.label}</span>
              </Menu.Item>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
