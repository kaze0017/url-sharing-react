"use client";
import React from "react";
import { PersonType } from "../../lib/interfaces";
import { Link } from "react-router-dom";

interface ProfilePictureProps {
  person: PersonType | null;
}

const ProfilePictureSm: React.FC<ProfilePictureProps> = ({ person }) => {
  const size = 32;
  return person ? (
    <Link to={`/profile/${person.id}`}>
      <img
        src={person.photo || "/images/defaults/personDefaultImage.png"}
        alt={person.firstName + " " + person.lastName}
        width={size}
        height={size}
        className="object-cover transition-transform transform hover:scale-110 rounded-full border-2 border-blue-500"
      />
    </Link>
  ) : null;
};

export default ProfilePictureSm;
