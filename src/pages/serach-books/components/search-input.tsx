import { useRef, useState, type ChangeEventHandler } from "react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn, getLocalStorage, setLocalStorage } from "@/lib/utils";

type SearchInputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  disabled?: boolean;
  onSearch: (keyword: string) => void;
  onDelete: () => void;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = "검색어를 입력하세요",
  disabled,
  onSearch,
  onDelete,
}: SearchInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<string[]>(
    () => getLocalStorage("search_history") || [],
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const showHistory = isOpen && !disabled && history.length > 0;

  const handleSearch = (searchValue = value) => {
    const keyword = searchValue.trim();
    if (!keyword) return;

    const newHistory = [keyword, ...history.filter((item) => item !== keyword)];

    if (newHistory.length > 8) {
      newHistory.pop();
    }

    setHistory(newHistory);
    setLocalStorage("search_history", newHistory);
    setIsOpen(false);
    onSearch(keyword);
  };

  const handleDelete = (keyword: string) => {
    const newHistory = history.filter((item) => item !== keyword);

    setHistory(newHistory);
    setLocalStorage("search_history", newHistory);

    const input = inputRef.current;
    if (input) input.focus();
  };

  return (
    <div
      className={cn("relative w-full min-w-0", showHistory && "z-10")}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setIsOpen(false);
      }}
    >
      <InputGroup className={showHistory ? "rounded-b-none" : undefined}>
        <InputGroupAddon align="inline-start">
          <Button
            type="button"
            variant="icon"
            disabled={disabled}
            onClick={() => handleSearch()}
          >
            <i className="ico-search" />
          </Button>
        </InputGroupAddon>
        <InputGroupInput
          ref={inputRef}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onClick={() => setIsOpen(true)}
          onKeyUp={(event) => {
            if (event.key === "Tab") setIsOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.nativeEvent.isComposing) {
              event.preventDefault();
              handleSearch();
            }
          }}
        />
        {value && (
          <InputGroupAddon align="inline-end">
            <Button
              type="button"
              variant="icon"
              className="size-6"
              disabled={disabled}
              onClick={() => {
                onDelete();
                const input = inputRef.current;
                if (input) input.focus();
              }}
            >
              <i className="ico-close fill" />
            </Button>
          </InputGroupAddon>
        )}
      </InputGroup>
      {showHistory && (
        <ul
          className="absolute top-full left-0 m-0 pt-2 pb-4 max-h-150 w-full list-none overflow-y-auto rounded-b-[24px] bg-lightgray"
          onMouseDown={(event) => {
            const target = event.target as HTMLElement;
            if (!target.closest("button")) {
              event.preventDefault();
            }
          }}
        >
          {history.map((keyword) => (
            <li
              key={keyword}
              className="flex min-h-10 items-center pr-6.25 hover:bg-gray/50"
            >
              <button
                type="button"
                className="min-w-0 flex-1 cursor-pointer truncate py-2 pr-3 pl-[52px] text-left text-base text-text-subtitle"
                onClick={() => handleSearch(keyword)}
              >
                {keyword}
              </button>
              <Button
                type="button"
                variant="icon"
                className="size-6"
                onClick={() => handleDelete(keyword)}
              >
                <i className="ico-close" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
