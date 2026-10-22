import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// 단독 Input과 InputGroup이 공유하는 외형입니다.
const inputVariants = cva(
  [
    "h-[50px] w-full min-w-0 text-base text-text-primary transition-colors outline-none truncate",
    "placeholder:text-text-subtitle",
    "disabled:cursor-not-allowed disabled:opacity-50 has-disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        search: "rounded-[24px] border-0 bg-lightgray px-2.5 ",
        underline:
          "h-[36px] text-sm rounded-none border-b-1 border-line bg-transparent px-[9.45px] focus-within:border-primary ",
        // 그룹이 외형을 담당할 때 내부 입력 요소에 사용합니다.
        plain: "rounded-none border-0 bg-transparent px-0 shadow-none ring-0",
      },
    },
    compoundVariants: [
      {
        variant: ["search", "underline"],
        className:
          "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 has-[[aria-invalid=true]]:border-destructive has-[[aria-invalid=true]]:ring-2 has-[[aria-invalid=true]]:ring-destructive/20",
      },
    ],
    defaultVariants: {
      variant: "search",
    },
  },
);

function Input({
  className,
  type,
  variant = "search",
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Input, inputVariants };
