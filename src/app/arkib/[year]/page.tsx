import { PreviousReunionPlaceholder } from "@/features/placeholder/PreviousReunionPlaceholder";

type PageProps = {
  params: Promise<{
    year: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { year } = await params;

  return <PreviousReunionPlaceholder year={year} />;
}
