import React from "react";
import { IconType } from "react-icons";

interface GradientIconProps {
  icon?: IconType;
  size?: string; // Size prop for icon size
}

const GradientIcon: React.FC<GradientIconProps> = ({ icon, size }) => {
  const Icon = icon || null;
  if (!Icon) {
    return null;
  }

  return (
    <div className="flex w-full h-full items-center justify-center">
      <svg width={0} height={0}>
        <linearGradient
          id="exampleColors"
          x1={0}
          y1={0}
          x2={1}
          y2={1}
          gradientTransform="rotate(0)"
        >
          <stop offset="0%" stopColor="#1430d5" />
          <stop offset="50%" stopColor="#5adf62" />
          <stop offset="100%" stopColor="#eef25a" />
        </linearGradient>
      </svg>
      <Icon size={size} style={{ fill: "url(#exampleColors)" }} />
    </div>
  );
};

export default GradientIcon;
