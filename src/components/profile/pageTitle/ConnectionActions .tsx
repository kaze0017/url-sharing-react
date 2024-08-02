import React, { useState, useEffect, useCallback } from "react";
import { UserProfileType } from "../../../lib/interfaces";
import { RootState, AppDispatch } from "../../../state/store";
import { useSelector, useDispatch } from "react-redux";
import { Button, Stack, CircularProgress } from "@mui/material";
import {
  connectToPerson,
  acceptConnection,
  removeConnection,
  rejectConnection,
  fetchConnections,
} from "../../../state/connections/connectionsSlice";
import { useSnackbar } from "notistack";

interface ConnectionActionsProps {
  person: UserProfileType;
}

const ConnectionActions = ({ person }: ConnectionActionsProps) => {
  const id = person.user_id as number;
  const { requests, connections } = useSelector(
    (state: RootState) => state.connections
  );
  const dispatch = useDispatch<AppDispatch>();
  const [relationState, setRelationState] = useState<
    "connected" | "requestReceived" | "requestSent" | "none"
  >("none");
  const [requestId, setRequestId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const updateRelationState = useCallback(() => {
    const request = requests.find(
      (request) => request.user_info.user_id === id
    );
    const connected = connections.find(
      (connection: any) => connection.user_id === id
    );

    if (request) {
      setRequestId(request.event_id);
      setRelationState("requestReceived");
    } else if (connected) {
      setRelationState("connected");
    } else {
      setRelationState("none");
    }
  }, [requests, connections, id]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchConnections());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      updateRelationState();
    }
  }, [loading, updateRelationState]);

  const handleConnect = async () => {
    const response : any = await dispatch(connectToPerson(id)).unwrap();
    console.log("connectToPerson in ConnectionActions.tsx", response);
      if (response.status >= 200 && response.status < 300) {
        setRelationState("requestSent");
        enqueueSnackbar("Connection request sent", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Failed to send connection request", {
          variant: "error",
        });
      }
  };

  const handleAcceptRequest = async () => {
    if (requestId) {
      const response : any = await dispatch(acceptConnection(requestId)).unwrap();
      if (response.status >= 200 && response.status < 300) {
        setRelationState("connected");
        enqueueSnackbar("Connection request accepted", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Failed to accept request", {
          variant: "error",
        });
      }
    }
  };

  const handleRejectRequest = async () => {
    if (requestId) {
      const response: any = await dispatch(
        rejectConnection(requestId)
      ).unwrap();

      if (response.status >= 200 && response.status < 300) {
        setRelationState("none");
        enqueueSnackbar("Connection request rejected", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Failed to reject request", {
          variant: "error",
        });
      }
    }
    setRelationState("none");
  };

  const handleUnFollow = async () => {
    const response = await dispatch(removeConnection(id)).unwrap();
    if (response.status === 200) {
      setRelationState("none");
      enqueueSnackbar("Connection removed", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("Failed to remove connection", {
        variant: "error",
      });
    }
  };

  const renderButtons = () => {
    switch (relationState) {
      case "requestReceived":
        return (
          <div className="flex flex-col items-center bg-slate-200 p-2 rounded-md">
            <p className="text-sm">
              {person.first_name} has sent you a connection request
            </p>
            <Stack direction="row" spacing={2}>
              <Button
                className="btn-primary ml-auto"
                color="success"
                onClick={handleAcceptRequest}
              >
                Accept
              </Button>
              <Button
                className="btn-primary ml-auto"
                color="error"
                onClick={handleRejectRequest}
              >
                Reject
              </Button>
            </Stack>
          </div>
        );
      case "none":
        return (
          <Button
            onClick={handleConnect}
            className="btn-primary ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Connect
          </Button>
        );
      case "connected":
        return (
          <Button
            className="btn-primary ml-auto"
            onClick={handleUnFollow}
            color="error"
          >
            Un Follow
          </Button>
        );
      case "requestSent":
        return (
          <Button
            className="btn-primary ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleUnFollow}
          >
            Cancel Request
          </Button>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Stack direction="row" spacing={2}>
      {renderButtons()}
    </Stack>
  );
};

export default ConnectionActions;
