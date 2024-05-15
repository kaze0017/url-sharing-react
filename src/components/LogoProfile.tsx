import { useState, useEffect } from "react";
import { PersonType } from "../lib/interfaces";
import ProfilePicture from "./profilePictures/ProfilePictureLg";
import { getTopPeople } from "../lib/actions";
import InfoReport from "./InfoReport";
function LogoProfile({ toggledCollapse = false }) {
  const defaultPerson: PersonType = {
    id: 0,
    first_name: "FAC ",
    last_name: "Logo",
    title: "Circle",
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
  const [people, setPeople] = useState<PersonType[]>([
    defaultPerson,
    defaultPerson,
    defaultPerson,
  ]);
  //   get top three people
  const topPeople = getTopPeople();

  //   set top three people
  useEffect(() => {
    setPeople(topPeople);
  }, []);

  //   LogoProfile css Classes
  const logoProfileWrapper = `relative`;
  const logoProfilePersonTC = `absolute top-0 left-8`;
  const logoProfilePersonBL = `absolute bottom-0 left-0`;
  const logoProfilePersonBR = `absolute bottom-0 right-0`;
  const logoProfileContainer = `flex flex-col gap-2 items-center text-center`;
  return (
    <div className={logoProfileContainer}>
      <InfoReport
        title={people[0].first_name + " " + people[0].last_name}
        data={people[0].publications.categories?.length}
      />
      {!toggledCollapse && (
        <div className={logoProfileWrapper}>
          <div className={logoProfilePersonTC}>
            <ProfilePicture person={people[0]} />
          </div>
          <div className={logoProfilePersonBL}>
            <ProfilePicture person={people[1]} />
          </div>
          <div className={logoProfilePersonBR}>
            <ProfilePicture person={people[2]} />
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
          <ProfilePicture person={people[0]} />
        </div>
      )}
    </div>
  );
}

export default LogoProfile;
