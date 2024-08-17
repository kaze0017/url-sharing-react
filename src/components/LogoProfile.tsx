import { UserProfileType } from "../lib/interfaces";
import InfoReport from "./InfoReport";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import ProfilePicture from "./profilePictures/ProfilePicture";

export default function LogoProfile({ toggledCollapse = false }) {
  const { topUsers } = useSelector((state: RootState) => state.leftPanel);

  //   LogoProfile css Classes
  const logoProfileWrapper = `relative w-100 h-100`;
  const logoProfilePersonTC = `absolute top-0  left-1/2 transform -translate-x-1/2`;
  const logoProfilePersonBL = `absolute bottom-0 left-0`;
  const logoProfilePersonBR = `absolute bottom-0 right-0`;
  const logoProfileContainer = `flex flex-col gap-2 items-center text-center`;
  return (
    <div className={logoProfileContainer}>
      {topUsers.length > 0 && (
        <>
          <InfoReport
            title={
              topUsers[0].first_name?.toUpperCase() +
              topUsers[0].last_name?.toUpperCase()
            }
            data={topUsers[0].publications?.categories?.length}
          />
          {!toggledCollapse ? (
            <div className={logoProfileWrapper}>
              {topUsers.slice(0, 3).map((user: UserProfileType, index) => (
                <div
                  className={
                    index === 0
                      ? logoProfilePersonTC
                      : index === 1
                      ? logoProfilePersonBL
                      : logoProfilePersonBR
                  }
                  key={index}
                >
                  <ProfilePicture
                    user={user}
                    size="medium"
                    clickable
                    hoverAnimation
                  />
                </div>
              ))}
              <img
                src="/images/logos/fac-logo-bars.png"
                alt="Vercel Logo"
                width={120}
                height={120}
              />
            </div>
          ) : (
            <div className="w-12">
              <ProfilePicture
                user={topUsers[0]}
                size="large"
                clickable
                hoverAnimation
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
