"use client";

import { Select as BaseSelect } from "@base-ui-components/react/select";
import { Check, ChevronDown } from "lucide-react";
import styles from "./Select.module.css";

export type SelectOption<TValue extends string> = {
  value: TValue;
  label: string;
};

type SelectProps<TValue extends string> = {
  options: Array<SelectOption<TValue>>;
  value?: TValue;
  defaultValue?: TValue;
  onValueChange?: (value: TValue) => void;
  name?: string;
  size?: "default" | "chip";
  triggerClassName?: string;
  "aria-label": string;
};

export function Select<TValue extends string>({
  options,
  value,
  defaultValue,
  onValueChange,
  name,
  size = "default",
  triggerClassName,
  "aria-label": ariaLabel
}: SelectProps<TValue>) {
  const itemsMap = Object.fromEntries(options.map((option) => [option.value, option.label]));
  const isChip = size === "chip";
  const triggerClass = [isChip ? styles.triggerChip : styles.trigger, triggerClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <BaseSelect.Root
      defaultValue={defaultValue}
      items={itemsMap}
      name={name}
      onValueChange={(nextValue) => onValueChange?.(nextValue as TValue)}
      value={value}
    >
      <BaseSelect.Trigger aria-label={ariaLabel} className={triggerClass}>
        <BaseSelect.Value />
        <BaseSelect.Icon className={styles.triggerIcon}>
          <ChevronDown size={isChip ? 13 : 16} aria-hidden="true" />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>

      <BaseSelect.Portal>
        <BaseSelect.Positioner className={styles.positioner} sideOffset={6}>
          <BaseSelect.Popup className={styles.popup}>
            {options.map((option) => (
              <BaseSelect.Item className={styles.item} key={option.value} value={option.value}>
                <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                <BaseSelect.ItemIndicator className={styles.indicator}>
                  <Check size={15} aria-hidden="true" />
                </BaseSelect.ItemIndicator>
              </BaseSelect.Item>
            ))}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
