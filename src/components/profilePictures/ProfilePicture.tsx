import React from "react";
import { Avatar } from "@mui/material";
import { UserProfileType } from "../../lib/interfaces";
import { useNavigate } from "react-router-dom";

interface UserProfileInterface {
  user: UserProfileType;
  size?: "small" | "medium" | "large";
  clickable?: boolean;
  hoverAnimation?: boolean;
}

export default function ProfilePicture({
  user,
  size = "medium",
  clickable = false,
  hoverAnimation = false,
}: UserProfileInterface) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/profile/${user.user_id}`);
  }

  return (
    <Avatar
      src={user.profile_picture}
      alt={`${user.first_name} ${user.last_name}`}
      onClick={clickable ? handleClick : undefined}
      sx={{
        width: size === "small" ? 24 : size === "large" ? 56 : null,
        height: size === "small" ? 24 : size === "large" ? 56 : null,
        cursor: clickable ? "pointer" : "default",
        "&:hover": hoverAnimation
          ? {
              transform: "scale(1.1)",
              transition: "transform 0.3s",
            }
          : {},
      }}
    >
      {user.first_name[0]?.toUpperCase() || "N"}
      {user.last_name[0]?.toUpperCase() || "A"}
    </Avatar>
  );
}
