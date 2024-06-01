import { useState, useContext } from "react";
import { UserProfileContext } from "../context/UserProfileProvider";
import AuthContext from "../context/AuthProvider";
import ProgressBarComp from "../components/ProgressBarComp";
import { postUserProfile } from "../api/axios";
import { useNavigate } from "react-router-dom";
import MainPanelWrapper from "../components/MainPanelWrapper";

export default function InitialProfile() {
  const navigate = useNavigate();
  const { userProfile, setUserProfile } = useContext(UserProfileContext);
  const { auth , setIsNewUser } = useContext(AuthContext);
  const token = auth?.token || "";
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [org_name, setOrg_name] = useState("");
  const [profilePicture, setProfilePicture] = useState("");



  async function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const temp = {
      ...userProfile,
      first_name,
      last_name,
      title,
      org_name,
      profile_picture: profilePicture,
    };
    const response = await postUserProfile({ token: token, userProfile: temp });
    if (response?.status === 200) {
      setUserProfile(temp);
      setIsNewUser(false);
      navigate("/");
    } else {
      alert("Error in submitting the form");
    }
  }

  const formClass =
    "flex flex-col max-w-[450px] gap-2 w-full text-blue-950 text-sm uppercase items-center justify-between font-semibold";
  const inputContainerClass = "flex gap-2 w-full items-center justify-between";
  const submitBtnClass =
    "bg-blue-950 text-white p-2 rounded-md w-20 mt-4 uppercase";
  return (
    <MainPanelWrapper>
      <div className="panel-light mx-auto py-8 w-full max-w-[600px] flex flex-col gap-4 my-auto items-center ">
        <p className="text-blue-950">
          Help Us provide a better service by completing your profile.
        </p>
        <form action="" className={formClass} onSubmit={handelSubmit}>
          <div className={inputContainerClass}>
            <label htmlFor="first_name">First Name*</label>
            <input
              name="first_name"
              type="text"
              placeholder="First Name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className={inputContainerClass}>
            <label htmlFor="last_name">Last Name*</label>

            <input
              type="text"
              placeholder="Last Name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className={inputContainerClass}>
            <label htmlFor="title">Title</label>
            <input
              title="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={inputContainerClass}>
            <label htmlFor="phone">Phone</label>
            <input
              name="phone"
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className={inputContainerClass}>
            <label htmlFor="org_name">Company</label>
            <input
              name="org_name"
              type="text"
              placeholder="Company"
              value={org_name}
              onChange={(e) => setOrg_name(e.target.value)}
            />
          </div>
          <div className={inputContainerClass}>
            <label htmlFor="profilePicture">Picture</label>
            <input
              type="text"
              placeholder="Profile Picture"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
            />
          </div>
          <input type="submit" value="Submit" className={submitBtnClass} />
        </form>
      </div>
    </MainPanelWrapper>
  );
}
