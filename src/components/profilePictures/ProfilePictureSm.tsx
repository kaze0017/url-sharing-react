"use client";
import React from "react";
import { Link } from "react-router-dom";
import { UserProfileType } from "../../lib/interfaces";

interface ProfilePictureProps {
  person: UserProfileType;
}

const ProfilePictureSm: React.FC<ProfilePictureProps> = ({
  person,
}: ProfilePictureProps) => {
  const size = 26;
  return (
    <Link to={`/profile/${person.user_id}`}>
      <div className="w-8 border border-blue-900 aspect-square  flex transition-transform transform hover:scale-110 rounded-full overflow-hidden items-center justify-center">
        <img
          src={
            person.profile_picture || "/images/defaults/personDefaultImage.png"
          }
          alt={`${person.first_name} ${person.last_name}`}
          width={size}
          height={size}
          className="w-full h-full object-cover"
        />
      </div>
    </Link>
  );
};

export default ProfilePictureSm;
