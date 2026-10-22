import FavoriteBooks from "@/pages/favorite-books";
import SearchBooks from "@/pages/search-books";

type RouterConfig = {
  Component: React.FC;
  path: string;
};

export const RoutesData: RouterConfig[] = [
  {
    Component: SearchBooks,
    path: "/",
  },
  {
    Component: FavoriteBooks,
    path: "/favorite-books",
  },
];
