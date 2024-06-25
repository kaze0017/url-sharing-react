import { IconType } from "react-icons";
interface Props {
  icon: IconType;
  title: string;
  callBacFunc?: () => void;
}

export default function MenuBtnCard({ icon: Icon, title, callBacFunc }: Props) {
  const mainWrapperClass =
    "flex flex-col gap-2 items-center justify-center w-36 h-36 panel-light text-center text-blue-950 uppercase cursor-pointer";
  const titleClass = "text-xs font-semibold";
  const iconSize = 44;
  return (
    <div className={mainWrapperClass} onClick={callBacFunc}>
      <div className="h-1/2 flex flex-col  w-full items-center justify-end">
        <Icon size={iconSize} />
      </div>
      <div className="h-1/2 flex flex-col  w-full items-center">
        <p className={titleClass}>{title}</p>
      </div>
    </div>
  );
}
