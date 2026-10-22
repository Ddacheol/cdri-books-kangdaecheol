import BookList from "@/components/books/book-list";
import NoData from "@/components/books/no-data";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { getLocalStorage } from "@/lib/utils";
import type { Book } from "@/types/books";
import { useState } from "react";

export default function FavoriteBooks() {
  const PAGE_SIZE = 10;
  const [page, setPage] = useState<number>(1);
  const [books, setBooks] = useState<Book[]>(
    () => getLocalStorage("favorite_books") || [],
  );
  const currentBooks = books.slice(0, page * PAGE_SIZE);
  const hasNextPage = currentBooks.length < books.length;

  const observerRef = useInfiniteScroll({
    onLoad: () => {
      setPage((page) => page + 1);
    },
    hasNextPage,
  });

  return (
    <main>
      <h2 className="typo-title-2">내가 찜한 책</h2>
      <div className="flex flex-row items-center gap-4 mt-4 typo-caption">
        <span>찜한 책</span>
        <span>
          총 <span className="text-primary">{books.length}</span>건
        </span>
      </div>
      {currentBooks.length > 0 ? (
        <BookList books={currentBooks} onFavoriteBooksChange={setBooks} />
      ) : (
        <NoData text="찜한 책이 없습니다." className="py-30" />
      )}
      <div ref={observerRef} className="h-1" />
    </main>
  );
}
