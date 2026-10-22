import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleTabValueChange = (value: string) => {
    navigate(value);
  };

  return (
    <header
      id="header"
      className="flex items-center gap-8 px-40 py-6 max-md:px-10 max-sm:px-6 max-md:justify-between"
    >
      <h1 className="whitespace-nowrap typo-title-1 leading-8 basis-143 max-md:basis-auto max-sm:typo-caption">
        CERTICOS BOOKS
      </h1>
      <Tabs
        value={pathname}
        onValueChange={handleTabValueChange}
        className="shrink-0"
      >
        <TabsList variant="line">
          <TabsTrigger value="/">도서 검색</TabsTrigger>
          <TabsTrigger value="/favorite-books">내가 찜한 책</TabsTrigger>
        </TabsList>
      </Tabs>
    </header>
  );
}
