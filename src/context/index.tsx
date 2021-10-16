/*
 * @Author: YangTao(Niklaus)
 * @LastEditors: YangTao(Niklaus)
 * @LastEditTime: 2021-10-14 19:38:26
 * @Description: file content
 */

import { ReactNode } from "react";
import { AuthProvider } from "./auth-contex";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
