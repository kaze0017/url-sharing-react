import { SharedLinkType } from "../../lib/interfaces";
import { IoIosLink } from "react-icons/io";
import ProfilePicture from "../profilePictures/ProfilePicture";
import ActionBtns from "./actionBtns/ActionBtns";
import GradientIcon from "../customIcons/GradientIcon";
import { CiPlay1 } from "react-icons/ci";
import { CiCamera } from "react-icons/ci";
import { Link } from "react-router-dom";
import FeaturedImage from "./featuredImages/FeaturedImage";
import { Paper } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

interface CardSharedMdProps {
  sharedLink: SharedLinkType;
}

export default function CardSharedMd({ sharedLink }: CardSharedMdProps) {
  if (!sharedLink) {
    return null;
  }
  const height = 264;
  const width = 264;

  const firstName = sharedLink.owner.first_name || "NA";
  const lastName = sharedLink.owner.last_name || "NA";

  const imgUrl = sharedLink.thumbnail || "";
  const mainWrapperClass = `flex flex-col justify-between items-center p-2 panel-light border border-gray-300 rounded-sm my-0 `;
  const mainWrapperStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };
  return (
    <Paper
      sx={{
        width: width,
        height: height,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        padding: 1,
      }}
    >
      <FeaturedImage
        sharedLink={sharedLink}
        twClass="h-[125px] w-full"
        hight={125}
      />
      <div className="w-full flex flex-col flex-grow">
        <Typography variant="h5" component="h3" color={"text.secondary"}>
          {sharedLink.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {sharedLink.contentDescription}
        </Typography>
      </div>

      <div className="w-full flex gap-1 items-center text-xs">
        {/* <IoIosLink /> */}
        <ProfilePicture
          user={sharedLink.owner}
          size="medium"
          clickable={false}
          hoverAnimation={false}
        />
        <div className="flex-flex-col">
          <Typography variant="body2" color="text.secondary">
            {firstName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {lastName}
          </Typography>
        </div>
        <div className="flex flex-grow"></div>
        <ActionBtns
          rank={sharedLink.rankCount || 0}
          shared={sharedLink.sharedCount || 0}
          saved={sharedLink.savedCount || 0}
          id={sharedLink.id || 0}
          link={sharedLink}
        />
      </div>
    </Paper>
    
  );
}

