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
import NetworkMainPanel from "./components/membermanagement/MainPanel";
import MemberManagement from "./pages/MemberManagement";
import Profile from "./pages/Profile";
import SharedLink from "./pages/SharedLink";
import Editor from "./components/membermanagement/Editor";
import Reports from "./pages/Reports";
import LogOut from "./pages/LogOut";

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
              <Route path="/linkManagement" element={<LinkManagement />}>
                <Route path="/linkManagement" element={<MainPanel />} />
                <Route
                  path="/linkManagement/createLink"
                  element={<CreateLink />}
                />
              </Route>
              <Route path="/networks" element={<MemberManagement />}>
                <Route path="/networks" element={<NetworkMainPanel />} />
                <Route path="/networks/editor/:id" element={<Editor />} />
                <Route path="/networks/editor/" element={<Editor />} />
              </Route>
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/sharedLink/:linkId" element={<SharedLink />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/logout" element={<LogOut />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
