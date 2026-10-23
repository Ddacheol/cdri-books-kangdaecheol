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
      className="fixed w-full flex items-center gap-8 px-40 py-6 bg-white z-999 max-md:px-10 max-sm:px-6 max-md:justify-between max-xs:flex-col max-xs:items-start max-xs:gap-2 max-xs:py-4"
    >
      <h1 className="whitespace-nowrap typo-title-1 leading-8 basis-143 max-md:basis-auto max-sm:typo-caption">
        CERTICOS BOOKS
      </h1>
      <Tabs
        value={pathname}
        onValueChange={handleTabValueChange}
        className="max-xs:mt-1"
      >
        <TabsList variant="line">
          <TabsTrigger value="/">도서 검색</TabsTrigger>
          <TabsTrigger value="/favorite-books">내가 찜한 책</TabsTrigger>
        </TabsList>
      </Tabs>
    </header>
  );
}
