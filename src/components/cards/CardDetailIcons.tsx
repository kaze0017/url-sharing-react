import { FiTrendingUp } from "react-icons/fi";
import { PiShareFatThin } from "react-icons/pi";
import { IoPricetagOutline } from "react-icons/io5";

interface Props {
  rank: number;
  shared: number;
  saved: number;
}

export default function CardDetailIcons(props: Props) {
  const wrapperClass =
    "flex items-center justify-around px-2 uppercase text-center h-full w-full";
  const iconCol =
    "text-gray-600 flex flex-col gap-1 justify-center items-center";
  const iconStyle = "";
  return (
    <div className={wrapperClass}>
      <div className={iconCol}>
        <p>{props.rank}</p>
        <FiTrendingUp className={iconStyle} />
      </div>
      <div className={iconCol}>
        <p>{props.shared}</p>
        <PiShareFatThin className={iconStyle} />
      </div>
      <div className={iconCol}>
        <p>{props.saved}</p>
        <IoPricetagOutline className={iconStyle} />
      </div>
    </div>
  );
}
