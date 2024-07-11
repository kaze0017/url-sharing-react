import { useEffect, useState, useContext } from "react";
import AuthContext from "../../../../context/AuthProvider";
import { SharedLinkType } from "../../../../lib/interfaces";
import { RiCheckLine } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { postAcceptRejectLinks } from "../../../../api/posts/postAcceptRejectLinks";

export default function SharedLinkNotification({
  link,
}: {
  link: SharedLinkType;
}) {
  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";

  const [state, setState] = useState<
    | "accepting"
    | "rejecting"
    | "accepted"
    | "rejected"
    | "rejectionFailed"
    | "acceptanceFailed"
    | "none"
  >("none");
  async function handelReject() {
    setState("rejecting");
    const response = await postAcceptRejectLinks({
      token,
      data: { shared_reject: [link.event_id || 0] },
    });
    if (response?.status === 200) {
      setState("rejected");
    } else {
      setState("rejectionFailed");
    }
  }
  async function handelAccept() {
    setState("accepting");
    const response = await postAcceptRejectLinks({
      token,
      data: { shared_accept: [link.event_id || 0] },
    });
    if (response?.status === 200) {
      setState("accepted");
    } else {
      setState("acceptanceFailed");
    }
  }
  return (
    <div className="flex flex-col gap-1 border border-gray-500 rounded-md p-1">
      {/* {state === "rejecting" && (
        <div className="flex items-center p-1 w-full gap-2">
          <p>Undo Reject?</p>
          <UndoTimerBtn setState={setState} />
        </div>
      )} */}
      {state === "accepting" && <p>Accepting...</p>}
      {state === "none" && (
        <div className="w-full h-full flex flex-col gap-1">
          <div className="flex p-1 justify-between">
            <p>{link.title}</p>
            <img
              src={
                link.thumbnail
                  ? link.thumbnail
                  : "/images/defaults/generalDefaultThumbnail.jpg"
              }
              alt={link.title}
              className="object-cover w-1/2 aspect-video rounded-md"
            />
          </div>
          <div className="flex gap-2 border border-gray-300 rounded-full p-1 px-2 items-center">
            <p className="uppercase text-2xs font-semibold w-1/3">category:</p>
            <p className="uppercase text-2xs">{link.category}</p>
          </div>
          <div className="flex gap-2 border border-gray-300 rounded-full p-1 px-2 items-center">
            <p className="uppercase text-2xs font-semibold w-1/3">tags:</p>
            <p className="uppercase text-2xs">
              {typeof link.tags === "string"
                ? link.tags
                : link.tags?.join(", ")}
            </p>
          </div>
          <div className="flex w-full">
            <p>{link.contentDescription}</p>
          </div>
          <div className="flex items-center justify-evenly">
            <RxCross1 className="text-xl text-red-500" onClick={handelReject} />
            <RiCheckLine
              className="text-xl text-green-500"
              onClick={handelAccept}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function UndoTimerBtn({
  setState,
}: {
  setState: React.Dispatch<
    React.SetStateAction<"rejecting" | "accepting" | "none">
  >;
}) {
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setState("none");
      console.log("undo reject");
    }
  }, [counter, setState]);

  return <button onClick={() => setState("none")}>{counter}</button>;
}
