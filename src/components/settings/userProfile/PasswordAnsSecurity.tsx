import SubmenuTitle from "../SubmenuTitle";

export default function PasswordAnsSecurity() {
  return (
    <div className="flex flex-col w-full">
      <SubmenuTitle title="Password & Security" />
      <div className="flex gap-2">
        <div className="pl-4 flex flex-col">
          <div className="">Change Password</div>
          <div className="">Two Factor Authentication</div>
        </div>
      </div>
    </div>
  );
}
