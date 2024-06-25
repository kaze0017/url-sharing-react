import { useEffect, useState } from "react";
import ProgressBarComp from "../ProgressBarComp";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { setStatus } from "../../state/share/shareSlice";

export default function FooterController() {
  const navigate = useNavigate();
  const { status, selectedPeople, selectedGroups} = useSelector((state: RootState) => state.share);
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);

  const goToLinkManagement = () => {
    navigate("/linkManagement");
  };
  function handelShareNow() {
    dispatch(setStatus("approval"));
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

  const mainBtnClass = "font-bold text-blue-950  px-2 cursor-pointer uppercase disabled:opacity-50";

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
          <button className={mainBtnClass} onClick={handelShareNow} disabled={selectedPeople.length + selectedGroups.length === 0}>
            Share Now
          </button>
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
