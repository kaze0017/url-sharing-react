import React from "react";
import SubmenuTitle from "../SubmenuTitle";

export default function PersonalInformation() {
  return (
    <div className="flex w-full flex-col">
      <SubmenuTitle title="Personal Information" />
      <div className="flex gap-2">
        <div className="relative w-32 h-36">
          <picture className="absolute top-0 left-0 w-full h-full">
            <img
              className="object-cover w-full h-full rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="profile picture"
            />
          </picture>
          {/* shadow */}
          <div className="absolute left-0 -bottom-8 w-full h-8 rounded-full bg-[radial-gradient(50%_50%_at_50%_40%,rgba(0,0,0,0.40)_0%,rgba(255,255,255,0.00)_100%)]"></div>
        </div>
        <div className="flex flex-col">
          <div className="">name</div>
          <div className="">Gender</div>
          <div className="">UseName</div>
          <div className="">Bio</div>
        </div>
      </div>
    </div>
  );
}
