import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

type PreviousReunionPlaceholderProps = {
  year: string;
};

export function PreviousReunionPlaceholder({ year }: PreviousReunionPlaceholderProps) {
  return (
    <PlaceholderPage
      title={`Arkib ${year}`}
      description="Arkib ini belum diproses oleh pihak berwajib."
    />
  );
}
