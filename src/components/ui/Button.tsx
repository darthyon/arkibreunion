import Link from "next/link";
import styles from "./Button.module.css";

type ButtonBaseProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps & {
  href: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({ children, variant = "primary", ...props }: ButtonProps) {
  const className = `${styles.button} ${styles[variant]}`;

  if ("href" in props) {
    const { href } = props;

    if (typeof href === "string") {
      return (
        <Link className={className} href={href}>
          {children}
        </Link>
      );
    }
  }

  const { type = "button", ...buttonProps } = props as ButtonAsButton;

  return (
    <button className={className} type={type} {...buttonProps}>
      {children}
    </button>
  );
}
