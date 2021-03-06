/*
 * @Author: YangTao(Niklaus)
 * @LastEditors: YangTao(Niklaus)
 * @LastEditTime: 2021-12-03 00:24:31
 * @Description: file content
 */

import { render, screen } from "@testing-library/react";
import { Mark } from "components/mark";

test("Mark 组件正确高亮关键词", () => {
  const name = "物料管理";
  const keyword = "管理";

  render(<Mark name={name} keyword={keyword} />);
  expect(screen.getByText(keyword)).toBeInTheDocument();
  expect(screen.getByText(keyword)).toHaveStyle("color: #257afd");
  expect(screen.getByText("物料")).not.toHaveStyle("color: #257afd");
});
