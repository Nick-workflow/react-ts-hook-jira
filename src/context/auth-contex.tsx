/*
 * @Author: YangTao(Niklaus)
 * @LastEditors: YangTao(Niklaus)
 * @LastEditTime: 2021-10-24 03:03:34
 * @Description: file content
 */

import * as auth from "auth-provider";
import { FullPageErrorCallback, FullPageLoading } from "components/lib";
import React, { ReactNode } from "react";
import { User } from "screens/project-list/search-panel";
import { useMount } from "utils";
import { http } from "utils/http";
import { useAsync } from "utils/use-async";

interface AuthForm {
  username: string;
  password: string;
}

// 初始化 user
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContex = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContex.displayName = "AuthContex";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  // point free 消参 (参数相同)
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    run(bootstrapUser());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorCallback error={error} />;
  }

  return (
    <AuthContex.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContex);
  if (!context) {
    throw new Error("useAuth 必须在 AuthProvider 中使用");
  }
  return context;
};
