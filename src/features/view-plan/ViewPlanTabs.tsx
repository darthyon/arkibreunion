"use client";

import { useMemo, useState } from "react";
import { Tabs } from "@base-ui-components/react/tabs";
import { BedDouble, CalendarDays, Shirt, Utensils } from "lucide-react";
import type {
  AccommodationPlan,
  MenuSection as MenuSectionType,
  OutfitPlan,
  PlanDecision,
  ProgramItem
} from "@/types/view-plan";
import { AccommodationSection } from "./AccommodationSection";
import { DecisionModal } from "./DecisionModal";
import { MenuSection } from "./MenuSection";
import { OutfitSection } from "./OutfitSection";
import { ProgramSection } from "./ProgramSection";
import styles from "./ViewPlanPage.module.css";

type ViewPlanTab = "program" | "outfit" | "menu" | "accommodation";

const tabs: Array<{
  value: ViewPlanTab;
  label: string;
  Icon: typeof CalendarDays;
}> = [
  { value: "program", label: "Program", Icon: CalendarDays },
  { value: "outfit", label: "Outfit", Icon: Shirt },
  { value: "menu", label: "Menu Makan", Icon: Utensils },
  { value: "accommodation", label: "Accommodation", Icon: BedDouble }
];

function uniqueNames(names: Array<string | undefined>) {
  return Array.from(new Set(names.filter((name): name is string => Boolean(name))));
}

type ViewPlanTabsProps = {
  accommodation: AccommodationPlan;
  decisions: PlanDecision[];
  menuSections: MenuSectionType[];
  outfitPlans: OutfitPlan[];
  programItems: ProgramItem[];
};

export function ViewPlanTabs({
  accommodation,
  decisions,
  menuSections,
  outfitPlans,
  programItems
}: ViewPlanTabsProps) {
  const [activeTab, setActiveTab] = useState<ViewPlanTab>("program");
  const [activeDecisions, setActiveDecisions] = useState<PlanDecision[]>([]);

  const decisionsById = useMemo(() => {
    return new Map(decisions.map((decision) => [decision.id, decision]));
  }, [decisions]);

  const getDecisionsByIds = (ids: Array<string | undefined>) => {
    return ids.reduce<PlanDecision[]>((result, id) => {
      if (!id) {
        return result;
      }

      const decision = decisionsById.get(id);

      if (decision && !result.some((item) => item.id === decision.id)) {
        result.push(decision);
      }

      return result;
    }, []);
  };

  const outfitDecisions = getDecisionsByIds(outfitPlans.map((outfit) => outfit.decisionId));
  const menuDecisions = getDecisionsByIds(menuSections.map((section) => section.decisionId));
  const accommodationDecisions = getDecisionsByIds([accommodation.decisionId]);
  const programPicNames = uniqueNames(programItems.flatMap((item) => item.picNames));
  const outfitPicNames = uniqueNames(outfitPlans.flatMap((outfit) => outfit.picNames));
  const menuPicNames = uniqueNames(
    menuSections.flatMap((section) => section.items.map((item) => item.assignedPerson))
  );

  return (
    <>
      <Tabs.Root
        className={styles.tabRoot}
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as ViewPlanTab)}
      >
        <Tabs.List className={styles.tabs} aria-label="View Plan sections">
          {tabs.map(({ Icon, ...tab }) => (
            <Tabs.Tab className={styles.tab} key={tab.value} value={tab.value}>
              <Icon className={styles.tabIcon} size={16} aria-hidden="true" />
              <span>{tab.label}</span>
            </Tabs.Tab>
          ))}
        </Tabs.List>

        <div className={styles.panels}>
          <Tabs.Panel className={styles.panel} value="program">
            <ProgramSection items={programItems} picNames={programPicNames} />
          </Tabs.Panel>
          <Tabs.Panel className={styles.panel} value="outfit">
            <OutfitSection
              decisions={outfitDecisions}
              outfits={outfitPlans}
              picNames={outfitPicNames}
              onDecisionOpen={setActiveDecisions}
            />
          </Tabs.Panel>
          <Tabs.Panel className={styles.panel} value="menu">
            <MenuSection
              decisions={menuDecisions}
              picNames={menuPicNames}
              sections={menuSections}
              onDecisionOpen={setActiveDecisions}
            />
          </Tabs.Panel>
          <Tabs.Panel className={styles.panel} value="accommodation">
            <AccommodationSection
              accommodation={accommodation}
              decisions={accommodationDecisions}
              onDecisionOpen={setActiveDecisions}
            />
          </Tabs.Panel>
        </div>
      </Tabs.Root>

      <DecisionModal decisions={activeDecisions} onClose={() => setActiveDecisions([])} />
    </>
  );
}
