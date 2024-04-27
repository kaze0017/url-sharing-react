"use client";
import { IconType } from "react-icons";
import { FiLink, FiSliders } from "react-icons/fi";
import { BiLogoGraphql } from "react-icons/bi";
import { FaRegChartBar } from "react-icons/fa";
import React from "react";

export interface settingsMenuLinkInterface {
  id: number;
  title: string;
  url: string;
  icon?: React.ComponentType;
  submenus?: { title: string; url: string; icon?: IconType }[];
}

export const settingsMenuLinks: settingsMenuLinkInterface[] = [
  {
    id: 1,
    title: "User Profile",
    url: "/dashboard/settings/profile",
    icon: FiLink,
    submenus: [
      {
        title: "Personal Information",
        url: "/dashboard/settings/profile/personal",
      },
      {
        title: "Organization Information",
        url: "/dashboard/settings/profile/organization",
      },
      {
        title: "Password & Security",
        url: "/dashboard/settings/profile/password",
      },
      {
        title: "contact Information",
        url: "/dashboard/settings/profile/contact",
      },
    ],
  },
  {
    id: 2,
    title: "Notification",
    url: "/dashboard/settings/notification",
    icon: FiLink,
    submenus: [
      {
        title: "Email Notification",
        url: "/dashboard/settings/notification/email",
      },
      {
        title: "Push Notification",
        url: "/dashboard/settings/notification/sms",
      },
      {
        title: "Sound Notification",
        url: "/dashboard/settings/notification/push",
      },
    ],
  },
  {
    id: 3,
    title: "Privacy & Security",
    url: "/dashboard/settings/privacy",
    icon: BiLogoGraphql,
    submenus: [
      {
        title: "Privacy settings",
        url: "/dashboard/settings/privacy/privacy",
      },
      {
        title: "Data Management",
        url: "/dashboard/settings/privacy/data",
      },
    ],
  },
  {
    id: 4,
    title: "Display & interface",
    url: "/dashboard/settings/display",
    icon: FiSliders,
    submenus: [
      {
        title: "Theme & Appearance",
        url: "/dashboard/settings/display/theme",
      },
      {
        title: "Language",
        url: "/dashboard/settings/display/language",
      },
      {
        title: "Accessibility",
        url: "/dashboard/settings/display/accessibility",
      },
    ],
  },
  {
    id: 5,
    title: "Account Management",
    url: "/dashboard/settings/account",
    icon: FaRegChartBar,
    submenus: [
      {
        title: "Subscription Details",
        url: "/dashboard/settings/account/subscription",
      },
      {
        title: "Connected Accounts",
        url: "/dashboard/settings/account/connected",
      },
    ],
  },
];
