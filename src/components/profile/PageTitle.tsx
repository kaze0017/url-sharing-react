import { UserProfileType } from "../../lib/interfaces";
import { PiChartLineUp } from "react-icons/pi";
import { RiShareForwardLine } from "react-icons/ri";
import { Avatar } from "@mui/material";
import ConnectionActions from "./pageTitle/ConnectionActions ";

interface ProfilePageProps {
  person: UserProfileType;
}

export default function PageTitle({ person }: ProfilePageProps) {

  const fullName = person.first_name + " " + person.last_name;
  const rankShareClass = "flex flex-col items-center ";
  const iconTextClass =
    "text-xs text-gray-500 flex items-center justify-center gap-1 border-t-2 border-indigo-500";
  const subscribeWrapperClass = "flex flex-col items-center";

  

  return (
    <div className=" p-2">
      <div className="flex items-center justify-between">
        <div className="flex  items-center">
          <Avatar src={person.profile_picture} alt={fullName}>
            {person.first_name[0].toUpperCase()}
            {person.last_name[0].toUpperCase()}
          </Avatar>
          <div className="flex flex-col ml-2">
            <h1 className="text-2xl font-bold">{fullName}</h1>
            <p>{person?.title}</p>
          </div>
        </div>

        <ConnectionActions person={person} />

        {/* <Stack direction="row" spacing={2}>
          {relationState === "requestReceived" ? (
            <div className="flex flex-col items-center bg-slate-200 p-2 rounded-md">
              <p className="text-sm">
                {person.first_name} has sent you a connection request
              </p>
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
            </div>
          ) : relationState === "none" ? (
            <Button
              onClick={handleConnect}
              className="btn-primary ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={connectBtnState}
            >
              Connect
            </Button>
          ) : relationState === "connected" ? (
            <Button className="btn-primary ml-auto" onClick={handleUnFollow}>
              Un Follow
            </Button>
          ) : relationState === "requestSent" ? (
            <Button
              className="btn-primary ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleUnFollow}
            >
              Cancel Request
            </Button>
          ) : null}
        </Stack> */}
        <div className="flex gap-2">
          <div className={rankShareClass}>
            <p>{person?.rankCount}</p>
            <div className={iconTextClass}>
              <PiChartLineUp />
              <p>Rank</p>
            </div>
          </div>
          <div className={subscribeWrapperClass}>
            <p>{person?.subscribers?.length}</p>
            <p>Subscribe</p>
          </div>
          <div className={rankShareClass}>
            <p>{person?.sharesCount}</p>
            <div className={iconTextClass}>
              <p>Shares</p>
              <RiShareForwardLine />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
