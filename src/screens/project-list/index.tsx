/*
 * @Author: YangTao(Niklaus)
 * @LastEditors: YangTao(Niklaus)
 * @LastEditTime: 2021-11-05 21:48:36
 * @Description: file content
 */

import styled from "@emotion/styled";
import { Typography } from "antd";
import { ButtonNoPadding, Row } from "components/lib";
import { useDispatch } from "react-redux";
import { useDebounce, useDocumentTitle } from "utils";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { List } from "./list";
import { projectListActions } from "./project-list.slice";
import { SearchPanel } from "./search-panel";
import { usePorjectsSearchParams } from "./util";

// 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝对不可以放到依赖里
export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = usePorjectsSearchParams();

  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 500));

  const { data: users } = useUsers();

  const dispatch = useDispatch();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding
          onClick={() => dispatch(projectListActions.openProjectModal())}
          type="link"
        >
          创建项目
        </ButtonNoPadding>
      </Row>

      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  );
};

// 针对单个组件查找无线循环原因
// ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
