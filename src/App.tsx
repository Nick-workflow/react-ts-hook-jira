/*
 * @Author: YangTao(Niklaus)
 * @LastEditors: YangTao(Niklaus)
 * @LastEditTime: 2021-12-02 03:46:53
 * @Description: file content
 */

import React from "react";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorCallback, FullPageLoading } from "components/lib";
import { useAuth } from "context/auth-contex";
import "./App.css";

const AuthenticatedApp = React.lazy(() => import("authenticated-app"));
const UnauthenticatedApp = React.lazy(() => import("unauthenticated-app"));

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorCallback}>
        <React.Suspense fallback={<FullPageLoading />}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
