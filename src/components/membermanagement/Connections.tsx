import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import {
  acceptConnection,
  fetchConnections,
} from "../../state/connections/connectionsSlice";
import { addAlert } from "../../state/alerts/alertsSlice";
import { fetchNotifications } from "../../state/notifications/notificationSlice";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarProvider, useSnackbar } from "notistack";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

export default function Connections() {
  const dispatch = useDispatch<AppDispatch>();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { connections, requests } = useSelector(
    (state: RootState) => state.connections
  );
  console.log("connections", connections);
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );

  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [alarmOpen, setAlarmOpen] = React.useState(true);
  const handelClose = () => {
    setAlarmOpen(false);
  };

  async function handelAcceptConnection(event_id: number) {
    await dispatch(acceptConnection(event_id));
    console.log("acceptConnection in Connections.tsx", event_id);
  }

  useEffect(() => {
    async function loadConnections() {
      await dispatch(fetchConnections());
    }
    loadConnections();
    enqueueSnackbar("Welcome to the app!", {
      variant: "info",
      autoHideDuration: 7000,
    });
    setTimeout(() => {
      enqueueSnackbar("This is a success message", {
        variant: "success",
        autoHideDuration: 4000,
      });
    }, 2000);
    setTimeout(() => {
      enqueueSnackbar("This is an error message", {
        variant: "error",
        autoHideDuration: 4000,
      });
    }, 4000);
    setTimeout(() => {
      enqueueSnackbar("This is a warning message", {
        variant: "warning",
        autoHideDuration: 4000,
      });
    }, 6000);
  }, [dispatch]);

  return (
    <div className="panel-light flex w-full flex-col flex-grow">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Connected" value="1" />
            <Tab label="Pending" value="2" />
            <Tab label="Requests" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ul>
            {connections.map((connection: any, index) => (
              <li key={index} className="flex p-1 gap-2 items-center">
                <Avatar
                  alt={connection.first_name}
                  src={connection.profile_picture}
                  sx={{ width: 30, height: 30 }}
                >
                  {connection.first_name[0].toUpperCase()}
                  {connection.last_name[0].toUpperCase()}
                </Avatar>
                <p className="uppercase text-sm flex gap-1">
                  <span>{connection.first_name}</span>
                  <span>{connection.last_name}</span>
                </p>
              </li>
            ))}
          </ul>
        </TabPanel>
        <TabPanel value="2">
          <ul>
            {connections.map((connection, index) => (
              <li key={index}>{connection.name}</li>
            ))}
          </ul>
        </TabPanel>
        <TabPanel value="3">
          <ul>
            {requests.map((requests, index) => (
              <li key={index}>
                <Stack direction="column" spacing={1} padding={2}>
                  <Stack direction="row" spacing={2} padding={1}>
                    <Avatar
                      alt={requests.user_info.first_name}
                      src={
                        requests.user_info.profile_picture ||
                        "/images/defaults/personDefaultImage.png"
                      }
                      sx={{ width: 24, height: 24 }}
                    />
                    <h3>
                      {requests.user_info.first_name}{" "}
                      {requests.user_info.last_name}
                    </h3>
                  </Stack>
                  <Stack direction="row" spacing={2} padding={1}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handelAcceptConnection(requests.event_id)}
                    >
                      Accept
                    </Button>
                    <Button variant="contained" color="error">
                      Reject
                    </Button>
                  </Stack>
                </Stack>
              </li>
            ))}
          </ul>
        </TabPanel>
      </TabContext>
      {/* <Snackbar open={alarmOpen} autoHideDuration={3000} onClose={handelClose}>
        <Alert severity="success">This is a success Alert.</Alert>
      </Snackbar> */}
    </div>
  );
}
