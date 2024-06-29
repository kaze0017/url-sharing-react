import { useState, useEffect, useContext, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import ProgressBarComp from "../ProgressBarComp";
import ThumbnailSelector from "./ThumbnailSelector";
import FadeInOut from "../login/FadeInOut";
import { MdOutlineChangeCircle } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { TiArrowBackOutline } from "react-icons/ti";
import TagSelector from "../TagSelector";
import AuthContext from "../../context/AuthProvider";
import { RxCheckCircled } from "react-icons/rx";
import { RxCrossCircled } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { getLinkById } from "../../api/getLinkById";
import { updateLink } from "../../api/postUpdateLink";
import { useNavigate } from "react-router-dom";

// Steps

const steps = getSteps();

//   Css Classes

const formClass =
  "relative w-full h-[500px] flex flex-col gap-2 mb-2 p-4 overflow-hidden  ";
const longTextInputClass = "text-xs w-full ";

// ******************************************************

interface IFormInput {
  title: string;
  contentDescription: string;
  tags: Array<string>;
  url: string;
  back_up_link_1st: string;
  back_up_link_2nd: string;
  thumbnail: string;
  category: string;
  url_username: string;
  url_pass: string;
  sharingAbility: boolean;
  externalSharingAbility: boolean;
  sharingDeptLevel: string;
  url_type: string;
}

// AddLinkForm
export default function EditLinkForm() {
  const { id } = useParams<{ id: string }>() as { id: string };
  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";
  const navigate = useNavigate();
  const tagSuggestions = ["fun", "sport", "sport2", "kids"];
  const categorySuggestions = [
    "category1",
    "category2",
    "category3",
    "category4",
  ];
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;
  const [selectedImage, setSelectedImage] = useState(
    "/images/defaults/thumbnails/th1.jpg"
  );
  const [numberOfLinks, setNumberOfLinks] = useState(1);

  function addMoreLinks(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (numberOfLinks < 3) {
      setNumberOfLinks(numberOfLinks + 1);
    }
  }
  function handleDeleteSecondLink() {
    setNumberOfLinks(numberOfLinks - 1);
    register("back_up_link_1st", { value: "" });
  }

  function handleDeleteThirdLink() {
    setNumberOfLinks(numberOfLinks - 1);
    register("back_up_link_2nd", { value: "" });
  }

  function backToLink() {
    navigate("/linkManagement");
  }

  const [showThumbnailSelector, setShowThumbnailSelector] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
  const [selectedCategory, setSelectedCategory] = useState<Array<string>>([]);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: async () => getTheLink(),
  });

  async function getTheLink() {
    const tempLink = await getLinkById({ token, id });
    if (tempLink.tags?.length > 0) {
      setSelectedTags(tempLink.tags);
    }
    if (tempLink.thumbnail) {
      setSelectedImage(tempLink.thumbnail);
    }

    if (
      tempLink.back_up_link_1st?.length > 0 &&
      tempLink.back_up_link_1st !== "undefined"
    ) {
      setNumberOfLinks(2);
    }
    if (
      tempLink.back_up_link_2nd?.length > 0 &&
      tempLink.back_up_link_2nd !== "undefined"
    ) {
      setNumberOfLinks(3);
    }

    return {
      title: tempLink.title,
      contentDescription: tempLink.contentDescription,
      tags: tempLink.tags,
      url: tempLink.url as string,
      back_up_link_1st: tempLink.back_up_link_1st as string,
      back_up_link_2nd: tempLink.back_up_link_2nd as string,
      thumbnail: tempLink.thumbnail,
      category: tempLink.category,
      url_username: tempLink.url_username,
      url_pass: tempLink.url_pass,
      sharingAbility: tempLink.sharingAbility,
      externalSharingAbility: tempLink.externalSharingAbility,
      sharingDeptLevel: tempLink.sharingDeptLevel,
      url_type: tempLink.url_type,
    };
  }
  const watched = watch();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const isValid = await trigger();

    // Check if there are any errors
    if (isValid) {
      // Proceed with form submission
      setCurrentStep(3);

      const formData = new URLSearchParams();
      formData.append("title", data.title);
      formData.append("url", data.url);
      formData.append("contentDescription", data.contentDescription);
      formData.append("category", data.category);
      formData.append("thumbnail", selectedImage);
      formData.append("tags", selectedTags.join(","));
      formData.append("url_username", data.url_username);
      formData.append("url_pass", data.url_pass);
      formData.append("sharing_dept_level", data.sharingDeptLevel);
      formData.append("back_up_link_1st", data.back_up_link_1st);
      formData.append("back_up_link_2nd", data.back_up_link_2nd);
      formData.append("class_type", "link");
      formData.append("url_type", data.url_type);

      try {
        const response = await updateLink({ id: Number(id), token, formData });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
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
  }, [selectedImage, register]);

  useEffect(() => {
    register("tags", { value: selectedTags });
  }, [selectedTags, register]);

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const mainWrapperClass =
    "panel-light relative p-1 justify-center flex flex-wrap gap-x-2 gap-y-2 overflow-x-scroll overflow-y-scroll scrollbar-hide w-[700px]";

  const summeryCheckWrapperClass = "flex items-center gap-1 w-[250px]";

  return (
    <div className={mainWrapperClass} ref={ref}>
      <div className="px-2">
        <h2 className="uppercase">Edit Link</h2>
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
                {...register("title", {
                  required: true,
                  maxLength: 20,
                  minLength: 3,
                })}
              />
              {errors.title && (
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
                inSuggestions={tagSuggestions}
              />
              <div className="flex flex-col gap-1 w-full">
                <input
                  type="text"
                  placeholder="Link Address"
                  className={longTextInputClass}
                  id="linkAddress"
                  {...register("url", {
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
                {errors.url && (
                  <p className="text-red-500 text-xs">{errors.url.message}</p>
                )}
                <FadeInOut show={numberOfLinks >= 2}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Link Address"
                      className={longTextInputClass}
                      id="linkAddress"
                      {...register("back_up_link_1st")}
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
                      {...register("back_up_link_2nd")}
                    />
                    <IoCloseOutline
                      className="absolute left-0 top-0 h-full text-2xl text-red-500 cursor-pointer -translate-x-full"
                      onClick={() => handleDeleteThirdLink()}
                    />
                  </div>
                </FadeInOut>

                <button
                  className="uppercase text-xs   flex w-full text-blue-500 justify-end cursor-pointer "
                  onClick={(event) => addMoreLinks(event)}
                  disabled={numberOfLinks >= 3}
                >
                  + add another link
                </button>
              </div>

              <TagSelector
                setSelectedTags={setSelectedCategory}
                selectedTags={selectedCategory}
                inSuggestions={categorySuggestions}
              />
              <input
                type="text"
                className={longTextInputClass}
                placeholder="URL Type"
                {...register("url_type")}
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
              {...register("url_username")}
            />

            <input
              type="text"
              placeholder="Password For Authentication"
              {...register("url_pass")}
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
            {/* Summery */}
            <div className="relative flex w-full h-full overflow-hidden">
              <div className="flex absolute opacity-30 w-full h-full">
                <img
                  src={selectedImage}
                  alt=""
                  className="absolute w-full h-full object-cover"
                />
              </div>
              <div className="uppercase flex flex-col items-center justify-center  gap-4 bg-white bg-opacity-80 text-blue-950 font-semibold w-full h-full overflow-y-auto p-2">
                <div className="flex bg-blue-950 text-white w-[200px] text-center items-center justify-center p-2 bg-opacity-100">
                  Title: {watched.title}
                </div>
                <div className="flex">
                  Description:{" "}
                  {watched.contentDescription
                    ? watched.contentDescription
                    : "No Description Provided"}
                </div>
                <div className="flex w-full flex-wrap justify-center">
                  <div className={summeryCheckWrapperClass}>
                    {watched.tags ? (
                      <RxCheckCircled className="text-green-800" />
                    ) : (
                      <RxCrossCircled className="text-red-800" />
                    )}
                    Tags
                  </div>
                  <div className={summeryCheckWrapperClass}>
                    {watched.url ? (
                      <RxCheckCircled className="text-green-800" />
                    ) : (
                      <RxCrossCircled className="text-red-800" />
                    )}
                    URL
                  </div>
                  <div className={summeryCheckWrapperClass}>
                    {watched.back_up_link_1st ? (
                      <RxCheckCircled className="text-green-800" />
                    ) : (
                      <RxCrossCircled className="text-red-800" />
                    )}
                    Back Up Link 1st
                  </div>
                  <div className={summeryCheckWrapperClass}>
                    {watched.back_up_link_2nd ? (
                      <RxCheckCircled className="text-green-800" />
                    ) : (
                      <RxCrossCircled className="text-red-800" />
                    )}
                    Back Up Link 2nd
                  </div>
                  <div className={summeryCheckWrapperClass}>
                    {watched.category ? (
                      <RxCheckCircled className="text-green-800" />
                    ) : (
                      <RxCrossCircled className="text-red-800" />
                    )}
                    Category
                  </div>
                  <div className={summeryCheckWrapperClass}>
                    {watched.url_username ? (
                      <RxCheckCircled className="text-green-800" />
                    ) : (
                      <RxCrossCircled className="text-red-800" />
                    )}
                    Username
                  </div>
                  <div className={summeryCheckWrapperClass}>
                    {watched.sharingAbility ? (
                      <RxCheckCircled className="text-green-800" />
                    ) : (
                      <RxCrossCircled className="text-red-800" />
                    )}
                    Sharing Ability
                  </div>
                  <div className={summeryCheckWrapperClass}>
                    {watched.externalSharingAbility ? (
                      <RxCheckCircled className="text-green-800" />
                    ) : (
                      <RxCrossCircled className="text-red-800" />
                    )}
                    External Sharing Ability
                  </div>
                  <div className={summeryCheckWrapperClass}>
                    {watched.sharingDeptLevel ? (
                      <RxCheckCircled className="text-green-800" />
                    ) : (
                      <RxCrossCircled className="text-red-800" />
                    )}
                    Sharing Dept Level
                  </div>
                  <div className={summeryCheckWrapperClass}>
                    {watched.url_type ? (
                      <RxCheckCircled className="text-green-800" />
                    ) : (
                      <RxCrossCircled className="text-red-800" />
                    )}
                    URL Type
                  </div>
                </div>
              </div>
            </div>
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
              Link Updated Successfully
            </h3>
            <TiArrowBackOutline
              className="text-2xl text-blue-600 mt-4 cursor-pointer"
              onClick={backToLink}
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
                steps={3}
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
              {currentStep === 2 && <input type="submit" value="Update" />}
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
