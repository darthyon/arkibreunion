"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { X } from "lucide-react";
import styles from "./DialogShell.module.css";

type DialogShellProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function DialogShell({ open, onOpenChange, title, children, footer }: DialogShellProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Popup className={styles.popup}>
          <header className={styles.header}>
            <Dialog.Title className={styles.title} render={<h3 />}>
              {title}
            </Dialog.Title>
            <Dialog.Close className={styles.close} aria-label="Tutup">
              <X size={18} aria-hidden="true" />
            </Dialog.Close>
          </header>
          <div className={styles.body}>{children}</div>
          {footer ? <footer className={styles.footer}>{footer}</footer> : null}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
