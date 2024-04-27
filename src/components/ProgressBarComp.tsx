interface ProgressBarProps {
  percent: number;
  filledBackground: string;
}

export default function ProgressBarComp({
  percent,
  filledBackground,
}: ProgressBarProps) {
  const circleConst = "w-[20px] h-[20px]  rounded-full border-4 ";

  const circleIncomplete = "bg-gray-100 outline outline-gray-300";
  const circleComplete = " scaleAnimated outline outline-blue-800";
  const circleCurrent = "bg-gray-400";

  const mainWrapper =
    "w-full h-[40px]  relative px-2  outline-red-800 flex justify-center items-center";

  const topBarConst =
    "absolute top-0 left-0 w-[100%] h-[6px] rounded-full bg-gray-200 transition-transform duration-1000 ";
  const barZero = " translate-x-0 ";
  const barFifty = "translate-x-[50%]  ";
  const barFull = "translate-x-[100%] ";

  const topBar = `${topBarConst} ${
    percent === 0 ? barZero : percent === 50 ? barFifty : barFull
  }`;

  const barFilled = `absolute top-0 left-0 w-[100%] h-[6px] rounded-full transition-transform duration-1000 gradientBackground`;

  return (
    <div className={mainWrapper}>
      <div className="relative w-full h-[6px] overflow-hidden">
        <div className={barFilled}></div>
        <div className={topBar}></div>
      </div>
      <div className="absolute flex items-center justify-between top-0 left-0 w-[100%] h-full px-1">
        <div
          className={`${
            percent >= 0
              ? `${circleConst} ${circleComplete}`
              : `${circleConst} ${circleIncomplete}`
          } `}
        ></div>
        <div
          className={`${
            percent >= 50
              ? `${circleConst} ${circleComplete}`
              : `${circleConst} ${circleIncomplete}`
          } `}
        ></div>
        <div
          className={`${
            percent >= 100
              ? `${circleConst} ${circleComplete}`
              : `${circleConst} ${circleIncomplete}`
          } `}
        ></div>
      </div>
    </div>
  );
}

// <ProgressBar
//   percent={percent}
//   filledBackground={filledBackground}
//   unfilledBackground="rgba(100,100,100,0.1)"
// >
//   <Step transition="scale">
//     {({ accomplished }: any) => (
//       <div
//         className={`${
//           accomplished ? circleCompleteClass : circleIncompleteClass
//         } `}
//       ></div>
//     )}
//   </Step>
//   <Step transition="scale">
//     {({ accomplished }: any) => (
//       <div
//         className={`${
//           accomplished ? circleCompleteClass : circleIncompleteClass
//         } `}
//       ></div>
//     )}
//   </Step>
//   <Step transition="scale">
//     {({ accomplished }: any) => (
//       <div
//         className={`${
//           accomplished ? circleCompleteClass : circleIncompleteClass
//         } `}
//       ></div>
//     )}
//   </Step>
// </ProgressBar>
