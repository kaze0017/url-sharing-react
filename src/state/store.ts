import { configureStore } from "@reduxjs/toolkit";
import HomeReducer from "./home/homeSlice";
import LinkManagerReducer from "./linkManagement/linkManagementSlice";
import NetworksReducer from "./networks/networksSlice";
import RightPanelReducer from "./rightPanel/rightPanelSlice";
import LeftPanelReducer from "./leftPanel/leftPanelSlice";
import TopPanelReducer from "./topPanel/topPanelSlice";
import RelationsReducer from "./relations/relationsSlice";
import ShareReducer from "./share/shareSlice";
import NetworkGroupsReducer from "./networks/groupsSlice";
import CategoryReducer from "./linkManagement/categorySlice";
import LinkReducer from "./linkManagement/linkSlice";
import AUthReducer from "./auth/authSlice";
import SearchPeopleReducer from "./rightPanel/searchPeopleSlice";
import ConnectionReducer from "./connections/connectionsSlice";
import NotificationsReducer from "./notifications/notificationSlice";
import AlertsReducer from "./alerts/alertsSlice";
import RegisterReducer from "./loginAndRegister/registerSlice";
import LoginReducer from "./loginAndRegister/loginSlice";
import TopContents from "./home/topContentsSlice";
import profileSlice from "./profile/profileSlice";
import themeSlice from "./theme/themeSlice";
import loginAndRegisterSlice from "./loginAndRegister/loginAndRegisterSlice";

export const store = configureStore({
  reducer: {
    home: HomeReducer,
    linkManagement: LinkManagerReducer,
    networks: NetworksReducer,
    netWorkGroups: NetworkGroupsReducer,
    rightPanel: RightPanelReducer,
    leftPanel: LeftPanelReducer,
    relations: RelationsReducer,
    share: ShareReducer,
    category: CategoryReducer,
    link: LinkReducer,
    auth: AUthReducer,
    searchPeople: SearchPeopleReducer,
    connections: ConnectionReducer,
    notifications: NotificationsReducer,
    alerts: AlertsReducer,
    loginAndRegister: loginAndRegisterSlice,
    register: RegisterReducer,
    login: LoginReducer,
    hotContents: TopContents,
    profile: profileSlice,
    topPanel: TopPanelReducer,
    theme: themeSlice,
  },
});

export type AppStore = typeof store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = (
  dispatch: AppDispatch,
  getState: () => RootState
) => void;
