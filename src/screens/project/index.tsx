/*
 * @Author: YangTao(Niklaus)
 * @LastEditors: YangTao(Niklaus)
 * @LastEditTime: 2021-10-28 00:04:43
 * @Description: file content
 */

import { Routes, Route, Navigate } from "react-router";
import { Link } from "react-router-dom";
import { EpicScreen } from "screens/epic";
import { KanbanScreen } from "screens/kanban";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to="kanban">看板</Link>
      <Link to="epic">任务组</Link>
      <Routes>
        <Route path="kanban" element={<KanbanScreen />} />
        <Route path="epic" element={<EpicScreen />} />
        <Route
          path="*"
          element={<Navigate to={window.location.pathname + "/kanban"} />}
        />
      </Routes>
    </div>
  );
};
