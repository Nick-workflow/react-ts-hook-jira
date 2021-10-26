/*
 * @Author: YangTao(Niklaus)
 * @LastEditors: YangTao(Niklaus)
 * @LastEditTime: 2021-10-26 18:09:54
 * @Description: file content
 */

import { AuthenticatedApp } from "authenticated-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorCallback } from "components/lib";
import { useAuth } from "context/auth-contex";
import { UnauthenticatedApp } from "unauthenticated-app";
import "./App.css";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorCallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
