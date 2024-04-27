"use client";
import { useState, useRef, useEffect } from "react";
import ProfilePicture from "../ProfilePicture";
import { getOwner } from "../../lib/actions";
import NavButton from "../Buttons";
import menuLinks from "../../lib/menu-links";
import LogoProfile from "../LogoProfile";
import InfoReport from "../InfoReport";
import { FiMenu, FiX } from "react-icons/fi";
import { useDraggable } from "react-use-draggable-scroll";

interface PanelLeftProps {
  className?: string;
}

const PanelLeft: React.FC<PanelLeftProps> = ({ className }) => {
  // Hooks
  const [toggledCollapse, setToggleCollapse] = useState(false);

  // panel css classes
  const panelWrapper = `flex flex-col items-center gap-1 p-1 pb-2  transition-500 grow h-full overflow-x-hidden overflow-y-hidden scrollbar-hide
  ${toggledCollapse ? "min-w-20 w-20 max-w-20" : "min-w-60 w-60 max-w-60"} relative
  panel-light
  text-gray-900
  `;

  // toggle button css classes
  const toggleButtonClasses = `flex flex-row-reverse cursor-pointer p-4 text-gray items-center  h-6 w-full 
  ${!toggledCollapse ? "justify-start" : "justify-center"}
  `;

  // Profile wrapper css classes
  const profileWrapperClasses = "flex flex-col items-center gap-4 h-80 pb-4";

  // Button wrapper css classes
  const panelBtnsWrapper = "flex flex-col gap-2";

  // Links and Categories wrapper css classes
  const flexWrapper = toggledCollapse
    ? "flex flex-col items-center justify-center gap-2"
    : "flex gap-2";
  const publicationsWrapper = "flex flex-col items-center gap-1";

  // Name and title wrapper css classes
  const nameTitleWrapper = "flex flex-col items-center gap-1";

  //  Space div css classes
  const growingDivClasses = "flex flex-grow";

  const user = getOwner();

  // functions
  const handelLeftPanelToggle = () => {
    setToggleCollapse(!toggledCollapse);
  };

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 960) {
        setToggleCollapse(true);
      }
    });
  }, []);

  return (
    <div ref={ref} className={panelWrapper} {...events}>
      <div
        id="leftPanelToggleBtn"
        className={toggleButtonClasses}
        onClick={() => handelLeftPanelToggle()}
      >
        {!toggledCollapse ? (
          <FiX className="text-2xl text-gray-800" />
        ) : (
          <FiMenu className="text-2xl text-gray-800 text-center" />
        )}
      </div>

      {/* Profile */}
      <div className={profileWrapperClasses}>
        <div className="flex flex-col items-center gap-4">
          {/* Profile picture */}
          <ProfilePicture
            size={64}
            imageUrl="https://randomuser.me/api/portraits/women/94.jpg"
            alt="profile"
          />
          {/* subscribers */}
          <InfoReport
            title="subscribers"
            data={user.publications.categories?.length}
          />
        </div>
        {/* User Name */}
        {toggledCollapse ? null : (
          <div className={nameTitleWrapper}>
            <h3>{user.name}</h3>
            <h4>{user.title}</h4>
          </div>
        )}
        <div className={publicationsWrapper}>
          {toggledCollapse ? null : <h3>Publications</h3>}
          <div className={flexWrapper}>
            <InfoReport
              title="Categories"
              data={user.publications.categories?.length}
            />
            <InfoReport title="Links" data={user.publications.links?.length} />
          </div>
        </div>
      </div>
      {/* Nav Menu */}
      <div className={panelBtnsWrapper}>
        {menuLinks.map((link) => (
          <NavButton
            key={link.id}
            link={link.url}
            icon={link.icon}
            toggledCollapse={toggledCollapse}
          >
            {link.title}
          </NavButton>
        ))}
      </div>
      {/* Space */}
      <div className={growingDivClasses}></div>
      {/* Logo Profile */}
      <LogoProfile toggledCollapse={toggledCollapse} />
    </div>
  );
};

export default PanelLeft;
