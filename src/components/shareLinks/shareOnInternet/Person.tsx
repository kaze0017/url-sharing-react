import { useState, Component } from "react";
import { UserProfileType } from "../../../lib/interfaces";
import Switch from "react-switch";

export default function Person({ person }: { person: UserProfileType }) {
  const [selected, setSelected] = useState(false);
  const [toggleSwitch, setToggleSwitch] = useState(false);
  return (
    <div className="flex">
      <div className="flex flex-grow cursor-pointer" onClick={() => setSelected(!selected)}>
        <img
          src={person.profile_picture}
          alt={person.first_name}
          width={30}
          height={30}
          className="rounded-full"
        />
        <p>
          {person.first_name} {person.last_name}
        </p>
      </div>
      {selected && (
        // toggleSwitch
        <Switch
          checked={toggleSwitch}
          onChange={() => setToggleSwitch(!toggleSwitch)}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          uncheckedIcon={
            <p className="flex flex-grow border border-red-500">Contribute</p>
          }
          checkedIcon={<p>Tag</p>}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          handleDiameter={18}
          width={100}
          className="text-2xs uppercase"
        />
      )}
    </div>
  );
}
