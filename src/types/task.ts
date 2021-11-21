/*
 * @Author: YangTao(Niklaus)
 * @LastEditors: YangTao(Niklaus)
 * @LastEditTime: 2021-11-16 00:14:21
 * @Description: file content
 */

export interface Task {
  id: number;
  name: string;
  // 经办人
  processorId: number;
  projectId: number;
  // 任务组
  epicId: number;
  kanbanId: number;
  // bug or task
  typeId: number;
  note: string;
}
