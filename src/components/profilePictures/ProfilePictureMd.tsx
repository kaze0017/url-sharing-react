"use client";
import React from "react";
import { UserProfileType } from "../../lib/interfaces";
import { Link } from "react-router-dom";

interface ProfilePictureProps {
  person: UserProfileType | null;
}

const ProfilePictureSm: React.FC<ProfilePictureProps> = ({ person }) => {
  const size = 32;
  return person ? (
    <Link to={`/profile/${person.id}`}>
      <img
        src={
          person.profile_picture || "/images/defaults/personDefaultImage.png"
        }
        alt={person.first_name + " " + person.last_name}
        width={size}
        height={size}
        className="object-cover transition-transform transform hover:scale-110 rounded-full border-2 border-blue-500"
      />
    </Link>
  ) : null;
};

export default ProfilePictureSm;
