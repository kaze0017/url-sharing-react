import { useRef, useState, useCallback, useEffect, useContext } from "react";
import Webcam from "react-webcam";
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";
import { CiCamera } from "react-icons/ci";
import { CiFileOn } from "react-icons/ci";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { GoUpload } from "react-icons/go";
import Camera from "../../../camera/Camera";
import { ProfilePictureContext } from "../../../../context/ProfilePictureProvider";
import { set } from "react-hook-form";

const uploader = Uploader({
  apiKey: "free", // Get production API keys from Bytescale
});

// Configuration options: https://www.bytescale.com/docs/upload-widget/frameworks/react#customize
const options = { multi: false };

interface ChangeProfilePictureProps {
  showOverlay: boolean;
  mode: "camera" | "upload" | "select";
  setMode: React.Dispatch<React.SetStateAction<"camera" | "upload" | "select">>;
}
export default function ChangeProfilePicture({
  mode,
  setMode,
  showOverlay,
}: ChangeProfilePictureProps) {
  const videoConstraints = {
    width: 400,
    height: 600,
    facingMode: "user",
  };

  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  function handleCancelUpload() {
    setMode("select");
  }

  function handelSelectCamera() {
    console.log("turn camera on");
    setMode("camera");
    console.log("From ChangeProfilePicture mode: ", mode);
  }

  return (
    <div className="uppercase flex w-full h-full items-center justify-center">
      {mode === "select" && (
        <div className=" flex w-full items-center justify-center gap-2 text-white uppercase">
          <button
            onClick={() => handelSelectCamera()}
            className="p-2 px-4 bg-blue-900 uppercase"
          >
            <CiCamera className="text-2xl" />
          </button>
          <button
            onClick={() => setMode("upload")}
            className="p-2 px-4 bg-blue-900 uppercase"
          >
            <CiFileOn className="text-2xl" />
          </button>
        </div>
      )}
      {mode === "camera" && <Camera showOverlay={showOverlay} />}
      {mode === "upload" && (
        <div className="flex w-full flex-col">
          <UploadButton
            uploader={uploader}
            options={options}
            onComplete={(files) =>
              alert(files.map((x) => x.fileUrl).join("\n"))
            }
          >
            {({ onClick }) => (
              <div className="flex w-full items-center justify-center gap2">
                <button
                  onClick={onClick}
                  className="p-2 px-4 bg-blue-900 uppercase"
                >
                  <GoUpload className="text-2xl" />
                </button>
                <CustomBtn onClick={handleCancelUpload}>
                  <IoArrowBackCircleOutline className="text-2xl" />
                </CustomBtn>
              </div>
            )}
          </UploadButton>
        </div>
      )}
    </div>
  );
}

interface UploadButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

function CustomBtn({ onClick, children }: UploadButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 px-4 bg-blue-900 uppercase w-16 h-16 flex items-center justify-center text-white"
    >
      {children}
    </button>
  );
}
