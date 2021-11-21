/*
 * @Author: YangTao(Niklaus)
 * @LastEditors: YangTao(Niklaus)
 * @LastEditTime: 2021-11-16 00:19:03
 * @Description: file content
 */

import { useQuery } from "react-query";
import { Task } from "types/task";
import { useHttp } from "./http";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};
