import { useState, type ChangeEvent } from "react";
import NoData from "@/components/books/no-data";
import SearchInput from "@/pages/serach-books/components/search-input";
import DetailSearchPopover from "@/pages/serach-books/components/detail-search-popover";
import type { BookSearchForm } from "@/types/books";
import BookList from "@/components/books/book-list";
import { useInfiniteBooks } from "@/hooks/use-infinite-books";
import Loading from "@/components/books/loading";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";

export default function SearchBooks() {
  const [inputValue, setInputValue] = useState("");
  const [detailSearch, setDetailSearch] = useState<BookSearchForm>({
    query: "",
    target: "title",
  });

  const {
    books,
    totalCount,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteBooks(detailSearch);

  const observerRef = useInfiniteScroll({
    onLoad: fetchNextPage,
    hasNextPage,
    isLoading: isFetching,
  });

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleDeleteInput = () => {
    setInputValue("");
  };

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
          onChange={handleChangeInput}
          onDelete={handleDeleteInput}
          onSearch={handleSearch}
        />

        <DetailSearchPopover
          searchForm={detailSearch}
          onSearch={handleDetailSearch}
        />
      </div>
      <div className="flex flex-row items-center gap-4 mt-6 typo-caption">
        <span>도서 검색 결과</span>
        <span>
          총 <span className="text-primary">{totalCount}</span>건
        </span>
      </div>
      {isFetching && !isFetchingNextPage ? (
        <Loading className="py-30" size={60} />
      ) : books.length > 0 ? (
        <>
          <BookList books={books} />
          {isFetchingNextPage && <Loading className="py-5" size={30} />}
        </>
      ) : (
        <NoData text="검색된 결과가 없습니다." className="py-30" />
      )}
      <div ref={observerRef} className="h-1" />
    </main>
  );
}
