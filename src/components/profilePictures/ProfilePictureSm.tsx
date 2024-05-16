"use client";
import React from "react";
import { Link } from "react-router-dom";
import { PersonType } from "../../lib/interfaces";

interface ProfilePictureProps {
  person: PersonType;
}

const ProfilePictureSm: React.FC<ProfilePictureProps> = ({
  person,
}: ProfilePictureProps) => {
  const size = 26;
  return (
    <Link to={`/profile/${person.id}`}>
      <img
        src={
          person.profile_picture || "/images/defaults/personDefaultImage.png"
        }
        alt={`${person.first_name} ${person.last_name}`}
        width={size}
        height={size}
        className="object-cover transition-transform transform hover:scale-110 rounded-full border-2 border-blue-500"
      />
    </Link>
  );
};

export default ProfilePictureSm;
