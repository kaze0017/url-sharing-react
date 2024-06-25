
interface SelectorMenuProps {
  setSelected: React.Dispatch<React.SetStateAction<any>>;
  // setShow: React.Dispatch<React.SetStateAction<string>>;
  setShow: (selector: string) => void;
  selection: string[];
}
export default function SelectorMenu({
  setSelected,
  selection,
  setShow,
}: SelectorMenuProps) {
  function setFunction(key: string) {
    setSelected(key);
    setShow("");
  }

  const wrapperClass =
    "absolute top-full left-1/2 -translate-x-1/2 flex gap-2 backdrop-blur-xl bg-indigo-500 rounded-xl mt-2 p-1 px-4 text-xs ";
  const btnClass =
    "text-center  p-2 cursor-pointer text-white hover:bg-indigo-600 rounded-md";

  return (
    <div className={wrapperClass}>
      {selection.map((item, index) => (
        <div key={index} className={btnClass} onClick={() => setFunction(item)}>
          <p className="text- uppercase">{item}</p>
        </div>
      ))}
    </div>
  );
}
