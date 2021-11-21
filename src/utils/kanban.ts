/*
 * @Author: YangTao(Niklaus)
 * @LastEditors: YangTao(Niklaus)
 * @LastEditTime: 2021-11-16 00:16:11
 * @Description: file content
 */

import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "./http";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};
