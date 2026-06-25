import { Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import styles from "./TukarHadiahPage.module.css";

type WishlistFormProps = {
  value?: string;
  onSave: (wishlist: string) => void;
};

export function WishlistForm({ value, onSave }: WishlistFormProps) {
  return (
    <form
      className={styles.wishlistForm}
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        onSave(String(formData.get("wishlist") ?? ""));
      }}
    >
      <FormField
        hint="Tulis apa yang anda suka, tak suka, atau benda yang jangan dibeli langsung."
        label="Wishlist Saya"
      >
        <textarea
          defaultValue={value}
          name="wishlist"
          placeholder="Contoh: suka stationery, tote bag, benda warna hijau. Elak mug sebab dah banyak."
          rows={5}
        />
      </FormField>

      <Button type="submit">
        <Save size={17} aria-hidden="true" />
        Save Wishlist
      </Button>
    </form>
  );
}
