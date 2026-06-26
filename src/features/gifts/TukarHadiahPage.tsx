"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  ClipboardCheck,
  Gift,
  LockKeyhole,
  LogIn,
  LogOut,
  WalletCards
} from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import { DialogShell } from "@/components/ui/DialogShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { giftAssignments, giftExchange, giftParticipants } from "@/data/gift-exchange";
import { useAdmin } from "@/hooks/useAdmin";
import { usePreview } from "@/components/PreviewProvider";
import type { GiftExchange, GiftParticipant } from "@/types/gift-exchange";
import { AdminGiftPanel } from "./AdminGiftPanel";
import { AssignmentView } from "./AssignmentView";
import { ParticipantLogin } from "./ParticipantLogin";
import { WishlistForm } from "./WishlistForm";
import { GiftSetupDialog } from "./dialogs/GiftSetupDialog";
import { ParticipantDialog } from "./dialogs/ParticipantDialog";
import { RunDrawDialog } from "./dialogs/RunDrawDialog";
import styles from "./TukarHadiahPage.module.css";

export function TukarHadiahPage() {
  const [exchange, setExchange] = useState<GiftExchange>(giftExchange);
  const [participants, setParticipants] = useState<GiftParticipant[]>(giftParticipants);
  const [assignments, setAssignments] = useState(giftAssignments);
  const [activeParticipantId, setActiveParticipantId] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string>();
  const [drawError, setDrawError] = useState<string>();
  const [toast, setToast] = useState<string>();
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isParticipantDialogOpen, setIsParticipantDialogOpen] = useState(false);
  const [isDrawDialogOpen, setIsDrawDialogOpen] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState<GiftParticipant>();
  const [pendingDelete, setPendingDelete] = useState<GiftParticipant>();

  // Public reads from Convex. Participant roster + draw stay on local mock until
  // the gift mutations (2b) and guest PIN flow (2c) land.
  const event = useQuery(api.event.get);
  const exchangeDoc = useQuery(api.giftExchange.get);
  const updateExchange = useMutation(api.giftExchange.update);
  const runDraw = useMutation(api.giftExchange.runDraw);

  useEffect(() => {
    if (!exchangeDoc) return;
    setExchange((current) => ({
      ...current,
      id: exchangeDoc._id,
      picNames: exchangeDoc.picNames,
      budgetText: exchangeDoc.budgetText,
      description: exchangeDoc.description,
      isDrawn: exchangeDoc.isDrawn,
      drawnAt: exchangeDoc.drawnAt
    }));
  }, [exchangeDoc]);

  const { isAdmin: isAuthedAdmin } = useAdmin();
  const { isPreviewing } = usePreview();
  const isAdmin = isAuthedAdmin && !isPreviewing;
  const activeParticipant = participants.find((participant) => participant.id === activeParticipantId);
  const activeAssignment = assignments.find((assignment) => assignment.giverParticipantId === activeParticipantId);
  const recipient = activeAssignment
    ? participants.find((participant) => participant.id === activeAssignment.receiverParticipantId)
    : undefined;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("login") === "rakyat") {
      window.setTimeout(() => setIsLoginDialogOpen(true), 0);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(undefined), 3200);
  }

  function clearDrawIfRosterChanged(nextExchange = exchange) {
    setAssignments([]);
    setExchange({
      ...nextExchange,
      isDrawn: false,
      drawnAt: undefined
    });
  }

  function handleParticipantLogin(values: { name: string; pin: string }) {
    const name = values.name.trim().toLowerCase();
    const pin = values.pin.trim();
    const participant = participants.find(
      (item) => item.name.trim().toLowerCase() === name && item.pin === pin
    );

    if (!participant) {
      setLoginError("Nama atau PIN tak jumpa. Cuba semak balik.");
      return;
    }

    setLoginError(undefined);
    setActiveParticipantId(participant.id);
    setIsLoginDialogOpen(false);
  }

  function handleWishlistSave(wishlist: string) {
    if (!activeParticipant) {
      return;
    }

    const trimmedWishlist = wishlist.trim();
    const now = new Date().toISOString();

    setParticipants((currentParticipants) =>
      currentParticipants.map((participant) =>
        participant.id === activeParticipant.id
          ? {
              ...participant,
              wishlist: trimmedWishlist,
              hasSubmittedWishlist: trimmedWishlist.length > 0,
              updatedAt: now
            }
          : participant
      )
    );
    showToast("Wishlist disimpan. Semoga orang faham hint.");
  }

  async function handleSaveSetup(nextExchange: GiftExchange) {
    await updateExchange({
      budgetText: nextExchange.budgetText,
      description: nextExchange.description,
      picNames: nextExchange.picNames
    });
    setIsSetupOpen(false);
    showToast("Setup Tukar Hadiah dikemaskini.");
  }

  function handleSaveParticipant(participant: GiftParticipant) {
    const existingParticipant = participants.find((item) => item.id === participant.id);

    if (existingParticipant) {
      setParticipants((currentParticipants) =>
        currentParticipants.map((item) => (item.id === participant.id ? participant : item))
      );
    } else {
      setParticipants((currentParticipants) => [...currentParticipants, participant]);
      clearDrawIfRosterChanged();
    }

    setEditingParticipant(undefined);
    setIsParticipantDialogOpen(false);
    showToast(existingParticipant ? "Peserta dikemaskini." : "Peserta ditambah.");
  }

  function handleConfirmDelete() {
    if (!pendingDelete) {
      return;
    }

    setParticipants((currentParticipants) =>
      currentParticipants.filter((participant) => participant.id !== pendingDelete.id)
    );
    setActiveParticipantId((currentId) => (currentId === pendingDelete.id ? null : currentId));
    clearDrawIfRosterChanged();
    setPendingDelete(undefined);
    showToast("Peserta dipadam. Cabutan perlu run semula.");
  }

  async function handleRunDraw() {
    const wasDrawn = exchange.isDrawn;
    try {
      // Draw runs server-side over the Convex participant roster and persists.
      await runDraw({});
      setDrawError(undefined);
      setIsDrawDialogOpen(false);
      showToast(wasDrawn ? "Cabutan hadiah dirun semula." : "Cabutan hadiah selesai.");
    } catch (error) {
      setDrawError(error instanceof Error ? error.message : "Cabutan gagal.");
      setIsDrawDialogOpen(false);
    }
  }

  return (
    <PageContainer size="readable">
      <div className={styles.page}>
        <Link className={styles.backLink} href="/">
          <ArrowLeft size={18} aria-hidden="true" />
          <span>Balik ke Arkib</span>
        </Link>

        <PageHeader
          description={
            isAdmin
              ? "Kemaskini peserta, wishlist, dan cabutan hadiah."
              : activeParticipant
                ? "Akses peribadi untuk hadiah yang kononnya rahsia."
                : "Cabutan nama, wishlist, dan sedikit unsur suspen."
          }
          title="Tukar Hadiah"
        />

        <section className={styles.factStrip} aria-label="Ringkasan Tukar Hadiah">
          <div className={styles.factItem}>
            <CalendarDays size={25} aria-hidden="true" />
            <div>
              <span>Tempoh</span>
              <strong>{event?.dateText ?? "—"}</strong>
              <small>{event?.durationText ?? ""}</small>
            </div>
          </div>

          <div className={styles.factItem}>
            <WalletCards size={25} aria-hidden="true" />
            <div>
              <span>Anggaran Bajet</span>
              <strong>{exchange.budgetText ?? "Belum set"}</strong>
              <small>per hadiah</small>
            </div>
          </div>

          <div className={styles.factItem}>
            <ClipboardCheck size={25} aria-hidden="true" />
            <div>
              <span>Status Cabutan</span>
              <strong>{exchange.isDrawn ? "Sudah dibuat" : "Belum dibuat"}</strong>
              <small>{exchange.isDrawn ? "Cabutan tersimpan" : "Menunggu admin"}</small>
            </div>
          </div>
        </section>

        <section className={`${styles.authStrip} ${activeParticipant ? styles.authStripLoggedIn : ""}`}>
          <div className={styles.authCopy}>
            {activeParticipant ? <LogOut size={18} aria-hidden="true" /> : <LogIn size={18} aria-hidden="true" />}
            <p>
              {activeParticipant
                ? `Hi ${activeParticipant.name}, anda sedang log masuk sebagai rakyat biasa.`
                : "Belum log masuk sebagai rakyat biasa."}
            </p>
          </div>
          {activeParticipant ? (
            <Button onClick={() => setActiveParticipantId(null)} variant="secondary">
              <LogOut size={17} aria-hidden="true" />
              Keluar
            </Button>
          ) : (
            <Button onClick={() => setIsLoginDialogOpen(true)}>
              <LogIn size={17} aria-hidden="true" />
              Log Masuk
            </Button>
          )}
        </section>

        {activeParticipant ? (
          <div className={styles.contentGrid}>
            <section className={styles.panel}>
              <div className={styles.panelHeader}>
                <LockKeyhole size={18} aria-hidden="true" />
                <h2>Wishlist Saya</h2>
              </div>
              <WishlistForm onSave={handleWishlistSave} value={activeParticipant.wishlist} />
            </section>

            <AssignmentView assignment={activeAssignment} exchange={exchange} recipient={recipient} />
          </div>
        ) : (
          <div className={styles.contentGrid}>
            <section className={styles.panel}>
              <div className={styles.panelHeader}>
                <LockKeyhole size={18} aria-hidden="true" />
                <h2>Status Login</h2>
              </div>
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <LogIn size={34} aria-hidden="true" />
                </div>
                <h3>Belum log masuk.</h3>
                <p>Log masuk sebagai rakyat biasa untuk isi wishlist dan tengok assignment sendiri.</p>
                <Button onClick={() => setIsLoginDialogOpen(true)}>
                  <LogIn size={17} aria-hidden="true" />
                  Log masuk rakyat biasa
                </Button>
              </div>
            </section>

            <section className={styles.panel}>
              <div className={styles.panelHeader}>
                <Gift size={18} aria-hidden="true" />
                <h2>Cabutan Saya</h2>
              </div>
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <Gift size={36} aria-hidden="true" />
                </div>
                <h3>Belum boleh dipaparkan.</h3>
                <p>Assignment akan muncul selepas anda log masuk sebagai rakyat biasa.</p>
              </div>
            </section>
          </div>
        )}

        {isAdmin ? (
          <AdminGiftPanel
            assignments={assignments}
            drawError={drawError}
            exchange={exchange}
            onAddParticipant={() => {
              setEditingParticipant(undefined);
              setIsParticipantDialogOpen(true);
            }}
            onDeleteParticipant={setPendingDelete}
            onEditParticipant={(participant) => {
              setEditingParticipant(participant);
              setIsParticipantDialogOpen(true);
            }}
            onEditSetup={() => setIsSetupOpen(true)}
            onRunDraw={() => setIsDrawDialogOpen(true)}
            participants={participants}
          />
        ) : null}

        {toast ? <p className={styles.toast}>{toast}</p> : null}

        <GiftSetupDialog
          exchange={exchange}
          onClose={() => setIsSetupOpen(false)}
          onSave={handleSaveSetup}
          open={isSetupOpen}
        />

        <DialogShell
          footer={
            <Button onClick={() => setIsLoginDialogOpen(false)} variant="secondary">
              Cancel
            </Button>
          }
          onOpenChange={(open) => {
            setIsLoginDialogOpen(open);
            if (!open) {
              setLoginError(undefined);
            }
          }}
          open={isLoginDialogOpen}
          title="Log masuk rakyat biasa"
        >
          <div className={styles.loginDialogIntro}>
            <p>Masukkan nama dan PIN untuk tengok cabutan sendiri. Bukan laluan admin, jangan risau.</p>
          </div>
          <ParticipantLogin error={loginError} onSubmit={handleParticipantLogin} />
        </DialogShell>

        <ParticipantDialog
          exchangeId={exchange.id}
          onClose={() => {
            setEditingParticipant(undefined);
            setIsParticipantDialogOpen(false);
          }}
          onSave={handleSaveParticipant}
          open={isParticipantDialogOpen}
          participant={editingParticipant}
        />

        <RunDrawDialog
          isRerun={exchange.isDrawn}
          onClose={() => setIsDrawDialogOpen(false)}
          onConfirm={handleRunDraw}
          open={isDrawDialogOpen}
        />

        <DialogShell
          footer={
            <>
              <Button onClick={() => setPendingDelete(undefined)} variant="secondary">
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete}>Padam</Button>
            </>
          }
          onOpenChange={(open) => {
            if (!open) {
              setPendingDelete(undefined);
            }
          }}
          open={Boolean(pendingDelete)}
          title="Padam peserta ini?"
        >
          <p className={styles.deleteText}>
            Peserta akan dibuang dari Tukar Hadiah. Kalau cabutan dah dibuat, assignment perlu run semula.
          </p>
        </DialogShell>
      </div>
    </PageContainer>
  );
}
