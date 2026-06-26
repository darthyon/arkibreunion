"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { ArrowLeft } from "lucide-react";
import { api } from "@convex/_generated/api";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import type {
  AccommodationPlan,
  MenuSection,
  OutfitPlan,
  PlanDecision,
  ProgramItem
} from "@/types/view-plan";
import { ViewPlanTabs } from "./ViewPlanTabs";
import styles from "./ViewPlanPage.module.css";

export function ViewPlanPage() {
  const decisionDocs = useQuery(api.viewPlan.decisions);
  const outfitDocs = useQuery(api.viewPlan.outfits);
  const menuDocs = useQuery(api.viewPlan.menuSections);
  const programDocs = useQuery(api.viewPlan.programItems);
  const accommodationDoc = useQuery(api.viewPlan.accommodation);

  const isLoading =
    decisionDocs === undefined ||
    outfitDocs === undefined ||
    menuDocs === undefined ||
    programDocs === undefined ||
    accommodationDoc === undefined;

  const decisions: PlanDecision[] = (decisionDocs ?? []).map((doc) => ({
    id: doc._id,
    linkedTo: doc.linkedTo,
    title: doc.title,
    finalDecision: doc.finalDecision,
    type: doc.type,
    source: doc.source,
    note: doc.note,
    pollOptions: doc.pollOptions?.map((o) => ({
      id: o.slug,
      label: o.label,
      voteCount: o.voteCount,
      isWinner: o.isWinner
    })),
    picNames: doc.picNames
  }));

  const outfitPlans: OutfitPlan[] = (outfitDocs ?? []).map((doc) => ({
    id: doc._id,
    dayNumber: doc.dayNumber,
    themeName: doc.themeName,
    description: doc.description,
    imageReferenceUrl: doc.imageReferenceUrl,
    decisionId: doc.decisionId,
    picNames: doc.picNames
  }));

  const menuSections: MenuSection[] = (menuDocs ?? []).map((doc) => ({
    id: doc._id,
    title: doc.title,
    decisionId: doc.decisionId,
    items: doc.items.map((i) => ({
      id: i.slug,
      name: i.name,
      description: i.description,
      assignedPerson: i.assignedPerson
    }))
  }));

  const programItems: ProgramItem[] = (programDocs ?? []).map((doc) => ({
    id: doc._id,
    dayNumber: doc.dayNumber,
    time: doc.time,
    title: doc.title,
    location: doc.location,
    notes: doc.notes,
    picNames: doc.picNames
  }));

  const accommodation: AccommodationPlan | undefined = accommodationDoc
    ? {
        id: accommodationDoc._id,
        name: accommodationDoc.name,
        stayPeriod: accommodationDoc.stayPeriod,
        location: accommodationDoc.location,
        roomNote: accommodationDoc.roomNote,
        decisionId: accommodationDoc.decisionId,
        picNames: accommodationDoc.picNames
      }
    : undefined;

  return (
    <PageContainer size="readable">
      <div className={styles.page}>
        <Link className={styles.backLink} href="/">
          <ArrowLeft size={18} aria-hidden="true" />
          <span>Balik ke Arkib</span>
        </Link>

        <PageHeader title="View Plan" description="Semua plan yang dah rasmi." />

        {isLoading || !accommodation ? (
          <p className={styles.loading}>Memuatkan plan…</p>
        ) : (
          <ViewPlanTabs
            accommodation={accommodation}
            decisions={decisions}
            menuSections={menuSections}
            outfitPlans={outfitPlans}
            programItems={programItems}
          />
        )}
      </div>
    </PageContainer>
  );
}
