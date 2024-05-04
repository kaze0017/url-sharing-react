import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";
import { CiCamera } from "react-icons/ci";
import { CiFileOn } from "react-icons/ci";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { GoUpload } from "react-icons/go";


const uploader = Uploader({
  apiKey: "free", // Get production API keys from Bytescale
});

// Configuration options: https://www.bytescale.com/docs/upload-widget/frameworks/react#customize
const options = { multi: false };

export default function ChangeProfilePicture() {
  const [mode, setMode] = useState<"camera" | "upload" | "select">("select");
  const videoConstraints = {
    width: 400,
    height: 600,
    facingMode: "user",
  };

  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  function handleSelectCamera() {
    setMode("camera");
    setCaptureEnable(true);
  }

  function handleCancelCamera() {
    setMode("select");
    setCaptureEnable(false);
  }
  function handleCancelUpload() {
    setMode("select");
    setCaptureEnable(false);
  }
  return (
    <div className="uppercase flex w-full h-full items-center justify-center">
      {mode === "select" && (
        <div className=" flex w-full items-center justify-center gap-2 text-white uppercase">
          <button
            onClick={() => setMode("camera")}
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
      {mode === "camera" && (
        <div className="flex w-full flex-col">
          {isCaptureEnable || (
            <div className="flex w-full items-center justify-center gap-2 text-white">
              <button
                onClick={() => handleSelectCamera()}
                className=" p-2 px-4 bg-blue-800"
              >
                start
              </button>
              <button
                onClick={() => handleCancelCamera()}
                className=" bg-blue-800 p-2 px-4"
              >
                <IoArrowBackCircleOutline className="text-2xl" />
              </button>
            </div>
          )}
          {isCaptureEnable && (
            <>
              <div>
                <button onClick={() => handleCancelCamera()}>end </button>
              </div>
              <div>
                <Webcam
                  audio={false}
                  mirrored={true}
                  width={150}
                  height={250}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
              </div>
              <button onClick={capture}>capture</button>
            </>
          )}
          {url && (
            <>
              <div>
                <button
                  onClick={() => {
                    setUrl(null);
                  }}
                >
                  delete
                </button>
              </div>
              <div>
                <img src={url} alt="Screenshot" />
              </div>
            </>
          )}
        </div>
      )}
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
                <button onClick={onClick} className="p-2 px-4 bg-blue-900 uppercase">
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
    <button onClick={onClick} className="p-2 px-4 bg-blue-900 uppercase w-16 h-16 flex items-center justify-center text-white">
      {children}
    </button>
  );
}
