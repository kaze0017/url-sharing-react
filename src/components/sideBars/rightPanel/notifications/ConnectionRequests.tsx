import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../state/store";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AvatarGroup from "@mui/material/AvatarGroup";
import {
  acceptConnection,
  rejectConnection,
} from "../../../../state/connections/connectionsSlice";

export default function ConnectionRequests() {
  const { requests } = useSelector((state: RootState) => state.connections);
  const dispatch = useDispatch<AppDispatch>();

  async function acceptRequest(id: number) {
    dispatch(acceptConnection(id));
  }
  async function declineRequest(id: number) {
    dispatch(rejectConnection(id));
  }

  return (
    <div className="w-full">
      {requests.length === 1 && (
        <div className="flex flex-col panel-light p-2">
          <div className="flex text-sm w-full items-center justify-between gap-1">
            <Avatar
              src={requests[0].user_info.profile_picture}
              alt={requests[0].user_info.first_name}
            />
            <div>{requests[0].user_info.first_name} wants to connect</div>
          </div>
          <div className="flex justify-end">
            <Button
              color="success"
              onClick={() => acceptRequest(requests[0].event_id)}
            >
              Accept
            </Button>
            <Button
              color="error"
              onClick={() => declineRequest(requests[0].event_id)}
            >
              Decline
            </Button>
          </div>
        </div>
      )}

      {requests.length > 1 && (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <AvatarGroup max={3}>
              {requests.map((request, index) => (
                <Avatar
                  key={index}
                  src={request.user_info.profile_picture}
                  alt={request.user_info.first_name}
                />
              ))}
              <p className="text-xs">Connections requests</p>
            </AvatarGroup>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-col gap-1 text-xs">
              {requests.map((request, index) => (
                <div
                  key={index}
                  className="flex flex-col panel-light p-2 w-full"
                >
                  <div className="flex text-sm w-full items-center gap-1">
                    <Avatar
                      src={request.user_info.profile_picture}
                      alt={request.user_info.first_name}
                      sx={{ width: 24, height: 24 }}
                    />
                    <div className="text-xs">
                      <p>
                        {request.user_info.first_name}{" "}
                        {request.user_info.last_name}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      color="success"
                      size="small"
                      onClick={() => acceptRequest(request.event_id)}
                    >
                      Accept
                    </Button>
                    <Button
                      color="error"
                      size="small"
                      onClick={() => declineRequest(request.event_id)}
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
}
