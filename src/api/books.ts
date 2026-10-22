import type { BookSearchParams, BookSearchResponse } from "@/types/books";
import { apiClient } from "@/api/client";

export const getBooksAPI = async (params: BookSearchParams) => {
  return apiClient
    .get<BookSearchResponse>("/v3/search/book", {
      params,
    })
    .then((res) => res.data);
};
