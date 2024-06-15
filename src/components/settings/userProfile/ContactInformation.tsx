import { useState, useContext } from "react";
import { UserProfileContext } from "../../../context/UserProfileProvider";
import AuthContext from "../../../context/AuthProvider";
import SubSettingContainer from "../SubSettingContainer";
import { countries } from "../../../lib/countries";
import Select from "react-select";
import { postUserProfile } from "../../../api/postUserProfile";

export default function ContactInformation() {
  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";
  const [email, setEmail] = useState<string>("Email");
  const [phone, setPhone] = useState<string>("Phone");
  const [address, setAddress] = useState<string>("Address");
  const [editMode, setEditMode] = useState<boolean>(false);

  const { userProfile, setUserProfile } = useContext(UserProfileContext);

  const countryOptions = countries.map((country) => ({
    value: country.name,
    label: (
      <div className="flex items-center gap-2">
        <img
          src={country.flag}
          alt={country.name}
          style={{ width: "20px", marginRight: "10px" }}
        />
        {country.name}
      </div>
    ),
  }));




  async function handelSubmit() {
    postUserProfile({ token: "", userProfile });
    setEditMode(false);
  }

  const inputEditableClass = editMode
    ? "border-b border-gray-300  flex flex-grow items-center h-8"
    : "bg-transparent border-none flex flex-grow items-center h-8";

  const btnClass = "bg-blue-950 text-white p-2 rounded-md w-20";

  return (
    <SubSettingContainer title="Contact Information">
      <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          {/* Email */}
          <div className="flex items-center gap-2 flex-grow">
            <label htmlFor="email" className="text-sm font-semibold w-20">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={userProfile.email || ""}
              onChange={(e) =>
                setUserProfile({ ...userProfile, email: e.target.value })
              }
              className={inputEditableClass}
              readOnly={!editMode}
            />
          </div>
          {/* Phone */}
          <div className="flex items-center gap-2 flex-grow">
            <label htmlFor="phone" className="text-sm font-semibold w-20">
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              value={userProfile.phone || "xxx xxx xxxx"}
              onChange={(e) =>
                setUserProfile({ ...userProfile, phone: e.target.value })
              }
              className={inputEditableClass}
              readOnly={!editMode}
            />
          </div>
          {/* Address */}
          <div className="flex items-center gap-2 flex-grow">
            <label htmlFor="address" className="text-sm font-semibold w-20">
              Address:
            </label>
            <Select
              placeholder={
                userProfile.address ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        countries.find(
                          (country) =>
                            country.name === userProfile.address?.country
                        )?.flag
                      }
                      alt={userProfile.address?.country}
                      style={{ width: "20px", marginRight: "10px" }}
                    />
                    {userProfile.address?.country}
                  </div>
                ) : (
                  "Select Country"
                )
              }
              options={countryOptions}
              // formatOptionLabel={({ label }) => label}
              className="flex text-xs"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  width: "200px",
                  color: state.isFocused ? "red" : "red",
                }),
              }}
              onChange={(selectedOption) => {
                setUserProfile({
                  ...userProfile,
                  address: {
                    country: selectedOption?.value as string,
                  },
                });
              }}
              isDisabled={!editMode}
            />
          </div>

          {/* Edit button */}
          <div className="flex gap-2">
            <button className={btnClass} onClick={() => setEditMode(!editMode)}>
              {editMode ? "Cancel" : "Edit"}
            </button>
            {editMode && (
              <button
                type="submit"
                className={btnClass}
                onClick={() => handelSubmit()}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </SubSettingContainer>
  );
}
