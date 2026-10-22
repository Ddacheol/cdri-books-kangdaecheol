import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "cn";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

const Select = SelectPrimitive.Root;

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  );
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  );
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default";
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        [
          // 기본 배치
          "flex w-fit items-center justify-between gap-1.5",
          // 크기
          "h-[36px]",
          // 외형 및 여백
          "border-b-1 border-line bg-transparent pr-1 pl-2",
          // 텍스트 및 전환
          "typo-body-2-bold whitespace-nowrap transition-colors outline-none select-none",
          // 포커스 및 목록 열림 상태
          "data-popup-open:border-primary data-popup-open:[&_i]:rotate-180",
          // 비활성화
          "disabled:cursor-not-allowed disabled:opacity-50",
          // 오류 상태
          "aria-invalid:border-red",
          // 플레이스홀더
          "data-placeholder:text-text-subtitle",
          // 선택값 배치
          "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5",
        ],
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <i
            className="ico-arrow type2 transition-transform ease-inout1 duration-200"
            aria-hidden="true"
          />
        }
        children={null}
      />
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 6,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = false,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            [
              // 위치 및 크기
              "relative isolate z-50 max-h-[250px] w-(--anchor-width)",
              // 스크롤 및 변환 기준
              "origin-(--transform-origin) overflow-x-hidden overflow-y-auto",
              // 외형
              "bg-white text-text-subtitle shadow-[0_0_4px_0_#00000040]",
              // 애니메이션 설정
              "duration-100 data-[align-trigger=true]:animate-none",
              // 방향별 애니메이션
              "data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              // 열림 상태
              "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
              // 닫힘 상태
              "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            ],
            // box-shadow: 0px 0px 4px 0px #00000040;
            className,
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("px-1.5 py-1 text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        [
          // 기본 배치
          "relative flex w-full cursor-default items-center gap-1.5",
          // 외형 및 여백
          "py-1 px-2",
          // 텍스트 및 선택
          "typo-body-2 outline-hidden select-none",
          // 포커스
          "focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground",
          // 비활성화
          "data-disabled:pointer-events-none data-disabled:opacity-50",
          // 아이콘
          "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          // 내부 요소 배치
          "*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        ],
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        [
          // 위치 및 배치
          "top-0 z-10 flex w-full cursor-default items-center justify-center",
          // 배경 및 여백
          "bg-popover py-1",
          // 아이콘
          "[&_svg:not([class*='size-'])]:size-4",
        ],
        className,
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        [
          // 위치 및 배치
          "bottom-0 z-10 flex w-full cursor-default items-center justify-center",
          // 배경 및 여백
          "bg-popover py-1",
          // 아이콘
          "[&_svg:not([class*='size-'])]:size-4",
        ],
        className,
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
