import { cn, getLocalStorage, regComma, setLocalStorage } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import type { Book } from "@/types/books";

export default function BookList({
  books = [],
  onFavoriteBooksChange,
}: {
  books: Book[];
  onFavoriteBooksChange?: (books: Book[]) => void;
}) {
  const [openIds, setOpenIds] = useState<string[]>([]);
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>(
    () => getLocalStorage("favorite_books") || [],
  );

  const handleClickPurchase = (url: string) => {
    window.open(url, "_blank");
  };

  const handleClickFavorite = (book: Book) => {
    const duplicate = favoriteBooks.find((item) => item.isbn === book.isbn);
    const newFavoriteBooks = duplicate
      ? favoriteBooks.filter((item) => item.isbn !== book.isbn)
      : [book, ...favoriteBooks];

    setFavoriteBooks(newFavoriteBooks);
    setLocalStorage("favorite_books", newFavoriteBooks);
    if (onFavoriteBooksChange) onFavoriteBooksChange(newFavoriteBooks);
  };

  return (
    <div className="pt-9">
      <Accordion multiple value={openIds} onValueChange={setOpenIds}>
        {books.map((book) => {
          const isOpen = openIds.includes(book.isbn);
          const isSalePrice =
            book.sale_price >= 0 && book.sale_price < book.price;

          return (
            <AccordionItem key={book.isbn} value={book.isbn}>
              <div className="flex items-start py-4 pl-12 pr-4 border-b-1 border-line max-md:pl-4 max-sm:flex-wrap max-sm:px-2">
                <div
                  className={cn(
                    "relative w-12 h-17 shrink-0 transition-[width,height] duration-300 ",
                    isOpen &&
                      "w-52.5 h-70 max-md:w-42.5 max-md:h-60 max-sm:w-32.5 max-sm:h-50",
                  )}
                >
                  <img
                    src={book.thumbnail || "/icons/icon_book.png"}
                    alt="책"
                    className={cn(
                      "absolute w-full h-full object-cover",
                      !book.thumbnail && "object-contain",
                    )}
                  />
                  <Button
                    type="button"
                    variant="icon"
                    className={cn(
                      "size-4 absolute top-0.5 right-0.5 transition-[width,height] duration-300",
                      isOpen && "size-6",
                    )}
                    onClick={() => {
                      handleClickFavorite(book);
                    }}
                  >
                    <i
                      className={cn(
                        "ico-heart",
                        favoriteBooks.some((item) => item.isbn === book.isbn) &&
                          "fill",
                      )}
                    />
                  </Button>
                </div>
                <div
                  className={cn(
                    "flex flex-1 flex-wrap items-center min-w-0 gap-x-4",
                    "mt-4 ml-12 transition-[margin] duration-300",
                    "max-sm:order-3 max-sm:mt-5 max-sm:ml-0",
                    "max-sm:basis-full max-sm:flex-col max-sm:items-start",
                    isOpen && "ml-8",
                  )}
                >
                  <span className="min-w-0 max-w-full flex-none typo-title-3 max-sm:typo-body-2-bold">
                    {book.title}
                  </span>
                  <div className="min-w-0 flex-1 basis-[max-content] flex items-center justify-between max-sm:w-full">
                    <span
                      className={cn(
                        "min-w-0 typo-body-2 transition duration-200 max-sm:typo-small",
                        isOpen && "text-text-subtitle",
                      )}
                    >
                      {book.authors.join(", ")}
                    </span>
                    <span
                      className={cn(
                        "shrink-0 whitespace-nowrap typo-title-3 max-sm:typo-body-2-bold ml-2",
                        isOpen
                          ? "opacity-0"
                          : "delay-200 opacity-100 duration-300",
                      )}
                    >
                      {regComma(isSalePrice ? book.sale_price : book.price)}원
                    </span>
                  </div>
                  <div
                    className={cn(
                      "basis-full pt-4 transition-opacity max-sm:pt-2",
                      isOpen ? "delay-250 opacity-100" : "opacity-0",
                    )}
                  >
                    <AccordionContent>
                      <span className="typo-body-2-bold">책 소개</span>
                      <div className="mt-3 typo-small whitespace-pre-wrap">
                        {book.contents || "내용이 없습니다."}
                      </div>
                    </AccordionContent>
                  </div>
                </div>
                <div
                  className={cn(
                    "flex-1 flex gap-2 mt-2 ml-14 max-w-[240px] shrink-0 max-md:ml-6 justify-end max-sm:max-w-full",
                    isOpen &&
                      "flex-col-reverse self-stretch items-end justify-between",
                  )}
                >
                  <Button
                    variant="default"
                    color="primary"
                    className={cn(
                      "max-sm:w-20 transition-opacity max-sm:delay-0 duration-300",
                      isOpen
                        ? "absolute invisible pointer-events-none opacity-0"
                        : "opacity-100 delay-200",
                    )}
                    onClick={() => {
                      handleClickPurchase(book.url);
                    }}
                  >
                    구매하기
                  </Button>
                  {isOpen && (
                    <div
                      className={cn(
                        "flex w-full flex-col items-end overflow-hidden",
                        "max-h-60 opacity-100",
                        "transition-[max-height,opacity] [transition-duration:0ms,300ms] delay-300",
                        "starting:max-h-0 starting:opacity-0",
                      )}
                    >
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1.5 text-right">
                          <span className="w-[33px] typo-small text-text-subtitle">
                            원가
                          </span>
                          <span
                            className={cn(
                              "typo-title-3 !font-light max-sm:typo-body-2",
                              isSalePrice ? "line-through" : "!font-bold",
                            )}
                          >
                            {regComma(book.price)}원
                          </span>
                        </div>
                        {isSalePrice && (
                          <div className="mt-2 flex items-center gap-1.5 text-right">
                            <span className="w-[33px] typo-small text-text-subtitle">
                              할인가
                            </span>
                            <span className="typo-title-3 max-sm:typo-body-2">
                              {regComma(book.sale_price)}원
                            </span>
                          </div>
                        )}
                      </div>
                      <Button
                        variant="default"
                        color="primary"
                        className="w-full mt-7 max-sm:mt-4 max-sm:max-w-[150px]"
                        onClick={() => {
                          handleClickPurchase(book.url);
                        }}
                      >
                        구매하기
                      </Button>
                    </div>
                  )}
                  <AccordionTrigger
                    render={
                      <Button
                        variant="default"
                        color="lightgray"
                        className="max-sm:w-20"
                      >
                        상세보기
                        <i
                          className={cn("ico-arrow", isOpen && "rotate-180")}
                        />
                      </Button>
                    }
                  ></AccordionTrigger>
                </div>
              </div>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
