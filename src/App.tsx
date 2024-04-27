import "./App.css";
import LoginPage from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Unauthorized from "./pages/Unauthorized";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import PanelMiddle from "./components/sideBars/PanelMiddle";
import LinkManagement from "./pages/LinkManagement";
import CreateLink from "./components/linkManagement/CreateLink";
import MainPanel from "./components/linkManagement/MainPanel";
import MemberManagement from "./pages/MemberManagement";
import Profile from "./pages/Profile";

function App() {
  const mainPanelWrapper =
    "border border-blue- 500 w-full h-full overflow-hidden flex flex-col items-center justify-center scrollbar-hide ";

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />}>
              <Route path="/" element={<PanelMiddle />} />
              <Route path="/LinkManagement" element={<LinkManagement />}>
                <Route path="/LinkManagement" element={<MainPanel />} />
                <Route
                  path="/LinkManagement/createLink"
                  element={<CreateLink />}
                />
              </Route>
              <Route path="/MemberManagement" element={<MemberManagement />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile/:userId" element={<Profile />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
