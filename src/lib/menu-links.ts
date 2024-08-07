import { IconType } from "react-icons";
import { FiLink, FiSliders, FiLogOut } from "react-icons/fi";
import { BiLogoGraphql } from "react-icons/bi";
import { FaRegChartBar } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";

export interface menuLinkInterface {
  id: number;
  title: string;
  url: string;
  icon?: IconType ; // Union type for icon
}

const menuLinks: menuLinkInterface[] = [
  {
    id: 1,
    title: "Dashboard",
    url: "/",
    icon: IoHomeOutline,
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
  {
    id: 7,
    title: "Share Links",
    url: "/shareLinks",
    icon: FiLink,
  },
];

export default menuLinks;

// Settings Menu
