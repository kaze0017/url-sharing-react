import React from "react";

interface FeedPanelProps {
  children: React.ReactNode;
}

export default function MainPanelWrapper({ children }: FeedPanelProps) {
  const mainWrapperClass =
    "h-full w-full flex flex-col gap-1 panel-light overflow-hidden p-1";

  return <div className={mainWrapperClass}>{children}</div>;
}
