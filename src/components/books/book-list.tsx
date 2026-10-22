import { cn, regComma } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useState } from "react";

export default function BookList() {
  const [openIds, setOpenIds] = useState<string[]>([]);

  return (
    <div className="pt-9">
      <Accordion multiple value={openIds} onValueChange={setOpenIds}>
        <AccordionItem value={"test"}>
          <div className="flex items-start py-4 pl-12 pr-4 border-b-1 border-line max-md:pl-4 max-sm:flex-wrap max-sm:px-2">
            <div
              className={cn(
                "relative w-12 h-17 transition-[width,height] duration-300",
                openIds.includes("test") &&
                  "w-52.5 h-70 max-md:w-42.5 max-md:h-60 max-sm:w-32.5 max-sm:h-50",
              )}
            >
              <img
                src="/images/mock_img.png"
                alt="책"
                className="absolute w-full h-full object-cover"
              />
              <Button
                type="button"
                variant="icon"
                className="size-4 absolute top-0.5 right-0.5"
                onClick={() => {}}
              >
                <i className="ico-heart fill" />
              </Button>
            </div>
            <div
              className={cn(
                "flex-1 flex flex-wrap items-center mt-4 ml-12 transition-[margin] duration-300 max-sm:mt-5 max-sm:order-3 max-sm:basis-full max-sm:ml-0",
                openIds.includes("test") && "ml-8",
              )}
            >
              <div className="flex-1 flex items-center gap-4">
                <span className="typo-title-3 max-sm:typo-body-2-bold">
                  고양이를 버리다
                </span>
                <span
                  className={cn(
                    "typo-body-2 transition duration-200 max-sm:typo-small",
                    openIds.includes("test") && "text-text-subtitle",
                  )}
                >
                  무라카미 하루키
                </span>
              </div>
              <span
                className={cn(
                  "typo-title-3 max-sm:typo-body-2-bold",
                  openIds.includes("test") && "hidden",
                )}
              >
                {regComma(13500)}원
              </span>
              <div
                className={cn(
                  "basis-full pt-4 transition-all-inout2 max-sm:pt-2",
                  openIds.includes("test")
                    ? "delay-250 opacity-100"
                    : "opacity-0",
                )}
              >
                <AccordionContent>
                  <span className="typo-body-2-bold">책 소개</span>
                  <div className="mt-3 typo-small">
                    “나를 언제까지나 잊지 마, 내가 여기 있었다는 걸 기억해 줘.”
                    <br />
                    <br /> 하루키 월드의 빛나는 다이아몬드
                    <br /> 무라카미 하루키를 만나기 위해 가장 먼저 읽어야 할 책!
                    <br />
                    <br /> 페이지를 처음 펼치는 오늘의 젊음들에게, 그리고 오랜
                    기억 속에 책의 한 구절을 간직하고 있는 어제의 젊음들에게,
                    한결같은 울림으로 예민하고 섬세한 청춘의 감성을 전하며
                    영원한 필독서로 사랑받고 있는 무라카미 하루키의 대표작
                    『노르웨이의 숲』. 1989년 『상실의 시대』라는 제명으로 처음
                    출간된 이래 우리 출판 사상 최장기 베스트셀러를 기록하며
                    하나의 사건으로 남은 소설, 『노르웨이의 숲』이 민음사
                    세계문학전집에 이어 단행본으로 출간되었다.
                  </div>
                </AccordionContent>
              </div>
            </div>
            <div
              className={cn(
                "flex-1 flex gap-2 mt-2 ml-14 max-w-[240px] shrink-0 max-md:ml-6 justify-end max-sm:max-w-full",
                openIds.includes("test") &&
                  "flex-col-reverse self-stretch items-end justify-between",
              )}
            >
              {!openIds.includes("test") && (
                <Button
                  variant="default"
                  color="primary"
                  className="max-sm:w-20"
                >
                  구매하기
                </Button>
              )}
              {openIds.includes("test") && (
                <div className="flex flex-col items-end w-full max-h-60 overflow-hidden opacity-100 transition-[max-height,opacity] [transition-duration:0ms,300ms] delay-300 starting:max-h-0 starting:opacity-0 motion-reduce:transition-none">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5 text-right">
                      <span className="w-[33px] typo-small text-text-subtitle">
                        원가
                      </span>
                      <del className="typo-title-3 !font-light max-sm:typo-body-2">
                        {regComma(16000)}원
                      </del>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-right">
                      <span className="w-[33px] typo-small text-text-subtitle">
                        할인가
                      </span>
                      <span className="typo-title-3 max-sm:typo-body-2">
                        {regComma(13500)}원
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="default"
                    color="primary"
                    className="w-full mt-7 max-sm:mt-4 max-sm:max-w-[150px]"
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
                      className={cn(
                        "ico-arrow",
                        openIds.includes("test") && "rotate-180",
                      )}
                    />
                  </Button>
                }
              ></AccordionTrigger>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
