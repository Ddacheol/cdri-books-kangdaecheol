import { cn } from "cn";

export default function NoData({
  text = "결과없슴",
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center w-full ", className)}>
      <div className="max-w-20 max-h-20">
        <img src="/icons/icon_book.png" alt="데이터 없음" />
      </div>
      <span className="mt-6 typo-caption text-text-secondary">{text}</span>
    </div>
  );
}
