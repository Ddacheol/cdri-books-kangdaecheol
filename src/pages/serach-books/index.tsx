import { useEffect, useState } from "react";
import NoData from "@/components/books/no-data";
import SearchInput from "@/pages/serach-books/components/search-input";
import DetailSearchPopover from "@/pages/serach-books/components/detail-search-popover";
import type { BookSearchForm } from "@/types/books";
import BookList from "@/components/books/book-list";
import { useInfiniteBooks } from "@/hooks/use-infinite-books";

export default function SearchBooks() {
  const [inputValue, setInputValue] = useState("");
  const [detailSearch, setDetailSearch] = useState<BookSearchForm>({
    query: "",
    target: "title",
  });

  const { data } = useInfiniteBooks(detailSearch);
  const books = data.flatMap((page) => page.documents);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSearch = (value: string) => {
    const query = value.trim();
    if (!query) return;

    setInputValue(query);
    setDetailSearch({ query });
  };

  const handleDetailSearch = (condition: BookSearchForm) => {
    const query = condition.query.trim();
    if (!query) return;

    const nextCondition = { ...condition, query };
    setInputValue("");
    setDetailSearch(nextCondition);
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
          key={JSON.stringify(detailSearch)}
          value={{
            target: detailSearch.target ?? "title",
            query: detailSearch.target ? detailSearch.query : "",
          }}
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
      {books.length > 0 ? (
        <BookList books={books} />
      ) : (
        <NoData text="검색된 결과가 없습니다." className="py-30" />
      )}
    </main>
  );
}
