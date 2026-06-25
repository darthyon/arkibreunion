import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DialogShell } from "@/components/ui/DialogShell";
import styles from "../TukarHadiahPage.module.css";

type RunDrawDialogProps = {
  isRerun: boolean;
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
};

export function RunDrawDialog({ isRerun, onClose, onConfirm, open }: RunDrawDialogProps) {
  return (
    <DialogShell
      footer={
        <>
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button onClick={onConfirm}>{isRerun ? "Run Semula" : "Run Draw"}</Button>
        </>
      }
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onClose();
        }
      }}
      open={open}
      title={isRerun ? "Run semula cabutan?" : "Run cabutan hadiah?"}
    >
      <div className={styles.warningContent}>
        <AlertTriangle size={20} aria-hidden="true" />
        <p>
          {isRerun
            ? "Assignment lama akan diganti. Kalau peserta dah tengok nama masing-masing, keadaan mungkin menjadi sedikit diplomatik."
            : "Sistem akan susun siapa beli hadiah untuk siapa. Lepas ini, peserta boleh tengok assignment masing-masing."}
        </p>
      </div>
    </DialogShell>
  );
}
