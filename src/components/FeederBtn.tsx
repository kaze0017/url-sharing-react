interface FeederBtnProps {
  onClick: () => void;
  title: string;
}

export default function FeederBtn({ onClick, title }: FeederBtnProps) {
  const mainBtnClass =
    "p-2 px-2 flex items-center justify-center text-xs bg-gray-300 h-10 rounded-xl min-w-24 max-w-24 uppercase hover:bg-gray-600 text-xs text-black hover:text-white";
  return (
    <button className={mainBtnClass} onClick={onClick}>
      {title}
    </button>
  );
}
