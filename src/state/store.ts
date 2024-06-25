import { configureStore } from "@reduxjs/toolkit";
import HomeReducer from "./home/homeSlice";
import LinkManagerReducer from "./linkManagement/linkManagementSlice";
import NetworksReducer from "./networks/networksSlice";
import RightPanelReducer from "./rightPanel/rightPanelSlice";
import RelationsReducer from "./relations/relationsSlice";
import ShareReducer from "./share/shareSlice"
import NetworkGroupsReducer from "./networks/groupsSlice";

export const store = configureStore({
  reducer: {
    home: HomeReducer,
    linkManagement: LinkManagerReducer,
    networks: NetworksReducer,
    netWorkGroups: NetworkGroupsReducer,
    rightPanel: RightPanelReducer,
    relations: RelationsReducer,
    share: ShareReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
