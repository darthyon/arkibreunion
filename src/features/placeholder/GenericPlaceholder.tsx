import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

type GenericPlaceholderProps = {
  title?: string;
  description?: string;
};

export function GenericPlaceholder({ title, description }: GenericPlaceholderProps) {
  return <PlaceholderPage title={title} description={description} />;
}
