export type BookSearchParams = {
  query: string;
  sort?: "accuracy" | "latest";
  page?: number;
  size?: number;
  target?: "title" | "isbn" | "publisher" | "person";
};

export type DetailSearchParams = Required<
  Pick<BookSearchParams, "query" | "target">
>;
