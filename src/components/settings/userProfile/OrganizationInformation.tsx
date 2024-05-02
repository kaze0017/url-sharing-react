import React from "react";
import SubmenuTitle from "../SubmenuTitle";

export default function OrganizationInformation() {
  return (
    <div className="flex flex-col w-full">
      <SubmenuTitle title="Organization Information" />
      <div className="flex gap-2">
        <div className="flex flex-col">
          <div className="">Organization Name</div>
          <div className="">Organization Type</div>
          <div className="">Organization Field</div>
        </div>
      </div>
    </div>
  );
}
