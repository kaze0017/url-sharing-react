import React, { useEffect, useState } from "react";
import { UserProfileType } from "../../lib/interfaces";
import { PiChartLineUp } from "react-icons/pi";
import { RiShareForwardLine } from "react-icons/ri";
import { Avatar } from "@mui/material";
import ConnectionActions from "./pageTitle/ConnectionActions ";
import ProfilePicture from "../profilePictures/ProfilePicture";
import ProfileQRCode from "../qrCode/ProfileQRCode";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface ProfilePageProps {
  person: UserProfileType;
}

export default function PageTitle({ person }: ProfilePageProps) {
  const [profileUrl, setProfileUrl] = useState<string>("");

  useEffect(() => {
    // Get the current URL from the browser
    const currentUrl = window.location.href;
    setProfileUrl(currentUrl);
  }, []);

  const fullName = person.first_name + " " + person.last_name;
  const rankShareClass = "flex flex-col items-center ";
  const iconTextClass =
    "text-xs text-gray-500 flex items-center justify-center gap-1 border-t-2 border-indigo-500";
  const subscribeWrapperClass = "flex flex-col items-center";

  return (
    <Paper
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        padding: 1,
      }}
    >
      <div className="p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <ProfileQRCode profileUrl={profileUrl} />
            <ProfilePicture
              user={person}
              size="large"
              clickable={false}
              hoverAnimation={false}
            />
            <div className="flex flex-col ml-2">
              <Typography variant="h5" component="h3" color={"text.secondary"}>
                {fullName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {person?.title}
              </Typography>
            </div>
          </div>

          <ConnectionActions person={person} />

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
    </Paper>
  );
}
