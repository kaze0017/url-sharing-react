import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";

export default function Social() {
  return (
    <div className="uppercase  flex flex-col  gap-2 items-center w-full gap-x-2 w-max-md text-xs">
      <button className="flex items-center p-2 px-4 border-2 border-blue-950 gap-4 w-full rounded-2xl">
        <FcGoogle className=" size-7 flex grow text-left" />
        <p className="uppercase ">Sing in with google</p>
        <div className="flex grow"></div>
      </button>
      {/* <button className="flex items-center p-2 px-4 border-2 border-blue-950 gap-4 w-full rounded-2xl">
        <FaFacebook className="mr-2  size-7 text-blue-800" />
        <p className="uppercase ">Sing in with facebook</p>
      </button> */}
      <button className="flex items-center p-2 px-4 border-2 border-blue-950 gap-4 w-full rounded-2xl">
        <FaApple className=" size-7 text-gray-500 flex grow" />
        <p className="uppercase ">Sing in with apple ID</p>
        <div className="flex grow"></div>
      </button>
    </div>
  );
}
