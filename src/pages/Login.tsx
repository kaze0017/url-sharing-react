import LoginPanel from "../components/login/LoginPanel";
import FooterNav from "../components/login/FooterNav";
import { useDraggable } from "react-use-draggable-scroll";
import { useRef  } from "react";

export default function LoginPage() {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  // CSS Classes
  const mainPanelWrapper =
    " flex flex-col p-2 px-10 m-1 items-center uppercase panel-light text-gray-900  overflow-x-hidden overflow-y-scroll scrollbar-hide items-center text-center";
  const wrapperClass = `p-2 flex flex-wrap gap-2 overflow-x-hidden overflow-y-scroll scrollbar-hide items-center mx-auto`;

  return (
    <div className={mainPanelWrapper} ref={ref} {...events}>
      <h2 className="w-full text-start p-2">
        <span className="text-gray-500">https://</span>
        <span className="text-red-400">welcome</span>
        <span className="text-blue-950">back</span>
        <span className="text-gray-500">.li</span>
      </h2>
      <div className="h-900">
        <LoginPanel />
      </div>
      <div className="flex grow"></div>
      {/* App stores */}
      <div>
        <h4>Install on your device</h4>

        <div className="flex gap-2">
          <a
            href="https://play.google.com/store/apps/details?id=com.welcomebackli.app"
            target="_blank"
            rel="noreferrer"
            className="w-[200px]"
          >
            <img src="/images/logos/googleplay.png" alt="Google Play Store" />
          </a>
          <a
            href="https://apps.apple.com/us/app/welcomeback-li/id1588131263"
            target="_blank"
            rel="noreferrer"
            className="w-[200px]"
          >
            <img src="/images/logos/appstore.png" alt="App Store" />
          </a>
        </div>
      </div>

      <FooterNav />
    </div>
  );
}
