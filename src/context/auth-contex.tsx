/*
 * @Author: YangTao(Niklaus)
 * @LastEditors: YangTao(Niklaus)
 * @LastEditTime: 2021-11-06 02:09:20
 * @Description: file content
 */

import * as auth from "auth-provider";
import { FullPageErrorCallback, FullPageLoading } from "components/lib";
import { ReactNode, useCallback } from "react";
import { User } from "screens/project-list/search-panel";
import { useMount } from "utils";
import { http } from "utils/http";
import { useAsync } from "utils/use-async";
import * as authStore from "store/auth.slice";
import { useDispatch, useSelector } from "react-redux";

export interface AuthForm {
  username: string;
  password: string;
}

// 初始化 user
export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { error, isLoading, isIdle, isError, run } = useAsync<User | null>();

  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();

  useMount(() => {
    run(dispatch(authStore.bootstrap()));
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorCallback error={error} />;
  }

  return <div>{children}</div>;
};

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();

  const user = useSelector(authStore.selectUser);

  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );

  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );

  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);

  return { user, login, register, logout };
};
