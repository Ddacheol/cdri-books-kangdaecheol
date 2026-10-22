import { useState } from "react";
import NoData from "@/components/books/no-data";
import SearchInput from "@/pages/serach-books/components/search-input";
import DetailSearchPopover from "@/pages/serach-books/components/detail-search-popover";
import type { DetailSearchParams } from "@/types/book";
import BookList from "@/components/books/book-list";

export default function SearchBooks() {
  const [inputValue, setInputValue] = useState<string>("");
  const [detailSearch, setDetailSearch] = useState<DetailSearchParams>({
    target: "title",
    query: "",
  });

  const handleSearch = (value: string) => {
    setInputValue(value);
    setDetailSearch({ target: "title", query: "" });
  };

  const handleDetailSearch = (condition: DetailSearchParams) => {
    setInputValue("");
    setDetailSearch(condition);
  };

  return (
    <main>
      <h2 className="typo-title-2">도서 검색</h2>
      <div className="flex flex-row items-center gap-4 mt-6 max-w-[568px] max-md:max-w-full">
        <SearchInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onDelete={() => setInputValue("")}
          onSearch={handleSearch}
        />

        <DetailSearchPopover
          value={detailSearch}
          onChange={setDetailSearch}
          onSearch={handleDetailSearch}
        />
      </div>
      <div className="flex flex-row items-center gap-4 mt-6 typo-caption">
        <span>도서 검색 결과</span>
        <span>
          총 <span className="text-primary">0</span>건
        </span>
      </div>
      {/* TODO:: 목록, 검색 결과 없을 때 분기 처리 */}
      <BookList />
      <NoData text="검색된 결과가 없습니다." className="py-30" />
    </main>
  );
}
