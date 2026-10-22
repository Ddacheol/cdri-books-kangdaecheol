import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>;

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-lg cursor-pointer disabled:cursor-default disabled:bg-gray disabled:hover:bg-gray disabled:active:bg-gray disabled:focus:bg-gray has-[[class*='ico-']]:gap-1 [&_.ico-arrow]:mt-0.5",
  {
    variants: {
      variant: {
        icon: "border-0 bg-transparent text-transparent disabled:bg-transparent disabled:hover:bg-transparent disabled:active:bg-transparent disabled:focus:bg-transparent",
        default: "bg-primary text-white hover:bg-primary/90",
        outline:
          "border-border bg-transparent hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
      },
      size: {
        default:
          "px-7 h-12 typo-caption has-[[class*='ico-']]:pl-5 has-[[class*='ico-']]:pr-4.5",
        sm: "px-2.5 h-9 typo-body-2",
        xs: "px-2.5 h-8.75 typo-body-2",
      },
      color: {
        primary: "",
        lightgray: "",
        gray: "",
      },
    },
    compoundVariants: [
      {
        variant: "icon",
        className:
          "size-8 p-0 has-[[class*='ico-']]:pl-0 has-[[class*='ico-']]:pr-0",
      },
      {
        variant: "default",
        color: "primary",
        className: "bg-primary text-white hover:bg-primary/90",
      },
      {
        variant: "default",
        color: "lightgray",
        className: "bg-lightgray text-text-secondary hover:bg-lightgray/90",
      },
      {
        variant: "default",
        color: "gray",
        className: "bg-text-subtitle text-white hover:bg-text-subtitle/90",
      },
      {
        variant: "outline",
        color: "primary",
        className: "bg-transparent text-white hover:bg-primary/90",
      },
      {
        variant: "outline",
        color: "gray",
        className:
          "bg-transparent border border-text-subtitle text-text-subtitle hover:bg-lightgray/90",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  color = "primary",
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, color }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
