/*
 * @Author: YangTao(Niklaus)
 * @LastEditors: YangTao(Niklaus)
 * @LastEditTime: 2021-11-25 16:03:03
 * @Description: file content
 */

import { useMemo, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject, subset } from "utils";

// 返回页面 url 中，指定键的参数值
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetURLSearchParam();
  const [stateKeys] = useState(keys);
  return [
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in K]: string;
        },
      [searchParams, stateKeys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params);
    },
  ] as const;
};

export const useSetURLSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};
