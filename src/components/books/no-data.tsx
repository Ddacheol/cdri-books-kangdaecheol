import { cn } from "cn";
import { Button } from "@/components/ui/button";

export default function NoData({
  text = "검색된 결과가 없습니다.",
  className,
  onRetry,
}: {
  type?: "default" | "error";
  text: string;
  className?: string;
  onRetry?: () => void;
}) {
  return (
    <div
      className={cn(
        "flex-1 flex flex-col items-center justify-center w-full ",
        className,
      )}
    >
      <div className="max-w-20 max-h-20">
        <img src="/icons/icon_book.png" alt={text} />
      </div>
      <span className="mt-6 typo-caption text-text-secondary text-center whitespace-pre-wrap">
        {text}
      </span>
      {onRetry && (
        <Button
          className="mt-4"
          variant="default"
          color="primary"
          size="xs"
          onClick={onRetry}
        >
          재시도
        </Button>
      )}
    </div>
  );
}
