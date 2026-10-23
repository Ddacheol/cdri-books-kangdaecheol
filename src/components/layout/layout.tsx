import Header from "@/components/layout/header";
import { cn } from "cn";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div id="layout" className="flex flex-col min-h-dvh">
      <Header />
      <div
        className={cn(
          "flex-1 flex flex-col mx-auto w-full max-w-252 px-6 pt-40 pb-20",
          "xl:max-w-[53%]",
          "max-md:max-w-full",
          "max-sm:pt-20 max-sm:pb-10",
          "max-xs:pt-28",
        )}
      >
        {children}
      </div>
    </div>
  );
}
