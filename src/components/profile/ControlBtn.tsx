interface ControlBtnProps {
  onClick: () => void;
  icon: React.ReactNode;
  value: string;
  setActiveType: (type: string) => void;
  activeType: string;
}

export default function ControlBtn({
  onClick,
  icon,
  activeType,
  setActiveType,
  value,
}: ControlBtnProps) {
  return (
    <div
      className={`flex p-1 text-ms text-gray-900 ${
        activeType === value ? "bg-gray-500" : ""
      }`}
      onClick={() => {
        onClick();
        setActiveType(value);
      }}
    >
      {icon}
    </div>
  );
}
