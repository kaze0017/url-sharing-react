import SubmenuTitle from "../SubmenuTitle";
import SubSettingContainer from "../SubSettingContainer";

export default function PasswordAnsSecurity() {
  return (
    <SubSettingContainer title="Password & Security">
      <div className="flex gap-2">
        <div className="pl-4 flex flex-col">
          <div className="">Change Password</div>
          <div className="">Two Factor Authentication</div>
        </div>
      </div>
    </SubSettingContainer>
  );
}
