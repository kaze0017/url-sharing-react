"use client";
import React from "react";
import { Link } from "react-router-dom";
import { UserProfileType } from "../../lib/interfaces";
import NotFound from "../NotFound";

interface ProfilePictureProps {
  person: UserProfileType | null;
}

const ProfilePictureLg: React.FC<ProfilePictureProps> = ({ person }) => {
  const size = 49;
  return person ? (
    <Link to={`/profile/${person.id}`}>
      <div className="w-14 aspect-square border blue-red-500 flex transition-transform transform hover:scale-110 rounded-full overflow-hidden items-center justify-center">
        <img
          src={
            person.profile_picture || "/images/defaults/personDefaultImage.png"
          }
          alt={person?.first_name + " " + person?.last_name}
          className="w-full h-full object-cover"
        />
      </div>
    </Link>
  ) : (
    <NotFound title="person" size="text-lg" />
  );
};

export default ProfilePictureLg;
