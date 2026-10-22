import { getBooksAPI } from "@/api/books";
import type { BookSearchForm } from "@/types/books";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteBooks = (form: BookSearchForm) => {
  const { data = { pages: [], pageParams: [] }, ...query } = useInfiniteQuery({
    queryKey: ["books", form],
    queryFn: ({ pageParam }) =>
      getBooksAPI({
        ...form,
        page: pageParam,
        size: 10,
        sort: "accuracy",
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.meta.is_end ? undefined : allPages.length + 1;
    },
    enabled: form.query.trim().length > 0,
  });

  const books = data.pages.flatMap((page) => page.documents);
  const totalCount = data.pages.length ? data.pages[0].meta.total_count : 0;

  return {
    ...query,
    books,
    totalCount,
  };
};
