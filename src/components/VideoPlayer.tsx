import { useEffect, useRef } from "react";

interface YoutubeHoverPlayProps {
  embedId: string;
}

export function YoutubeHoverPlay({ embedId }: YoutubeHoverPlayProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener("mouseover", () => {
        iframe.contentWindow?.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          "*"
        );
      });
      iframe.addEventListener("mouseout", () => {
        iframe.contentWindow?.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
      });
    }
  }, [iframeRef]);

  return (
    <iframe
      ref={iframeRef}
      src={`https://www.youtube.com/embed/${embedId}?enablejsapi=1&controls=0&showinfo=0`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      loading="lazy"
      className="w-full h-full rounded-md"
    />
  );
}
