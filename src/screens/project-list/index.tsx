/*
 * @Author: YangTao(Niklaus)
 * @LastEditors: YangTao(Niklaus)
 * @LastEditTime: 2021-12-02 17:22:44
 * @Description: file content
 */

import {
  ButtonNoPadding,
  ErrorBox,
  Row,
  ScreenContainer,
} from "components/lib";
import { Profiler } from "components/profiler";
import { useDebounce, useDocumentTitle } from "utils";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { usePorjectsSearchParams, useProjectModal } from "./util";

// 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝对不可以放到依赖里
export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const { open } = useProjectModal();

  const [param, setParam] = usePorjectsSearchParams();

  const { isLoading, error, data: list } = useProjects(useDebounce(param, 500));

  const { data: users } = useUsers();

  return (
    <Profiler id="项目列表">
      <ScreenContainer>
        <Row between={true}>
          <h1>项目列表</h1>
          <ButtonNoPadding onClick={open} type="link">
            创建项目
          </ButtonNoPadding>
        </Row>

        <SearchPanel users={users || []} param={param} setParam={setParam} />
        <ErrorBox error={error} />
        <List loading={isLoading} users={users || []} dataSource={list || []} />
      </ScreenContainer>
    </Profiler>
  );
};

// 针对单个组件查找无线循环原因
// ProjectListScreen.whyDidYouRender = true;
