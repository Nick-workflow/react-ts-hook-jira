/*
 * @Author: YangTao(Niklaus)
 * @LastEditors: YangTao(Niklaus)
 * @LastEditTime: 2021-10-28 03:01:31
 * @Description: file content
 */

import styled from "@emotion/styled";
import { Typography } from "antd";
import { useDebounce, useDocumentTitle } from "utils";
import { useProjects } from "utils/project";
import { useUrlQueryParam } from "utils/url";
import { useUsers } from "utils/user";
import { List } from "./list";
import { SearchPanel } from "./search-panel";

export const ProjectListScreen = () => {
  // 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝对不可以放到依赖里
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);

  const debouncedParam = useDebounce(param, 500);

  const { isLoading, error, data: list } = useProjects(debouncedParam);

  const { data: users } = useUsers();

  useDocumentTitle("项目列表", false);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

// 针对单个组件查找无线循环原因
// ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
