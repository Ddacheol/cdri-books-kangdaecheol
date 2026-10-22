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

  return {
    ...query,
    data: data.pages,
  };
};
