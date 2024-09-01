import React from "react";
import QRCode from "qrcode.react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

interface ProfileQRCodeProps {
  profileUrl: string;
}

const ProfileQRCode: React.FC<ProfileQRCodeProps> = ({ profileUrl }) => {
  return (
    <QRCode
      value={profileUrl}
      size={50}
      level="H"
      includeMargin={true}
    />
  );
};

export default ProfileQRCode;
