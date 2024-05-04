"use client";
import { IconType } from "react-icons";
import { FiLink, FiSliders } from "react-icons/fi";
import { BiLogoGraphql } from "react-icons/bi";
import { FaRegChartBar } from "react-icons/fa";
import React from "react";

export interface settingsMenuLinkInterface {
  id: number;
  title: mainListType;
  url: string;
  icon?: React.ComponentType;
  submenus?: { title: subListType; url: string; icon?: IconType }[];
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
        title: "Contact Information",
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
  {
    id: 6,
    title: "Communication",
    url: "/dashboard/settings/communication",
    icon: FaRegChartBar,
    submenus: [
      {
        title: "Chat Settings",
        url: "/dashboard/settings/communication/chat",
      },
      {
        title: "Email Preferences",
        url: "/dashboard/settings/communication/email",
      },
    ],
  },
  {
    id: 7,
    title: "Advanced Settings",
    url: "/dashboard/settings/advanced",
    icon: FaRegChartBar,
    submenus: [
      {
        title: "Network Settings",
        url: "/dashboard/settings/advanced/network",
      },
    ],
  },
  {
    id: 8,
    title: "Help & Support",
    url: "/dashboard/settings/help",
    icon: FaRegChartBar,
    submenus: [
      {
        title: "FAQs and User Guides",
        url: "/dashboard/settings/help/faqs",
      },
      {
        title: "Customer Support",
        url: "/dashboard/settings/help/support",
      },
    ],
  },
  {
    id: 9,
    title: "My Interests",
    url: "/dashboard/settings/interests",
    icon: FaRegChartBar,
    submenus: [
      {
        title: "My Interests",
        url: "/dashboard/settings/interests/myinterests",
      },
      {
        title: "Blocked Contents",
        url: "/dashboard/settings/interests/blocked",
      },
    ],
  },
  {
    id: 10,
    title: "Identity & Verification",
    url: "/dashboard/settings/identity",
    icon: FaRegChartBar,
    submenus: [
      {
        title: "My Identity",
        url: "/dashboard/settings/identity/myidentity",
      },
      {
        title: "Verification Status",
        url: "/dashboard/settings/identity/verification",
      },
    ],
  },
  {
    id: 11,
    title: "In-App Purchase",
    url: "/dashboard/settings/purchase",
    icon: FaRegChartBar,
    submenus: [
      {
        title: "My Credit",
        url: "/dashboard/settings/purchase/credit",
      },
      {
        title: "My Promotions",
        url: "/dashboard/settings/purchase/promotions",
      },
    ],
  },
];

export type mainListType =
  | "User Profile"
  | "Notification"
  | "Privacy & Security"
  | "Display & interface"
  | "Account Management"
  | "Communication"
  | "Advanced Settings"
  | "Help & Support"
  | "My Interests"
  | "Identity & Verification"
  | "In-App Purchase";

export const mainList: mainListType[] = [
  "User Profile",
  "Notification",
  "Privacy & Security",
  "Display & interface",
  "Account Management",
  "Communication",
  "Advanced Settings",
  "Help & Support",
  "My Interests",
  "Identity & Verification",
  "In-App Purchase",
];

export type subListType =
  | "Personal Information"
  | "Organization Information"
  | "Password & Security"
  | "Contact Information"
  | "Email Notification"
  | "Push Notification"
  | "Sound Notification"
  | "Privacy settings"
  | "Data Management"
  | "Theme & Appearance"
  | "Language"
  | "Accessibility"
  | "Subscription Details"
  | "Connected Accounts"
  | "Chat Settings"
  | "Email Preferences"
  | "Network Settings"
  | "FAQs and User Guides"
  | "Customer Support"
  | "My Interests"
  | "Blocked Contents"
  | "My Identity"
  | "Verification Status"
  | "My Credit"
  | "My Promotions";

export const subList: subListType[] = [
  "Personal Information",
  "Organization Information",
  "Password & Security",
  "Contact Information",
  "Email Notification",
  "Push Notification",
  "Sound Notification",
  "Privacy settings",
  "Data Management",
  "Theme & Appearance",
  "Language",
  "Accessibility",
  "Subscription Details",
  "Connected Accounts",
  "Chat Settings",
  "Email Preferences",
  "Network Settings",
  "FAQs and User Guides",
  "Customer Support",
  "My Interests",
  "Blocked Contents",
  "My Identity",
  "Verification Status",
  "My Credit",
  "My Promotions",
];
