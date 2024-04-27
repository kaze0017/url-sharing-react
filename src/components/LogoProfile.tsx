import { useState, useEffect } from "react";
import { Person } from "../lib/interfaces";
import ProfilePicture from "./ProfilePicture";
import { getTopPeople } from "../lib/actions";
import InfoReport from "./InfoReport";
function LogoProfile({ toggledCollapse = false }) {
  const defaultPerson: Person = {
    id: 0,
    name: "FAC Logo",
    title: "Circle",
    photo: "/images/logos/circle.png",
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
      categories: ["Business", "Leadership"],
    },
  };
  //   three people all with the same data as defaultPerson
  const [people, setPeople] = useState<Person[]>([
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
        title={people[0].name}
        data={people[0].publications.categories?.length}
      />
      {!toggledCollapse && (
        <div className={logoProfileWrapper}>
          <div className={logoProfilePersonTC}>
            <ProfilePicture
              imageUrl={people[0].photo}
              alt={people[0].name}
              size={48}
            />
          </div>
          <div className={logoProfilePersonBL}>
            <ProfilePicture
              imageUrl={people[1].photo}
              alt={people[1].name}
              size={48}
            />
          </div>
          <div className={logoProfilePersonBR}>
            <ProfilePicture
              imageUrl={people[2].photo}
              alt={people[2].name}
              size={48}
            />
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
          <ProfilePicture
            imageUrl={people[0].photo}
            alt={people[0].name}
            size={48}
          />
        </div>
      )}
    </div>
  );
}

export default LogoProfile;
