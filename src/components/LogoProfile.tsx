import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { UserProfileType } from "../lib/interfaces";
import ProfilePictureLg from "./profilePictures/ProfilePictureLg";
import InfoReport from "./InfoReport";
import { getTopUsers } from "../api/gets/getTopUsers";
import { Avatar } from "@mui/material";

function LogoProfile({ toggledCollapse = false }) {
  const defaultPerson: UserProfileType = {
    user_id: 0,
    first_name: "FAC ",
    last_name: "Logo",
    title: "Circle",
    email: "example@example.com",
    profile_picture: "/images/logos/circle.png",
    publications: {
      links: [
        {
          title: "",
          url: "",
        },
        {
          title: "",
          url: "",
        },
      ],
      categories: "",
    },
  };
  //   three people all with the same data as defaultPerson
  const [people, setPeople] = useState<UserProfileType[]>([
    defaultPerson,
    defaultPerson,
    defaultPerson,
  ]);

  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";
  useEffect(() => {
    async function getTopPeople() {
      const topUsers = await getTopUsers(token);
      setPeople(topUsers);
      return topUsers;
    }
    getTopPeople();
  }, [token]);
  //   get top three people
  // const topPeople = getTopPeople();

  // //   set top three people
  // useEffect(() => {
  //   setPeople(topPeople);
  // }, []);

  //   LogoProfile css Classes
  const logoProfileWrapper = `relative w-100 h-100`;
  const logoProfilePersonTC = `absolute top-0  left-1/2 transform -translate-x-1/2`;
  const logoProfilePersonBL = `absolute bottom-0 left-0`;
  const logoProfilePersonBR = `absolute bottom-0 right-0`;
  const logoProfileContainer = `flex flex-col gap-2 items-center text-center`;
  return (
    <div className={logoProfileContainer}>
      <InfoReport
        title={people[0].first_name + " " + people[0].last_name}
        data={people[0].publications?.categories?.length}
      />
      {!toggledCollapse && (
        <div className={logoProfileWrapper}>
          <div className={logoProfilePersonTC}>
            {/* <ProfilePictureLg person={people[0]} /> */}
            <Avatar
              src={people[0].profile_picture}
              alt={`${people[0].first_name} ${people[0].last_name}`}
            >
              {people[0].first_name[0].toUpperCase()}
              {people[0].last_name[0].toUpperCase()}
            </Avatar>
          </div>
          <div className={logoProfilePersonBL}>
            {/* <ProfilePictureLg person={people[1]} /> */}
            <Avatar
              src={people[1].profile_picture}
              alt={`${people[1].first_name} ${people[1].last_name}`}
            >
              {people[1].first_name[0]?.toUpperCase() || "N"}
              {people[1].last_name[0]?.toUpperCase() || "A"}
            </Avatar>
          </div>
          <div className={logoProfilePersonBR}>
            {/* <ProfilePictureLg person={people[2]} /> */}
            <Avatar
              src={people[2].profile_picture}
              alt={`${people[2].first_name} ${people[2].last_name}`}
            >
              {people[2].first_name[0].toUpperCase()}
              {people[2].last_name[0].toUpperCase()}
            </Avatar>
          </div>
          <img
            src="/images/logos/fac-logo-bars.png"
            alt="Vercel Logo"
            width={120}
            height={120}
          />
        </div>
      )}
      {toggledCollapse && (
        <div className="w-12">
          <ProfilePictureLg person={people[0]} />
        </div>
      )}
    </div>
  );
}

export default LogoProfile;
