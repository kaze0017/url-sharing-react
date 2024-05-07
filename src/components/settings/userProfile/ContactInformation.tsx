import { useState } from "react";
import SubmenuTitle from "../SubmenuTitle";
import EditableField from "../EditableField";
import SubSettingContainer from "../SubSettingContainer";

export default function ContactInformation() {
  const [email, setEmail] = useState<string>("Email");
  const [phone, setPhone] = useState<string>("Phone");
  const [address, setAddress] = useState<string>("Address");
  return (
    <SubSettingContainer title="Contact Information">
      <div className="flex gap-2">
        <div className="flex flex-col">
          <EditableField title="Email" value={email} setValue={setEmail} />
          <EditableField title="Phone" value={phone} setValue={setPhone} />
          <EditableField
            title="Address"
            value={address}
            setValue={setAddress}
          />
        </div>
      </div>
    </SubSettingContainer>
  );
}
