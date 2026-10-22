import { createCn } from "cn/config";

// 테마의 커스텀 타이포그래피를 색상이 아닌 글자 크기로 분류합니다.
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: ["md", "xxl"],
        },
      ],
    },
  },
});

export const getLocalStorage = (key: string) => {
  const value = window.localStorage.getItem(key);

  return value ? JSON.parse(value) : null;
};

export const setLocalStorage = (key: string, value: unknown) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const clearLocalStorage = (key: string) => {
  window.localStorage.removeItem(key);
};

export const regComma = (value: string | number | null) => {
  if (
    value !== null &&
    (typeof value === "string" || typeof value === "number")
  ) {
    const splitVal = value.toString().split(".");
    splitVal[0] = splitVal[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return splitVal.join(".");
  } else {
    return "-";
  }
};
