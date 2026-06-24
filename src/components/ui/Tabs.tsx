"use client";

import { Tabs as BaseTabs } from "@base-ui-components/react/tabs";
import styles from "./Tabs.module.css";

export type TabItem<TValue extends string> = {
  value: TValue;
  label: string;
  icon?: React.ReactNode;
};

type TabsProps<TValue extends string> = {
  items: Array<TabItem<TValue>>;
  value: TValue;
  onValueChange: (value: TValue) => void;
  "aria-label": string;
  mobilePlacement?: "inline" | "bottom";
};

export function Tabs<TValue extends string>({
  items,
  value,
  onValueChange,
  "aria-label": ariaLabel,
  mobilePlacement = "inline"
}: TabsProps<TValue>) {
  return (
    <BaseTabs.Root value={value} onValueChange={(nextValue) => onValueChange(nextValue as TValue)}>
      <BaseTabs.List
        className={styles.tabs}
        data-mobile-placement={mobilePlacement}
        style={{ "--tab-count": items.length } as React.CSSProperties}
        aria-label={ariaLabel}
      >
        {items.map((item) => (
          <BaseTabs.Tab className={styles.tab} key={item.value} value={item.value}>
            {item.icon ? <span className={styles.icon}>{item.icon}</span> : null}
            <span>{item.label}</span>
          </BaseTabs.Tab>
        ))}
      </BaseTabs.List>
    </BaseTabs.Root>
  );
}
