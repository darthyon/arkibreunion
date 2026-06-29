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
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import { DialogShell } from "@/components/ui/DialogShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { useAdmin } from "@/hooks/useAdmin";
import { usePreview } from "@/components/PreviewProvider";
import type { AdminParticipant, GiftExchange } from "@/types/gift-exchange";
import { AdminGiftPanel } from "./AdminGiftPanel";
import { AssignmentView } from "./AssignmentView";
import { ParticipantLogin } from "./ParticipantLogin";
import { WishlistForm } from "./WishlistForm";
import { GiftSetupDialog } from "./dialogs/GiftSetupDialog";
import { ParticipantDialog } from "./dialogs/ParticipantDialog";
import { RunDrawDialog } from "./dialogs/RunDrawDialog";
import styles from "./TukarHadiahPage.module.css";

// Opaque guest session token. localStorage (not httpOnly) because the client
// reads its own gift data via useQuery(token) — defence is server-side rate
// limiting on PIN attempts, not token secrecy.
const TOKEN_KEY = "gift-session-token";

export function TukarHadiahPage() {
  const event = useQuery(api.event.get);
  const exchangeDoc = useQuery(api.giftExchange.get);
  const updateExchange = useMutation(api.giftExchange.update);
  const runDraw = useMutation(api.giftExchange.runDraw);

  const { isAdmin: isAuthedAdmin } = useAdmin();
  const { isPreviewing } = usePreview();
  const isAdmin = isAuthedAdmin && !isPreviewing;

  // --- Guest session (name + PIN, scoped to Tukar Hadiah) ---
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(window.localStorage.getItem(TOKEN_KEY));
  }, []);
  const guest = useQuery(api.participants.getBySession, token ? { token } : "skip");
  const myAssignment = useQuery(api.participants.myAssignment, token ? { token } : "skip");
  const verifyPin = useAction(api.participants.verifyPin);
  const submitWishlist = useMutation(api.participants.submitWishlist);
  const isLoggedIn = Boolean(guest);

  // --- Admin roster (only queried when admin; query is admin-gated) ---
  const adminParticipants = useQuery(api.participants.list, isAdmin ? {} : "skip");
  const adminAssignments = useQuery(api.assignments.adminList, isAdmin ? {} : "skip");
  const createParticipant = useMutation(api.participants.create);
  const updateParticipant = useMutation(api.participants.update);
  const removeParticipant = useMutation(api.participants.remove);
  const resetPin = useMutation(api.participants.resetPin);
  const sendPin = useAction(api.email.sendPin);
  const sendAllPins = useAction(api.email.sendAllPins);

  const exchange: GiftExchange = {
    id: exchangeDoc?._id ?? "",
    eventId: "",
    picNames: exchangeDoc?.picNames ?? [],
    budgetText: exchangeDoc?.budgetText,
    description: exchangeDoc?.description,
    isDrawn: exchangeDoc?.isDrawn ?? false,
    drawnAt: exchangeDoc?.drawnAt
  };

  const [loginError, setLoginError] = useState<string>();
  const [drawError, setDrawError] = useState<string>();
  const [toast, setToast] = useState<string>();
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isParticipantDialogOpen, setIsParticipantDialogOpen] = useState(false);
  const [isDrawDialogOpen, setIsDrawDialogOpen] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState<AdminParticipant>();
  const [pendingDelete, setPendingDelete] = useState<AdminParticipant>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("login") === "rakyat") {
      window.setTimeout(() => setIsLoginDialogOpen(true), 0);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(undefined), 4200);
  }

  async function handleParticipantLogin(values: { name: string; pin: string }) {
    setLoginError(undefined);
    const result = await verifyPin({ name: values.name, pin: values.pin });
    if (result.ok) {
      window.localStorage.setItem(TOKEN_KEY, result.token);
      setToken(result.token);
      setIsLoginDialogOpen(false);
    } else if (result.error === "locked") {
      const mins = result.retryAfterMs ? Math.ceil(result.retryAfterMs / 60000) : 5;
      setLoginError(`Terlalu banyak cubaan. Cuba lagi dalam ${mins} minit.`);
    } else {
      setLoginError("Nama atau PIN tak jumpa. Cuba semak balik.");
    }
  }

  function handleLogout() {
    window.localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }

  async function handleWishlistSave(wishlist: string) {
    if (!token) return;
    await submitWishlist({ token, wishlist });
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

  async function handleSaveParticipant(values: { name: string; email: string; pin?: string }) {
    if (editingParticipant) {
      await updateParticipant({
        participantId: editingParticipant.id as Id<"participants">,
        name: values.name,
        email: values.email
      });
      showToast("Peserta dikemaskini.");
    } else {
      const result = await createParticipant({
        name: values.name,
        email: values.email,
        pin: values.pin
      });
      showToast(`Peserta ditambah. PIN ${values.name}: ${result.pin}`);
    }
    setEditingParticipant(undefined);
    setIsParticipantDialogOpen(false);
  }

  async function handleConfirmDelete() {
    if (!pendingDelete) return;
    await removeParticipant({ participantId: pendingDelete.id as Id<"participants"> });
    setPendingDelete(undefined);
    showToast("Peserta dipadam. Cabutan perlu run semula.");
  }

  async function handleResetPin(participant: AdminParticipant) {
    const result = await resetPin({ participantId: participant.id as Id<"participants"> });
    showToast(`PIN baru ${participant.name}: ${result.pin}`);
  }

  async function handleSendPin(participant: AdminParticipant) {
    try {
      await sendPin({ participantId: participant.id as Id<"participants"> });
      showToast(`PIN baru dihantar ke ${participant.email}.`);
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Gagal hantar PIN.");
    }
  }

  async function handleSendAllPins() {
    try {
      const result = await sendAllPins({});
      const skipNote = result.skipped.length > 0 ? ` Skip (tiada email): ${result.skipped.join(", ")}.` : "";
      showToast(`PIN dihantar ke ${result.sent} peserta.${skipNote}`);
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Gagal hantar PIN.");
    }
  }

  async function handleRunDraw() {
    const wasDrawn = exchange.isDrawn;
    try {
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
              : isLoggedIn
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

        <section className={`${styles.authStrip} ${isLoggedIn ? styles.authStripLoggedIn : ""}`}>
          <div className={styles.authCopy}>
            {isLoggedIn ? <LogOut size={18} aria-hidden="true" /> : <LogIn size={18} aria-hidden="true" />}
            <p>
              {isLoggedIn
                ? `Hi ${guest?.name}, anda sedang log masuk sebagai rakyat biasa.`
                : "Belum log masuk sebagai rakyat biasa."}
            </p>
          </div>
          {isLoggedIn ? (
            <Button onClick={handleLogout} variant="secondary">
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

        {isLoggedIn && guest ? (
          <div className={styles.contentGrid}>
            <section className={styles.panel}>
              <div className={styles.panelHeader}>
                <LockKeyhole size={18} aria-hidden="true" />
                <h2>Wishlist Saya</h2>
              </div>
              <WishlistForm onSave={handleWishlistSave} value={guest.wishlist} />
            </section>

            <AssignmentView isDrawn={exchange.isDrawn} recipient={myAssignment ?? undefined} />
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
            assignments={adminAssignments ?? []}
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
            onResetPin={handleResetPin}
            onRunDraw={() => setIsDrawDialogOpen(true)}
            onSendAllPins={handleSendAllPins}
            onSendPin={handleSendPin}
            participants={adminParticipants ?? []}
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
