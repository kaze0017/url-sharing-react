"use client";
import React from "react";
import { Link } from "react-router-dom";

interface ProfilePictureProps {
  size?: number;
  imageUrl: string;
  alt: string;
  className?: string;
  id?: number;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  size = 32,
  imageUrl,
  alt,
  className,
  id = 2,
}) => {
  id = Math.floor(Math.random() * 6 + 1);
  return (
    <div
      className={`relative inline-block rounded-full overflow-hidden w-${size}px h-${size}px border-2 border-blue-500 ${className}`}
    >
      <Link to={`/profile/${id}`}>
        <img
          src={imageUrl}
          alt={alt}
          width={size}
          height={size}
          className="object-cover transition-transform transform hover:scale-110"
        />
      </Link>
    </div>
  );
};

export default ProfilePicture;
