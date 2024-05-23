import { useContext, useEffect, useState } from "react";
import ShareWithGroupsContext from "../../context/ShareWithGroupsProvider";
import ProgressBarComp from "../ProgressBarComp";
import { useNavigate } from "react-router-dom";

export default function FooterController() {
  const navigate = useNavigate();
  const { status, setStatus } = useContext(ShareWithGroupsContext);
  const [progress, setProgress] = useState(0);

  const goToLinkManagement = () => {
    navigate("/linkManagement");
  };
  function handelShareNow() {
    setStatus("approval");
    navigate("/shareLinks/approval");
  }

  useEffect(() => {
    if (status === "sharingOptions") {
      setProgress(0);
    } else if (status === "selectingRecipients") {
      setProgress(100);
    } else if (status === "noLinks") {
      setProgress(100);
    }
  }, [status]);

  const mainBtnClass = "font-bold text-blue-950  px-2 cursor-pointer uppercase";

  return (
    <div className="flex flex-col">
      <div className="w-full max-w-[600px] mx-auto">
        <ProgressBarComp steps={2} percent={progress} />
      </div>
      <div className="flex items-center justify-between px-4 py-1">
        <div className={mainBtnClass} onClick={goToLinkManagement}>
          Cancel
        </div>
        {/* {status === "sharingOptions" && <div>Next</div>} */}
        {status === "selectingRecipients" && (
          <div className={mainBtnClass} onClick={handelShareNow}>
            Share Now
          </div>
        )}
        {status === "success" && (
          <div className={mainBtnClass} onClick={goToLinkManagement}>
            Done
          </div>
        )}
      </div>
    </div>
  );
}
