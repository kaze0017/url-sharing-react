import { IconType } from "react-icons";
import { FiLink, FiSliders, FiLogOut } from "react-icons/fi";
import { BiLogoGraphql } from "react-icons/bi";
import { FaRegChartBar } from "react-icons/fa";

export interface menuLinkInterface {
  id: number;
  title: string;
  url: string;
  icon?: IconType;
}

const menuLinks: menuLinkInterface[] = [
  {
    id: 1,
    title: "Dashboard",
    url: "/",
    icon: FiLink,
  },
  {
    id: 2,
    title: "Link Management",
    url: "/linkmanagement",
    icon: FiLink,
  },
  {
    id: 3,
    title: "Networks",
    url: "/networks",
    icon: BiLogoGraphql,
  },
  {
    id: 4,
    title: "Settings",
    url: "/settings",
    icon: FiSliders,
  },
  {
    id: 5,
    title: "Reports",
    url: "/reports",
    icon: FaRegChartBar,
  },
  {
    id: 6,
    title: "Logout",
    url: "/logout",
    icon: FiLogOut,
  },
];

export default menuLinks;

// Settings Menu
