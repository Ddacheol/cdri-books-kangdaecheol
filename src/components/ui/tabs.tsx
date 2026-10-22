import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tabsListVariants = cva("group/tabs-list inline-flex w-fit items-center", {
  variants: {
    variant: {
      default: "gap-14 rounded-lg bg-lightgray p-1",
      line: "gap-14 max-sm:gap-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const triggerStyles = {
  base: [
    "relative inline-flex items-center justify-center pb-0.5 typo-body-1 whitespace-nowrap text-text-primary transition-colors cursor-pointer",
    "max-sm:typo-caption",
  ],

  interaction:
    "hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
  active: "data-active:text-text-primary data-active:cursor-default",
  button:
    "group-data-[variant=default]/tabs-list:rounded-md group-data-[variant=default]/tabs-list:data-active:bg-white group-data-[variant=default]/tabs-list:data-active:shadow-sm",
  line: "group-data-[variant=line]/tabs-list:border-b-1 group-data-[variant=line]/tabs-list:border-transparent group-data-[variant=line]/tabs-list:data-active:border-primary",
};

// 가로 탭만 지원합니다.
function Tabs({
  className,
  ...props
}: Omit<TabsPrimitive.Root.Props, "orientation">) {
  return (
    <TabsPrimitive.Root
      {...props}
      orientation="horizontal"
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
    />
  );
}

function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        triggerStyles.base,
        triggerStyles.interaction,
        triggerStyles.active,
        triggerStyles.button,
        triggerStyles.line,
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(
        "flex-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
