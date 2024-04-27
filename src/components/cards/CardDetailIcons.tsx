import { FiTrendingUp } from "react-icons/fi";
import { PiShareFatThin } from "react-icons/pi";
import { IoPricetagOutline } from "react-icons/io5";

interface Props {
  rank: number;
  shared: number;
  saved: number;
}

export default function CardDetailIcons(props: Props) {
  const wrapperClass = "flex flex-col gap-1 justify-center items-center";
  const iconCol =
    "text-gray-600 flex flex-col gap-1 justify-center items-center";
  const iconStyle = "text-lg border ";
  return (
    <div className="flex gap-4 px-2 text-xs uppercase text-center">
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
