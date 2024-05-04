"use client";
import React from "react";
import { Link } from "react-router-dom";

interface ProfilePictureProps {
  imageUrl: string;
  alt: string;
  className?: string;
  id?: number;
}

const ProfilePictureSm: React.FC<ProfilePictureProps> = ({
  imageUrl,
  alt,
  className,
  id = 2,
}) => {
  id = Math.floor(Math.random() * 6 + 1);
  return (
    <Link to={`/profile/${id}`}>
      <img
        src={imageUrl}
        alt={alt}
        width={40}
        height={40}
        className="object-cover transition-transform transform hover:scale-110 rounded-full border-2 border-blue-500 ${className}"
      />
    </Link>
  );
};

export default ProfilePictureSm;
