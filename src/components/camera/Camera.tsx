import React, { useEffect, useRef, useState } from "react";

interface Props {
  showOverlay: boolean;
}

export default function Camera({ showOverlay }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);

  // Function to start capturing video stream
  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.style.transform = "scaleX(-1)";
      }
      setCameraActive(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  }

  // Function to stop capturing video stream
  function stopCamera() {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      setCameraActive(false);
    }
  }

  // Start or stop camera based on showOverlay prop
  useEffect(() => {
    if (showOverlay && !cameraActive) {
      startCamera();
    } else if (!showOverlay && cameraActive) {
      stopCamera();
    }
    return () => {
      stopCamera(); // Cleanup function to stop camera when component unmounts or when mode changes
    };
  }, [showOverlay]);

  // Function to take a picture
  function takePicture() {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        // Set canvas dimensions for portrait orientation
        canvasRef.current.width = 300;
        canvasRef.current.height = 200;

        // Draw image from video with adjusted dimensions for portrait orientation
        context.drawImage(videoRef.current, 0, 0, 300, 200);

        const data = canvasRef.current.toDataURL("image/png");
        setPhotoData(data);
      }
    }
  }

  return (
    <div className="flex gap-2 text-white uppercase">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <video
            ref={videoRef}
            style={{ width: "300px", height: "200px" }}
            autoPlay
            className="object-cover"
          ></video>
        </div>
        <canvas
          ref={canvasRef}
          style={{ display: "none" }}
          width="300"
          height="200"
        ></canvas>
        <button onClick={takePicture} className="uppercase">
          Take Picture
        </button>
      </div>
      {photoData && (
        <div className="flex flex-col gap-2">
          <img
            src={photoData}
            alt="Captured"
            style={{ width: "300px", height: "200px" }}
            className="scale-x-[-1]"
          />
          <button className="uppercase">Save</button>
        </div>
      )}
    </div>
  );
}
