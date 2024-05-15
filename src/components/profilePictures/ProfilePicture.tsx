import React from "react";
import { Link } from "react-router-dom";
import { PersonType } from "../../lib/interfaces";

interface ProfilePictureProps {
  person: PersonType | null;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ person }) => {
  return person ? (
    <div
      className={`relative inline-block rounded-full overflow-hidden  border-2 border-blue-500 `}
    >
      <Link to={`/profile/${person.id}`}>
        <img
          src={
            person.profile_picture || "/images/defaults/personDefaultImage.png"
          }
          alt={person.first_name + " " + person.last_name}
          width={32}
          height={32}
          className="object-cover transition-transform transform hover:scale-110"
        />
      </Link>
    </div>
  ) : null;
};

export default ProfilePicture;
