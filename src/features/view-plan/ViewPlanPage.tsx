import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  accommodationPlan,
  menuSections,
  outfitPlans,
  planDecisions,
  programItems
} from "@/data/view-plan";
import { ViewPlanTabs } from "./ViewPlanTabs";
import styles from "./ViewPlanPage.module.css";

export function ViewPlanPage() {
  return (
    <PageContainer size="readable">
      <div className={styles.page}>
        <Link className={styles.backLink} href="/">
          <ArrowLeft size={18} aria-hidden="true" />
          <span>Balik ke Arkib</span>
        </Link>

        <PageHeader title="View Plan" description="Semua plan yang dah rasmi." />

        <ViewPlanTabs
          accommodation={accommodationPlan}
          decisions={planDecisions}
          menuSections={menuSections}
          outfitPlans={outfitPlans}
          programItems={programItems}
        />
      </div>
    </PageContainer>
  );
}
