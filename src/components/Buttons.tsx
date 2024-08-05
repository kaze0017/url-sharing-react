import { IconType } from "react-icons";
import { Link } from "react-router-dom";
import { SvgIconComponent } from "@mui/icons-material"; // Import the MUI SvgIconComponent type


interface NavButtonProps {
  link: string;
  toggledCollapse: boolean | true;
  children: React.ReactNode;
  icon?: IconType | SvgIconComponent;
}

const NavButton: React.FC<NavButtonProps> = ({
  children,
  icon,
  link,
  toggledCollapse,
}) => {
  // btn class
  const btnClass = toggledCollapse
    ? "w-14 button transition-300"
    : "w-52 button transition-300";

  const btnTextClass = `btn-text animate-scale transition-300
       ${toggledCollapse ? "text-xl" : null}`;

  const key = toggledCollapse ? "collapsed" : "expanded";

  return (
    <Link to={link} className={btnClass} key={key}>
      <p className={btnTextClass}>
        {toggledCollapse ? icon && icon({}) : children}
      </p>
    </Link>
  );
};

export default NavButton;
