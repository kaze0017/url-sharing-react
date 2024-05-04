import { SiDungeonsanddragons } from "react-icons/si";

export default function UnderConstruction() {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-4 uppercase">
      <p className="text-xl text-center">Under Construction</p>
      <div className="flex justify-center">
        <SiDungeonsanddragons className="text-9xl text-blue-950" />
      </div>
    </div>
  );
}
