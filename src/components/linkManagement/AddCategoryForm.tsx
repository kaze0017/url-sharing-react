import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import ProgressBarComp from "../ProgressBarComp";
import ThumbnailSelector from "./ThumbnailSelector";
import FadeInOut from "../login/FadeInOut";
import { MdOutlineChangeCircle } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import TagSelector from "../TagSelector";
import { RxCheckCircled, RxCrossCircled } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import {
  createCategory,
  setSelectedCategory,
} from "../../state/linkManagement/categorySlice";

// Steps
const steps = getSteps();

// CSS Classes
const formClass =
  "relative w-full h-[500px] flex flex-col gap-1 p-2 overflow-y-auto";
const longTextInputClass = "text-xs w-full";
const lineClass = "grow border border-2 border-blue-800";

const circleCompleteClass =
  "w-[20px] h-[20px]  rounded-full bg-blue-800 border-4 outline outline-blue-800";
const circleIncompleteClass =
  "w-[20px] h-[20px]  rounded-full border-4 outline  outline-blue-800";
const circleCurrentClass =
  "w-[20px] h-[20px]  rounded-full bg-gray-400 border-4 outline  outline-blue-800";

// Interfaces
interface IFormInput {
  category_id: number;
  title: string;
  contentDescription: string;
  thumbnail: string;
  tags: string[];
  audience: boolean;
  sharingAbility: boolean;
  externalSharingAbility: boolean;
  sharingDeptLevel: string;
  owner: "add";
  class_type: "category";
}

// AddCategoryForm Component
export default function AddCategoryForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { tags: userTags, categories: userCategories } = useSelector(
    (state: RootState) => state.auth.user
  );

  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [selectedImage, setSelectedImage] = useState(
    "/images/defaults/thumbnails/th1.jpg"
  );

  const [showThumbnailSelector, setShowThumbnailSelector] = useState(false);
  const [apiResponse, setApiResponse] = useState<string>();

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
    watch,
  } = useForm<IFormInput>();
  const watched = watch();

  useEffect(() => {
    dispatch(
      setSelectedCategory({
        category_id: 0,
        title: "",
        owner: "add",
        contentDescription: "",
        thumbnail: "/images/defaults/thumbnails/th1.jpg",
        tags: [],
        audience: false,
        sharingAbility: false,
        externalSharingAbility: false,
        sharingDeptLevel: "",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setShowThumbnailSelector(false);
    register("thumbnail", { value: selectedImage });
  }, [selectedImage, register]);

  useEffect(() => {
    register("tags", { value: selectedTags });
  }, [selectedTags, register]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const isValid = await trigger();
    data ={...data, owner: "add", class_type: "category"}

    if (isValid) {
      setCurrentStep(3);
      dispatch(setSelectedCategory(data));
      const response = await dispatch(createCategory());

      console.log("response", response);
      setApiResponse(response.payload.message);
    } else {
      console.log("Form has errors. Please fill in all required fields.");
    }
  };

  async function handleNextStep() {
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

  const mainWrapperClass =
    "panel-light relative p-1 justify-center flex flex-col gap-x-2 gap-y-1 overflow-x-scroll w-[700px] w-full overflow-y-auto";
  const summeryCheckWrapperClass = "flex items-center gap-1 w-[250px]";

  return (
    <div className={mainWrapperClass}>
      <div className="px-2">
        <h2 className="uppercase">Category Definition</h2>
        <p className="text-xs text-gray-500">
          Boost your Category into the trends and maximize visibility by adding a
          few extra details - more Information means more engagement. Make your
          content the star of the show.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={formClass}>
        {/* Step 0 */}
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-10%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full flex gap-1 h-full justify-between p-1"
          >
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
                inSuggestions={userTags}
                selectedTags={selectedTags}
              />
            </div>
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
        {/* Step 1 */}
        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-10%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col gap-1 h-full"
          >
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

            <select
              id="sharingDeptLevel"
              {...register("sharingDeptLevel")}
              className="text-xs w-full"
            >
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
            </select>

            <div className="flex grow"></div>
          </motion.div>
        )}
        {/* Step 2 */}
        {currentStep === 2 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full grow flex flex-col gap-1"
          >
            <div className="relative flex w-full h-full overflow-hidden">
              <div className="flex absolute opacity-30 w-full h-full">
                <img
                  src={watched.thumbnail}
                  alt=""
                  className="absolute w-full h-full object-cover"
                />
              </div>
              <div className="uppercase flex flex-col items-center justify-center gap-4 bg-white bg-opacity-80 text-blue-950 font-semibold w-full h-full overflow-y-auto p-2">
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
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {/* Step 3 */}
        {currentStep === 3 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col gap-1 grow items-center justify-center"
          >
            <h3 className="text-center text-green-600 w-full text-2xl capitalize">
              {apiResponse}
            </h3>
            <CiCirclePlus
              className="text-2xl text-blue-600 mt-4 cursor-pointer"
              onClick={() => {
                reset();
                setCurrentStep(0);
                dispatch(
                  setSelectedCategory({
                    category_id: 0,
                    title: "",
                    contentDescription: "",
                    thumbnail: "/images/defaults/thumbnails/th1.jpg",
                    tags: [],
                    audience: false,
                    sharingAbility: false,
                    externalSharingAbility: false,
                    sharingDeptLevel: "",
                    owner: "add",
                  })
                );
              }}
            />
          </motion.div>
        )}
        {/* Controls */}
        {currentStep < 4 && (
          <div className="w-full flex flex-col gap-2">
            <div className="w-full pl-10 pr-10">
              <ProgressBarComp
                percent={currentStep === 0 ? 0 : currentStep === 1 ? 50 : 100}
                filledBackground="linear-gradient(90deg, rgba(121,115,200,1) 0%, rgba(29,65,163,1) 35%, rgba(4,27,50,1) 100%)"
                steps={3}
              />
            </div>
            <div className="w-full flex items-center justify-between text-center">
              <h3 className="w-24 text-xs">Basic Information</h3>
              <h3 className="w-24 text-xs text-center">Permissions</h3>
              <h3 className="w-24 text-xs">Advanced</h3>
            </div>
          </div>
        )}
        {currentStep < 3 && (
          <div className="flex gap-1">
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
      fields: ["title", "contentDescription", "thumbnail", "tags"],
    },
    {
      step: 1,
      title: "Permissions",
      fields: [
        "audience",
        "sharingAbility",
        "externalSharingAbility",
        "sharingDeptLevel",
      ],
    },
    { step: 2, title: "Completion" },
  ];
}
