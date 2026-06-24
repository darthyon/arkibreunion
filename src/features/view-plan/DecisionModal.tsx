"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { CheckCircle2, X } from "lucide-react";
import type { PlanDecision } from "@/types/view-plan";
import styles from "./ViewPlanPage.module.css";

type DecisionModalProps = {
  decisions: PlanDecision[];
  onClose: () => void;
};

export function DecisionModal({ decisions, onClose }: DecisionModalProps) {
  const isOpen = decisions.length > 0;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => (open ? undefined : onClose())}>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.dialogBackdrop} />
        <Dialog.Popup className={styles.dialogPopup}>
          {isOpen ? (
            <>
              <div className={styles.dialogHeader}>
                <div>
                  <Dialog.Title className={styles.dialogTitle} render={<h3 />}>
                    Keputusan
                  </Dialog.Title>
                </div>
                <Dialog.Close className={styles.dialogClose} aria-label="Tutup">
                  <X size={18} aria-hidden="true" />
                </Dialog.Close>
              </div>

              <div className={styles.dialogBody}>
                {decisions.map((decision) => (
                  <article className={styles.decisionRecord} key={decision.id}>
                    <h3>{decision.title}</h3>
                    {decision.source || decision.note ? (
                      <p>
                        {decision.source ? `${decision.source}. ` : ""}
                        {decision.note}
                      </p>
                    ) : null}
                    <div className={styles.finalDecision}>
                      <span>Keputusan rasmi</span>
                      <strong>{decision.finalDecision}</strong>
                    </div>

                    {decision.pollOptions ? (
                      <div className={styles.pollList} aria-label={`Poll result for ${decision.title}`}>
                        {decision.pollOptions.map((option) => (
                          <div className={styles.pollOption} key={option.id}>
                            <span>
                              {option.isWinner ? <CheckCircle2 size={15} aria-hidden="true" /> : null}
                              {option.label}
                            </span>
                            <strong>{option.voteCount} undi</strong>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </>
          ) : null}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
