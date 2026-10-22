import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { BookSearchForm } from "@/types/books";

type DetailSearchPopoverProps = {
  value: BookSearchForm;
  onSearch: (value: BookSearchForm) => void;
};

const searchOptions = [
  { label: "제목", value: "title" },
  { label: "저자명", value: "person" },
  { label: "출판사", value: "publisher" },
];

export default function DetailSearchPopover({
  value: initialValue,
  onSearch,
}: DetailSearchPopoverProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<BookSearchForm>(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDelete = () => {
    setValue({ ...value, query: "" });
    const input = inputRef.current;
    if (input) input.focus();
  };

  const handleSearch = () => {
    const query = value.query.trim();
    if (!query) return;

    onSearch({ ...value, query });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={<Button variant="outline" color="gray" size="xs" />}
      >
        상세검색
      </PopoverTrigger>
      <PopoverContent className="bg-white">
        <PopoverHeader className="flex justify-end">
          <PopoverTitle className="sr-only">상세검색</PopoverTitle>
          <Button
            type="button"
            variant="icon"
            className="size-5"
            onClick={() => setOpen(false)}
          >
            <i className="ico-close gray" />
          </Button>
        </PopoverHeader>
        <form
          className="pt-2 px-4"
          onSubmit={(event) => {
            event.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex gap-1">
            <Select
              items={searchOptions}
              value={value.target}
              onValueChange={(target) => {
                if (target) setValue({ ...value, target });
              }}
            >
              <SelectTrigger className="flex-1 max-w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {searchOptions.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative min-w-0 flex-1">
              <Input
                ref={inputRef}
                value={value.query}
                onChange={(event) =>
                  setValue({ ...value, query: event.target.value })
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" && event.nativeEvent.isComposing) {
                    event.preventDefault();
                  }
                }}
                placeholder="검색어 입력"
                variant="underline"
                className="pr-9"
              />
              {value.query && (
                <Button
                  type="button"
                  variant="icon"
                  className="absolute top-1/2 right-1 size-4 -translate-y-1/2"
                  onClick={handleDelete}
                >
                  <i className="ico-close gray" />
                </Button>
              )}
            </div>
          </div>
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="mt-4 w-full"
            disabled={!value.query.trim()}
          >
            검색하기
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
