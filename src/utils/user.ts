/*
 * @Author: YangTao(Niklaus)
 * @LastEditors: YangTao(Niklaus)
 * @LastEditTime: 2021-11-25 16:18:30
 * @Description: file content
 */

import { useQuery } from "react-query";
import { User } from "types/user";
import { cleanObject } from "utils";
import { useHttp } from "./http";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  return useQuery<User[]>(["users", param], () =>
    client("users", { data: cleanObject(param || {}) })
  );
};
