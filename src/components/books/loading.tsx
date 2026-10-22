import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export default function Loading({
  className,
  size = 60,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div className={cn("w-full flex items-center justify-center", className)}>
      <LoaderCircle className="animate-spin text-primary" size={size} />
    </div>
  );
}
