import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchInput from "./serach-books/components/search-input";
import NoData from "@/components/books/no-data";

const searchOptions = [
  { label: "선택", value: null },
  { label: "제목", value: "title" },
  { label: "저자명", value: "person" },
  { label: "출판사", value: "publisher" },
];

export default function Guide() {
  const [keyword, setKeyword] = useState("");

  return (
    <>
      <main className="flex gap-2">
        <Button variant="default">구매하기</Button>
        <Button variant="default" color="lightgray">
          상세보기
          <i className="ico-arrow" />
        </Button>
        <Button variant="default" color="primary" size="sm">
          검색하기
        </Button>
        <Button variant="outline" color="gray" size="xs">
          상세검색
        </Button>
      </main>
      <br />
      <div className="flex items-start gap-1 max-w-[360px]">
        <Select items={searchOptions}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {searchOptions.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input variant="underline" placeholder="검색어 입력" />
      </div>
      <div>
        <SearchInput
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          onDelete={() => setKeyword("")}
          onSearch={(searchValue) => {
            setKeyword(searchValue);
            alert("search");
          }}
        />
      </div>
      <NoData text="찜한 책이 없습니다." />
    </>
  );
}
