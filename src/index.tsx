import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import UserProfileProvider from "./context/UserProfileProvider";
import { Provider } from "react-redux";
import { store } from "./state/store";
import React from "react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import swDev from "./swDev.js";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <Provider store={store}>
        <UserProfileProvider>
          <App />
        </UserProfileProvider>
      </Provider>
    </AuthProvider>
  </BrowserRouter>
  //</React.StrictMode>
);
serviceWorkerRegistration.register();
swDev();
