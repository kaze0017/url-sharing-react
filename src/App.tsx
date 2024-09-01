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
import InitialProfile from "./pages/InitialProfile";
import ShareLinks from "./pages/ShareLinks";
import ShareWithGroups from "./components/shareLinks/ShareWithGroups";
import Controller from "./components/shareLinks/Controller";
import Approval from "./components/shareLinks/Approval";
import ShareByDiagram from "./components/shareLinks/ShareByDiagram";
import ShareOnInternet from "./components/shareLinks/ShareOnInternet";
import EditLink from "./components/linkManagement/EditLink";
import Groups from "./components/membermanagement/Groups";
import Graphs from "./components/membermanagement/Graphs";
import Relations from "./components/membermanagement/Relations";
import Connections from "./components/membermanagement/Connections";
import MainGroupEditor from "./components/membermanagement/GEditor";
import CreateCategory from "./components/linkManagement/CreateCategory";
import Category from "./components/linkManagement/Category";
import AddLinksToCategory from "./components/linkManagement/AddLinksToCategory";
import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    // primary: {
    //   main: red[500],
    // },
    secondary: {
      main: "#f44336",
    },

  },
});

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />}>
                <Route path="/initialProfile" element={<InitialProfile />} />
                <Route path="/" element={<PanelMiddle />} />
                <Route path="/linkManagement" element={<LinkManagement />}>
                  <Route path="/linkManagement" element={<MainPanel />} />
                  <Route
                    path="/linkManagement/createLink"
                    element={<CreateLink />}
                  />
                  <Route
                    path="/linkManagement/createCategory"
                    element={<CreateCategory />}
                  />
                  <Route
                    path="/linkManagement/editLink/:id"
                    element={<EditLink />}
                  />
                  <Route
                    path="/linkManagement/category/:id"
                    element={<Category />}
                  />
                  <Route
                    path="/linkManagement/addLinksToCategory"
                    element={<AddLinksToCategory />}
                  />
                </Route>
                <Route path="/shareLinks" element={<ShareLinks />}>
                  <Route path="/shareLinks" element={<Controller />} />
                  <Route
                    path="/shareLinks/shareWithGroups"
                    element={<ShareWithGroups />}
                  />
                  <Route
                    path="/shareLinks/shareByDiagram"
                    element={<ShareByDiagram />}
                  />
                  <Route
                    path="/shareLinks/shareOnInternet"
                    element={<ShareOnInternet />}
                  />
                  <Route path="/shareLinks/approval" element={<Approval />} />
                </Route>
                <Route path="/networks" element={<MemberManagement />}>
                  <Route index element={<NetworkMainPanel />} />
                  <Route path="groups" element={<Groups />} />
                  <Route path="graphs" element={<Graphs />} />
                  <Route path="relations" element={<Relations />} />
                  <Route path="connections" element={<Connections />} />
                  <Route path="editor/:id" element={<Editor />} />
                  <Route path="groupEditor/" element={<MainGroupEditor />} />
                </Route>
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path="/sharedLink/:id" element={<SharedLink />} />
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
