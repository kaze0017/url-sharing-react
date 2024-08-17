import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import ProgressBarComp from "../ProgressBarComp";
import ThumbnailSelector from "./ThumbnailSelector";
import FadeInOut from "../login/FadeInOut";
import { MdOutlineChangeCircle } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import TagSelector from "./category/TagSelector";
import { RxCheckCircled, RxCrossCircled } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import {
  initSelectedCategory,
  createCategory,
  setSelectedCategory,
  setSelectedCategoryContentDescription,
  setSelectedCategoryTags,
  setSelectedCategoryThumbnail,
  setSelectedCategoryTitle,
} from "../../state/linkManagement/categorySlice";
import { CategoryType } from "../../lib/interfaces/categoryType";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import { useNavigate } from "react-router-dom";

// Steps
const steps = getSteps();

// CSS Classes
const formClass =
  "relative w-full h-[500px] flex flex-col gap-1 p-2 overflow-y-auto";

// AddCategoryForm Component
export default function AddCategoryForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { tags: userTags, categories: userCategories } = useSelector(
    (state: RootState) => state.auth.user
  );
  const { selectedCategory } = useSelector(
    (state: RootState) => state.category
  );

  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  function handleSetSelectedTags(tags: string[]) {
    dispatch(setSelectedCategoryTags(tags));
    register("tags", { value: tags });
  }

  const [showThumbnailSelector, setShowThumbnailSelector] = useState(false);
  const [apiResponse, setApiResponse] = useState<string>();

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CategoryType>();

  register("thumbnail", { value: selectedCategory.thumbnail });
  const watched = watch();

  async function handleSetSelectedImage(image: string) {
    dispatch(setSelectedCategoryThumbnail(image));
  }

  const onSubmit: SubmitHandler<CategoryType> = async (data) => {
    const isValid = await trigger();
    if (isValid) {
      setCurrentStep(3);
      const response = await dispatch(createCategory());
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

  function resetTheForm() {
    reset();
    setCurrentStep(0);
    dispatch(initSelectedCategory());
  }
  function backToContentManagement() {
    reset();
    dispatch(initSelectedCategory());
    navigate("/linkmanagement");
  }

  const mainWrapperClass =
    "panel-light relative p-1 justify-center flex flex-col gap-x-2 gap-y-1 overflow-x-scroll w-[700px] w-full overflow-y-auto";
  const summeryCheckWrapperClass = "flex items-center gap-1 w-[250px]";

  useEffect(() => {
    dispatch(initSelectedCategory());
  }, []);

  useEffect(() => {
    setShowThumbnailSelector(false);
  }, [selectedCategory.thumbnail]);

  return (
    <div className={mainWrapperClass}>
      <div className="px-2">
        <h2 className="uppercase">Category Definition</h2>
        <p className="text-xs text-gray-500">
          Boost your Category into the trends and maximize visibility by adding
          a few extra details - more Information means more engagement. Make
          your content the star of the show.
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
              <TextField
                label="Content Name"
                variant="outlined"
                {...register("title", {
                  required: true,
                  maxLength: {
                    value: 20,
                    message: "Name should be less than 20 characters",
                  },
                  minLength: {
                    value: 3,
                    message: "Name should be more than 3 characters",
                  },
                  onBlur: (e) => trigger("title"),
                  onChange: (e) =>
                    trigger("title").then((isValid) => {
                      if (isValid) {
                        dispatch(setSelectedCategoryTitle(e.target.value));
                      }
                    }),
                })}
                fullWidth
                sx={{
                  backgroundColor: "white",
                }}
                error={errors.title ? true : false}
                helperText={errors.title ? errors.title.message : ""}
              />
              <TagSelector
                setSelectedTags={handleSetSelectedTags}
                selectedTags={selectedCategory.tags}
              />
              <TextField
                label="Content Description"
                variant="outlined"
                {...register("contentDescription", {
                  required: false,
                  maxLength: {
                    value: 200,
                    message: "Description should be less than 200 characters",
                  },
                  minLength: {
                    value: 10,
                    message: "Description should be more than 10 characters",
                  },
                  onBlur: (e) => trigger("contentDescription"),
                  onChange: (e) =>
                    trigger("contentDescription").then((isValid) => {
                      if (isValid) {
                        dispatch(
                          setSelectedCategoryContentDescription(e.target.value)
                        );
                      }
                    }),
                })}
                fullWidth
                sx={{
                  backgroundColor: "white",
                }}
              />
            </div>
            <div className="gradientBorder p-2 w-1/2 flex flex-col gap-2 items-center">
              {selectedCategory.thumbnail && (
                <div>
                  <img
                    alt="not found"
                    width={"250px"}
                    src={selectedCategory.thumbnail}
                  />
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
              <ThumbnailSelector
                setSelectedImage={handleSetSelectedImage}
                selectedImage={selectedCategory.thumbnail}
              />
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
                  src={selectedCategory.thumbnail}
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
                    {selectedCategory.tags.length > 0 ? (
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
            <Button
              startIcon={<CiCirclePlus />}
              onClick={resetTheForm}
              variant="contained"
            >
              Create Another Category
            </Button>
            <Button
              startIcon={<ReplyAllOutlinedIcon />}
              onClick={backToContentManagement}
              variant="outlined"
            >
              Back to Content Management
            </Button>
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

{
  /* 
              {errors.title && (
                <p className="text-red-500 text-xs">
                  Name Should be between 3 and 20 characters
                </p>
              )}

              {/* <input
                type="text"
                className={longTextInputClass}
                placeholder="Content Description"
                {...register("contentDescription")}
              /> */
}
{
  /* 
              <TagSelector
                setSelectedTags={setSelectedTags}
                inSuggestions={userTags}
                selectedTags={selectedTags}
              /> */
}
