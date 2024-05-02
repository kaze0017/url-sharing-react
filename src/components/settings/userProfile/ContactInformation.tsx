import SubmenuTitle from "../SubmenuTitle";

export default function ContactInformation() {
  return (
    <div className="flex flex-col w-full">
      <SubmenuTitle title="Contact Information" />
      <div className="flex gap-2">
        <div className="flex flex-col">
          <div className="">Email</div>
          <div className="">Phone</div>
          <div className="">Address</div>
        </div>
      </div>
    </div>
  );
}
