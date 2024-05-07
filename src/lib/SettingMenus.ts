import React from "react";
import UserProfile from "../components/settings/userProfile/UserProfile";
import PersonalInformation from "../components/settings/userProfile/PersonalInformation";
import OrganizationInformation from "../components/settings/userProfile/OrganizationInformation";
import PasswordAnsSecurity from "../components/settings/userProfile/PasswordAnsSecurity";
import ContactInformation from "../components/settings/userProfile/ContactInformation";
import EmailNotification from "../components/settings/notification/EmailNotification";
import PushNotification from "../components/settings/notification/PushNotification";
import SoundNotification from "../components/settings/notification/SoundNotification";
import PrivacyAndSecurity from "../components/settings/privacyAndSecurity/PrivacyAndSecurity";
import PrivacySettings from "../components/settings/privacyAndSecurity/PrivacySettings";
import DataManagement from "../components/settings/privacyAndSecurity/DataManagement";
import ThemAndAppearance from "../components/settings/displayAndInterface/ThemAndAppearance";
import Language from "../components/settings/displayAndInterface/Language";
import Accessibility from "../components/settings/displayAndInterface/Accessibility";
import SubscriptionDetails from "../components/settings/accountManagement/SubscriptionDetails";
import ConnectedAccounts from "../components/settings/accountManagement/ConnectedAccounts";
import ChatSettings from "../components/settings/communication/ChatSettings";
import EmailPreference from "../components/settings/communication/EmailPreference";
import NetworkSettings from "../components/settings/advancedSettings/NetworkSettings";
import FAQsAndUserguids from "../components/settings/helpAndSupport/FAQsAndUserguids";
import CustomerSupport from "../components/settings/helpAndSupport/CustomerSupport";
import MyInterests from "../components/settings/myInterests/MyInterests";
import BlockedContents from "../components/settings/myInterests/BlockedContents";
import MyIdentity from "../components/settings/identityAndVerification/MyIdentity";
import VerificationStatus from "../components/settings/identityAndVerification/VerificationStatus";
import MyCredit from "../components/settings/inAppPurchase/MyCredit";
import MyPromotions from "../components/settings/inAppPurchase/MyPromotions";
import Notification from "../components/settings/notification/Notification";
import DisplayAndInterface from "../components/settings/displayAndInterface/DisplayAndInterface";
import AccountManagement from "../components/settings/accountManagement/AccountManagement";
import Communication from "../components/settings/communication/Communication";
import AdvancedSettings from "../components/settings/advancedSettings/AdvancedSettings";
import HelpAndSupport from "../components/settings/helpAndSupport/HelpAndSupport";
import InterestedContents from "../components/settings/myInterests/InterestedContents";
import IdentityAndVerification from "../components/settings/identityAndVerification/IdentityAndVerification";
import InAppPurchase from "../components/settings/inAppPurchase/InAppPurchase";

import { IconType } from "react-icons";
import { FiLink } from "react-icons/fi";
import { FaRegChartBar } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { ImDisplay } from "react-icons/im";
import { MdOutlineManageAccounts } from "react-icons/md";
import { GiSatelliteCommunication } from "react-icons/gi";
import { TbSettingsBolt } from "react-icons/tb";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { MdOutlineInterests } from "react-icons/md";
import { FiUserCheck } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";

import { CiUser } from "react-icons/ci";

export interface settingsMenuLinkInterface {
  id: number;
  title: mainListType;
  url: string;
  icon?: React.ComponentType;
  component: React.ComponentType;
  submenus?: {
    title: subListType;
    url: string;
    icon?: IconType;
    component: React.ComponentType;
  }[];
}

export type mainListType =
  | "User Profile"
  | "Notification"
  | "Privacy & Security"
  | "Display & interface"
  | "Account Management"
  | "Communication Preferences"
  | "Advanced Settings"
  | "Help & Support"
  | "My Interests"
  | "Identity & Verification"
  | "In-App Purchase";

export type subListType =
  | "Personal Information"
  | "Organization Information"
  | "Password & Security"
  | "Contact Information"
  | "Email Notification"
  | "Push Notification"
  | "Sound Notification"
  | "Privacy & Security"
  | "Privacy settings"
  | "Data Management"
  | "Theme"
  | "Language"
  | "Layout Customization"
  | "Accessibility"
  | "Subscription Details"
  | "Connected Accounts"
  | "Chat Settings"
  | "Email Preferences"
  | "Network Settings"
  | "FAQs and User Guides"
  | "Customer Support"
  | "Interested Contents"
  | "Blocked Contents"
  | "My Identity"
  | "Verification Status"
  | "My Credit"
  | "My Promotions";

type allListType = mainListType | subListType;

export const settingMap: { [key in allListType]: React.ComponentType<any> } = {
  "User Profile": UserProfile,
  "Personal Information": PersonalInformation,
  "Organization Information": OrganizationInformation,
  "Password & Security": PasswordAnsSecurity,
  "Contact Information": ContactInformation,
  Notification: Notification,
  "Email Notification": EmailNotification,
  "Push Notification": PushNotification,
  "Sound Notification": SoundNotification,
  "Privacy & Security": PrivacyAndSecurity,
  "Privacy settings": PrivacySettings,
  "Data Management": DataManagement,
  "Display & interface": DisplayAndInterface,
  Theme: ThemAndAppearance,
  Language: Language,
  "Layout Customization": ThemAndAppearance,
  Accessibility: Accessibility,
  "Account Management": AccountManagement,
  "Subscription Details": SubscriptionDetails,
  "Connected Accounts": ConnectedAccounts,
  "Communication Preferences": Communication,
  "Chat Settings": ChatSettings,
  "Email Preferences": EmailPreference,
  "Advanced Settings": AdvancedSettings,
  "Network Settings": NetworkSettings,
  "Help & Support": HelpAndSupport,
  "FAQs and User Guides": FAQsAndUserguids,
  "Customer Support": CustomerSupport,
  "My Interests": MyInterests,
  "Blocked Contents": BlockedContents,
  "Interested Contents": InterestedContents,
  "Identity & Verification": IdentityAndVerification,
  "My Identity": MyIdentity,
  "Verification Status": VerificationStatus,
  "In-App Purchase": InAppPurchase,
  "My Credit": MyCredit,
  "My Promotions": MyPromotions,
};

export const settingsMenuLinks: settingsMenuLinkInterface[] = [
  {
    id: 1,
    title: "User Profile",
    url: "/dashboard/settings/profile",
    icon: CiUser,
    component: UserProfile,
    submenus: [
      {
        title: "Personal Information",
        url: "/dashboard/settings/profile/personal",
        component: PersonalInformation,
      },
      {
        title: "Organization Information",
        url: "/dashboard/settings/profile/organization",
        component: OrganizationInformation,
      },
      {
        title: "Password & Security",
        url: "/dashboard/settings/profile/password",
        component: PasswordAnsSecurity,
      },
      {
        title: "Contact Information",
        url: "/dashboard/settings/profile/contact",
        component: ContactInformation,
      },
    ],
  },
  {
    id: 2,
    title: "Notification",
    url: "/dashboard/settings/notification",
    icon: IoIosNotificationsOutline,
    component: Notification,
    submenus: [
      {
        title: "Email Notification",
        url: "/dashboard/settings/notification/email",
        component: EmailNotification,
      },
      {
        title: "Push Notification",
        url: "/dashboard/settings/notification/sms",
        component: PushNotification,
      },
      {
        title: "Sound Notification",
        url: "/dashboard/settings/notification/push",
        component: SoundNotification,
      },
    ],
  },
  {
    id: 3,
    title: "Privacy & Security",
    url: "/dashboard/settings/privacy",
    icon: MdOutlinePrivacyTip,
    component: PrivacySettings,
    submenus: [
      {
        title: "Privacy settings",
        url: "/dashboard/settings/privacy/privacy",
        component: PrivacySettings,
      },
      {
        title: "Data Management",
        url: "/dashboard/settings/privacy/data",
        component: DataManagement,
      },
    ],
  },
  {
    id: 4,
    title: "Display & interface",
    url: "/dashboard/settings/display",
    icon: ImDisplay,
    component: ThemAndAppearance,
    submenus: [
      {
        title: "Theme",
        url: "/dashboard/settings/display/theme",
        component: ThemAndAppearance,
      },
      {
        title: "Language",
        url: "/dashboard/settings/display/language",
        component: Language,
      },
      {
        title: "Accessibility",
        url: "/dashboard/settings/display/accessibility",
        component: Accessibility,
      },
    ],
  },
  {
    id: 5,
    title: "Account Management",
    url: "/dashboard/settings/account",
    icon: MdOutlineManageAccounts,
    component: SubscriptionDetails,
    submenus: [
      {
        title: "Subscription Details",
        url: "/dashboard/settings/account/subscription",
        component: SubscriptionDetails,
      },
      {
        title: "Connected Accounts",
        url: "/dashboard/settings/account/connected",
        component: ConnectedAccounts,
      },
    ],
  },
  {
    id: 6,
    title: "Communication Preferences",
    url: "/dashboard/settings/communication",
    icon: GiSatelliteCommunication,
    component: Communication,
    submenus: [
      {
        title: "Chat Settings",
        url: "/dashboard/settings/communication/chat",
        component: ChatSettings,
      },
      {
        title: "Email Preferences",
        url: "/dashboard/settings/communication/email",
        component: EmailPreference,
      },
    ],
  },
  {
    id: 7,
    title: "Advanced Settings",
    url: "/dashboard/settings/advanced",
    icon: TbSettingsBolt,
    component: NetworkSettings,
    submenus: [
      {
        title: "Network Settings",
        url: "/dashboard/settings/advanced/network",
        component: NetworkSettings,
      },
    ],
  },
  {
    id: 8,
    title: "Help & Support",
    url: "/dashboard/settings/help",
    icon: IoHelpBuoyOutline,
    component: FAQsAndUserguids,
    submenus: [
      {
        title: "FAQs and User Guides",
        url: "/dashboard/settings/help/faqs",
        component: FAQsAndUserguids,
      },
      {
        title: "Customer Support",
        url: "/dashboard/settings/help/support",
        component: CustomerSupport,
      },
    ],
  },
  {
    id: 9,
    title: "My Interests",
    url: "/dashboard/settings/interests",
    icon: MdOutlineInterests,
    component: MyInterests,
    submenus: [
      {
        title: "Interested Contents",
        url: "/dashboard/settings/interests/myinterests",
        component: MyInterests,
      },
      {
        title: "Blocked Contents",
        url: "/dashboard/settings/interests/blocked",
        component: BlockedContents,
      },
    ],
  },
  {
    id: 10,
    title: "Identity & Verification",
    url: "/dashboard/settings/identity",
    icon: FiUserCheck,
    component: MyIdentity,
    submenus: [
      {
        title: "My Identity",
        url: "/dashboard/settings/identity/myidentity",
        component: MyIdentity,
      },
      {
        title: "Verification Status",
        url: "/dashboard/settings/identity/verification",
        component: VerificationStatus,
      },
    ],
  },
  {
    id: 11,
    title: "In-App Purchase",
    url: "/dashboard/settings/purchase",
    icon: IoCartOutline,
    component: MyCredit,
    submenus: [
      {
        title: "My Credit",
        url: "/dashboard/settings/purchase/credit",
        component: MyCredit,
      },
      {
        title: "My Promotions",
        url: "/dashboard/settings/purchase/promotions",
        component: MyPromotions,
      },
    ],
  },
];

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
  "Theme",
  "Language",
  "Accessibility",
  "Subscription Details",
  "Connected Accounts",
  "Chat Settings",
  "Email Preferences",
  "Network Settings",
  "FAQs and User Guides",
  "Customer Support",
  "Interested Contents",
  "Blocked Contents",
  "My Identity",
  "Verification Status",
  "My Credit",
  "My Promotions",
];
