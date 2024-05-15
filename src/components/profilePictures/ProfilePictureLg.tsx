"use client";
import React from "react";
import { Link } from "react-router-dom";
import { PersonType } from "../../lib/interfaces";
import NotFound from "../NotFound";

interface ProfilePictureProps {
  person: PersonType | null;
}

const ProfilePictureLg: React.FC<ProfilePictureProps> = ({ person }) => {
  const size = 49;
  return person ? (
    <Link to={`/profile/${person.id}`}>
      <img
        src={
          person.profile_picture || "/images/defaults/personDefaultImage.png"
        }
        alt={person?.first_name + " " + person?.last_name}
        width={size}
        height={size}
        className="object-cover transition-transform transform hover:scale-110 rounded-full border-2 border-blue-500"
      />
    </Link>
  ) : (
    <NotFound title="person" size="text-lg" />
  );
};

export default ProfilePictureLg;
