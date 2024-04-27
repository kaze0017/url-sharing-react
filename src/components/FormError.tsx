import { BsExclamationDiamond } from "react-icons/bs";

interface FormErrorProps {
  message: string;
}

export default function FormError({ message }: FormErrorProps) {
  return (
    <>
      {message ? (
        <div className="flex items-center gap-x-2 text-red-500">
          <BsExclamationDiamond />
          <p>{message}</p>
        </div>
      ) : null}
    </>
  );
}
