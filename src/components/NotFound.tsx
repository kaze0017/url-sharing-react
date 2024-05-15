import { GiSadCrab } from "react-icons/gi";

export default function NotFound({title, size}: {title: string, size: string}) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <GiSadCrab className={`${size} text-blue-950`}/>
      {/* <h1 className={`${size} text-red-500 uppercase`}>No {title} For Today</h1> */}
    </div>
  );
}
