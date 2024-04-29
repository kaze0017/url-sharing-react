import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import ProgressBarComp from "../ProgressBarComp";
import ThumbnailSelector from "./ThumbnailSelector";
import FadeInOut from "../login/FadeInOut";
import { MdOutlineChangeCircle } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import TagSelector from "../TagSelector";

// Steps

const steps = getSteps();

//   Css Classes

const formClass =
  "relative w-full  w-full h-550 flex flex-col gap-2 mb-2 p-4 overflow-hidden ";
const longTextInputClass = "text-xs w-full ";
const lineClass = "grow border border-2 border-blue-800";

const circleCompleteClass =
  "w-[20px] h-[20px]  rounded-full bg-blue-800 border-4 outline outline-blue-800 ";
const circleIncompleteClass =
  "w-[20px] h-[20px]  rounded-full border-4 outline  outline-blue-800";
const circleCurrentClass =
  "w-[20px] h-[20px]  rounded-full bg-gray-400 border-4 outline  outline-blue-800";

// ******************************************************

interface IFormInput {
  contentName: string;
  contentDescription: string;
  hashtags: Array<string>;
  linkAddressMain: string;
  linkAddressSecond: string;
  linkAddressThird: string;
  thumbnail: string;
  categoryName: string;
  usernameForAuthentication: string;
  passwordForAuthentication: string;
  defaultPort: string;
  sharingAbility: boolean;
  externalSharingAbility: boolean;
  sharingDeptLevel: string;
  publicationDate: string;
  publicationTime: string;
  expirationDate: string;
  expirationTime: string;
}

// AddLinkForm
export default function AddLinkForm() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;
  const [selectedImage, setSelectedImage] = useState(
    "/images/defaults/thumbnails/th1.jpg"
  );
  const [numberOfLinks, setNumberOfLinks] = useState(1);

  function addMoreLinks() {
    if (numberOfLinks < 3) {
      setNumberOfLinks(numberOfLinks + 1);
    }
  }
  function handleDeleteSecondLink() {
    setNumberOfLinks(numberOfLinks - 1);
    register("linkAddressSecond", { value: "" });
  }

  function handleDeleteThirdLink() {
    setNumberOfLinks(numberOfLinks - 1);
    register("linkAddressThird", { value: "" });
  }

  function resetTheForm() {
    //reset the form
    setNumberOfLinks(1);
    setTags([]);
    setSelectedImage("/images/defaults/thumbnails/th1.jpg");
    reset();

    setCurrentStep(0);
  }

  const [showThumbnailSelector, setShowThumbnailSelector] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const [tags, setTags] = useState<Array<string>>([]);

  const suggestions = [
    { id: "fun", text: "Fun" },
    { id: "sport", text: "Sport" },
    { id: "sport2", text: "Sport" },
    { id: "kids", text: "Kids" },
  ];

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const isValid = await trigger();

    // Check if there are any errors
    if (isValid) {
      // Proceed with form submission
      setCurrentStep(3);
      console.log(data);
    } else {
      // If there are errors, do not proceed with submission
      console.log("Form has errors. Please fill in all required fields.");
    }
  };

  async function handleNextStep() {
    // Trigger validation before proceeding to the next step
    const isValid = await trigger();
    if (!isValid) {
      return;
    }

    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep(currentStep + 1);
    }
  }

  function handlePrevious(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (currentStep > 0) {
      setPreviousStep(currentStep - 2);
      setCurrentStep(currentStep - 1);
    }
  }

  function changeThumbnail(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowThumbnailSelector(!showThumbnailSelector);
  }

  useEffect(() => {
    setShowThumbnailSelector(false);
    register("thumbnail", { value: selectedImage });
  }, [selectedImage]);

  useEffect(() => {
    register("hashtags", { value: selectedTags });
  }, [selectedTags]);

  return (
    <div className="flex flex-col w-700 panel-light gap-1 p-2">
      <div className="px-2">
        <h2 className="uppercase">Link Definition</h2>
        <p className="text-xs text-gray-500">
          Boost your link into the trends and maximize visibility by adding a
          few extra details - more Information means more engagement. Make your
          content the star of the show.{" "}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={formClass}>
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-10%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full flex gap-1 h-full  justify-between p-1"
          >
            {/* Content Name */}
            <div className="w-1/2 p-2 flex flex-col gap-2 items-center">
              <input
                type="text"
                className={longTextInputClass}
                placeholder="Content Name"
                {...register("contentName", {
                  required: true,
                  maxLength: 20,
                  minLength: 3,
                })}
              />
              {errors.contentName && (
                <p className="text-red-500 text-xs">
                  Name Should be between 3 and 20 characters
                </p>
              )}

              <input
                type="text"
                className={longTextInputClass}
                placeholder="Content Description"
                {...register("contentDescription")}
              />

              <TagSelector
                setSelectedTags={setSelectedTags}
                selectedTags={selectedTags}
              />
              <div className="flex flex-col gap-1 w-full">
                <input
                  type="text"
                  placeholder="Link Address"
                  className={longTextInputClass}
                  id="linkAddress"
                  {...register("linkAddressMain", {
                    required: {
                      value: true,
                      message: "Link Address is required",
                    },
                    pattern: {
                      value: /^((ftp|http|https):\/\/)/,
                      message:
                        "Link Address must start with ftp://, http://, or https://",
                    },
                  })}
                />
                {errors.linkAddressMain && (
                  <p className="text-red-500 text-xs">
                    {errors.linkAddressMain.message}
                  </p>
                )}
                <FadeInOut show={numberOfLinks >= 2}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Link Address"
                      className={longTextInputClass}
                      id="linkAddress"
                      {...register("linkAddressSecond")}
                    />

                    <IoCloseOutline
                      className="absolute left-0 top-0 h-full text-2xl text-red-500 cursor-pointer -translate-x-full"
                      onClick={() => handleDeleteSecondLink()}
                    />
                  </div>
                </FadeInOut>
                <FadeInOut show={numberOfLinks >= 3}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Link Address"
                      className={longTextInputClass}
                      id="linkAddress"
                      {...register("linkAddressThird")}
                    />
                    <IoCloseOutline
                      className="absolute left-0 top-0 h-full text-2xl text-red-500 cursor-pointer -translate-x-full"
                      onClick={() => handleDeleteThirdLink()}
                    />
                  </div>
                </FadeInOut>

                <button
                  className="uppercase text-xs   flex w-full text-blue-500 justify-end cursor-pointer "
                  onClick={addMoreLinks}
                  disabled={numberOfLinks >= 3}
                >
                  + add another link
                </button>
              </div>

              <input
                type="text"
                className={longTextInputClass}
                placeholder="Category Name"
                {...register("categoryName")}
              />
            </div>
            {/* Thumbnail */}
            <div className="gradientBorder p-2 w-1/2 flex flex-col gap-2 items-center">
              {selectedImage && (
                <div>
                  <img alt="not found" width={"250px"} src={selectedImage} />
                </div>
              )}
              <button
                onClick={(e) => changeThumbnail(e)}
                className="flex gap-2 items-center justify-between p-2 w-52 button transition-500"
              >
                Thumbnail <MdOutlineChangeCircle className="tex-2xl" />
              </button>
            </div>
            {/* <div className="flex grow border-3 border-red-400"></div> */}
            <FadeInOut
              show={showThumbnailSelector}
              className="absolute top-0 left-0 w-full h-full bg-white"
            >
              <ThumbnailSelector setSelectedImage={setSelectedImage} />
            </FadeInOut>
          </motion.div>
        )}
        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-10%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col gap-2 h-full"
          >
            {/* Username For Authentication */}
            <input
              type="text"
              placeholder="Username For Authentication"
              {...register("usernameForAuthentication")}
            />

            <input
              type="text"
              placeholder="Password For Authentication"
              {...register("passwordForAuthentication")}
            />

            <input
              type="text"
              placeholder="Default Port"
              {...register("defaultPort")}
            />

            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="sharingAbility"
                {...register("sharingAbility")}
              />
              <label htmlFor="sharingAbility">Sharing Ability</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="externalSharingAbility"
                {...register("externalSharingAbility")}
              />
              <label htmlFor="externalSharingAbility">
                External Sharing Ability
              </label>
            </div>

            <select id="sharingDeptLevel" {...register("sharingDeptLevel")}>
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
            </select>

            <div className="flex grow"></div>
          </motion.div>
        )}
        {currentStep === 2 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full grow flex flex-col gap-2 "
          >
            <input
              type="date"
              id="publicationDate"
              {...register("publicationDate")}
            />

            <input
              type="time"
              id="publicationTime"
              {...register("publicationTime")}
            />

            <input
              type="date"
              id="expirationDate"
              {...register("expirationDate")}
            />

            <input
              type="time"
              id="expirationTime"
              {...register("expirationTime")}
            />
          </motion.div>
        )}
        {currentStep === 3 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col gap-2 grow items-center justify-center "
          >
            <h3 className="text-center  text-green-600 w-full text-2xl">
              Link Created Successfully
            </h3>
            <CiCirclePlus
              className="text-2xl text-blue-600 mt-4 cursor-pointer"
              onClick={resetTheForm}
            />
          </motion.div>
        )}
        {/* Controls for step 0, 1, and 2 */}
        {currentStep < 4 && (
          <div className="w-full flex flex-col gap-2">
            <div className="w-full  pl-10 pr-10">
              <ProgressBarComp
                percent={currentStep === 0 ? 0 : currentStep === 1 ? 50 : 100}
                filledBackground="linear-gradient(90deg, rgba(121,115,200,1) 0%, rgba(29,65,163,1) 35%, rgba(4,27,50,1) 100%)"
              />
            </div>
            <div className="w-full flex items-center justify-between text-center">
              <h3 className="w-24 text-xs ">Basic Information</h3>
              <h3 className="w-24 text-xs text-center ">Permissions</h3>
              <h3 className="w-24 text-xs ">Advanced</h3>
            </div>
          </div>
        )}
        {currentStep < 3 && (
          <div className="flex gap-2">
            {currentStep > 0 && (
              <button onClick={(e) => handlePrevious(e)}>Back</button>
            )}
            <div className="flex-grow"></div>
            <div className="flex gap-4">
              {currentStep === 0 && (
                <button onClick={handleNextStep}>Next</button>
              )}
              {currentStep === 1 && (
                <button onClick={handleNextStep}>Next/Skip</button>
              )}
              {currentStep === 2 && <input type="submit" value="Create" />}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
// ******************************************************

function getSteps() {
  return [
    {
      step: 0,
      title: "Basic Information",
      fields: [
        "contentName",
        "contentDescription",
        "hashtags",
        "thumbnail",
        "categoryName",
      ],
    },
    {
      step: 1,
      title: "Permissions",
      fields: [
        "usernameForAuthentication",
        "passwordForAuthentication",
        "defaultPort",
        "sharingAbility",
        "externalSharingAbility",
        "sharingDeptLevel",
      ],
    },

    {
      step: 2,
      title: "Advanced",
      fields: [
        "publicationDate",
        "publicationTime",
        "expirationDate",
        "expirationTime",
      ],
    },
    { step: 3, title: "Completion" },
  ];
}
