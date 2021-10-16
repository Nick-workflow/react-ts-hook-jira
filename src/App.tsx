/*
 * @Author: YangTao(Niklaus)
 * @LastEditors: YangTao(Niklaus)
 * @LastEditTime: 2021-10-16 17:20:35
 * @Description: file content
 */

import { AuthenticatedApp } from "authenticated-app";
import { useAuth } from "context/auth-contex";
import { UnauthenticatedApp } from "unauthenticated-app";
import "./App.css";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
