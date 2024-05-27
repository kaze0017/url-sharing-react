import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import UserProfileProvider from "./context/UserProfileProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <UserProfileProvider>
        <App />
      </UserProfileProvider>
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
